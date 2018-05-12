configSchema Reference
======================

The `configSchema` object is the field of a plugin that defines which options
the user can tweak when [creating a plan](../new-user/creating-a-plan.md) for
the plugin.

The plan creation process follows these steps:

  * When opening the **Plan configuration** panel for a plugin, Molecule
  generates its UI from the plugin's `configSchema` field.
  * The user fills out the generated form.
  * The user clicks the "Create" button.
  * Molecule generates a `plan.config` object from the user's choices
  ([see below](#plan-config)).

## ConfigSchemaPart

A plugin's `configSchema` must be an object of type **ConfigSchemaPart**.

A **ConfigSchemaPart** object represents either a form input, or a group of
inputs. It must have the following fields:

* **type**: the type of the input field. See below for details.
* **default**: the input's default value.
* **title**: the title will generally be displayed as the input's label.
* **description**: the description will generally be displayed after the title.

> Note: the input's title and description may be displayed differently
depending on its type

The `type` field defines which HTML representation Molecule uses to display
the form input. For instance, a **ConfigSchemaPart** object with `type: "boolean"`
will be represented as a checkbox.

## `plan.config`

Once the user has filled out the generator forms and clicked the "Create"
button, a value of type `PlanObject` is generated from their choices, and
passed to the plugin's `getStrategyForPlan` method as `plan.config`.

The exact type and content of this value depends on the **ConfigSchemaPart**'s
`type` field.

## List of ConfigSchemaPart types

The **ConfigSchemaPart**'s `type` field can have the following values:

### string

Asks the user to enter a string (text input).

**ConfigSchemaPart** objects of type `string` may have an additional field:

* **placeholder** _(optional)_: a hint inside the input box.

Example:

``` js
{
  type: 'string',
  default: '',
  title: 'script',
  placeholder: 'Script name'
}
```

**Generated PlanObject:** the entered string.

Example:

``` js
let str = plan.config;
```

### number

Asks the user to enter a number (number input).

Additional field:

* **placeholder** _(optional)_: a hint inside the input box.

Example:

``` js
{
  type: 'number',
  default: '80',
  title: 'port',
  placeholder: 'Port number'
}
```

**Generated PlanObject:** the entered number.

Example:

``` js
let n = plan.config;
```

### boolean

Asks the user for a true/false input (checkbox).

Example:

``` js
{
  type: 'boolean',
  default: 'true',
  title: 'Enable potato mode'
}
```

**Generated PlanObject:** the chosen value (true/false).

Example:

``` js
if (plan.config) {
  launchPotatoe();
}
```

### object

Displays a recursive group of inputs.

Additional field:

* **schemas**: a Javascript Object. Keys are names, values must be instances of **ConfigSchemaPart**. _(required)_

Example:

``` js
{
  type: 'object',
  schemas: {
    image: {
      type: 'string',
      default: '',
      placeholder: 'ex: ubuntu'
    },
    port: {
      type: 'number',
      default: '80',
      title: 'Port number',
    }
  }
}
```

**Generated PlanObject:** a JavaScript Object; its keys are the `schemas` field's
keys, its values are generated recursively from the respective schemas.

Example:

``` js
let data: {
  image: plan.config.image,
  port: plan.config.port
};
```

### array

Displays an empty list with a **+** button. The user can add items to the list
by pressing the button; each item can then be independently configured.

Additional field:
* **items**: a **ConfigSchemaPart** defining what items will appear when the
  **+** button is clicked. _(required)_

Example:

``` js
{
  type: 'array',
  default: [],
  items: {
    type: 'object',
    schemas: {
      image: {
        type: 'string',
        default: '',
        placeholder: 'ex: ubuntu'
      },
      port: {
        type: 'number',
        default: '80',
        title: 'port',
        placeholder: 'Port number'
      }
    }
  }
}
```

**Generated PlanObject:** a JavaScript Array of **PlanObject**s; its values
are generated recursively from the `items` schema.

``` js
for (let dock of plan.config ) {
  let data: {
    image: dock.image,
    port: dock.port
  };
  /* DO STUFF */
}
```

### enum

Asks the user to choose one option among several offered (drop-down menu).

Additional field:
* **enum**: an array of objects with the following fields:
  * _description_: the caption displayed in the drop-down menu.
  * _value_: the value of the generated config object.

Example:

``` js
{
  type: 'enum',
  enum: [
    {value: 'debug', description: 'Debug'},
    {value: 'release', description: 'Release (32 bits)'},
    {value: 'release_64', description: 'Release (64 bits)'},
    {value: 'test', description: 'Test'}
  ]
}
```

**Generated PlanObject:** the `value` field of the chosen option.

Example:

``` js
let compileMode = plan.config;
if (compileMode == 'release' || compileMode == 'release_64') {
  compileFlags += "-Werror";
  /* DO STUFF */
}
if (compileMode == "debug") {
  /* DO STUFF */
}
else if (compileMode == "test") {
  /* DO STUFF */
}
```

### conditional

Displays different forms depending on what the user enters in its `expression`
input. You can think of it as the equivalent of a switch statement.

Additional fields:
* **expression**: a **ConfigSchemaPart** object (usually of type "enum").
ask the user for input using one of the above types
* **cases**: a Javascript Object; its values must be instances of
**ConfigSchemaPart**. The case whose key matches the value entered into the
`expression` input is displayed below it. If no key matches, no value is
displayed.

Example:

``` js
{
  type: 'conditional',
  expression: {
    type: 'enum',
    enum: [
      {value: 'local', description: 'Local'},
      {value: 'global', description: 'Global'}
    ]
  },
  cases: {
    local: {
      type: 'string',
      default: '',
      title: 'cmd',
      placeholder: 'Shell command'
    },
    global: {
      type: 'number',
      default: '0',
      title: 'iterations',
      placeholder: 'Number of iterations'
    }
  }
}
```

**Generated PlanObject:** an object with the following fields:

* **expressionValue**: a string generated from the `expression` schema.
* **caseValue**: a **PlanObject** generated from the matching case.

Example:

``` js
if (plan.config.binary.expressionValue == 'global') {
  let iterations = plan.config.caseValue;
} else {
  let shellCmd = plan.config.caseValue;
}
```
