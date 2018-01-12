# configSchema Reference

## Common fields

A **configSchema** can be divided in several **configSchemaParts**, and every part shares a basis composed of 4 attributes:
* **type** : the type of the config part.
* **default** : the default value of the corresponding type.
* **title** : depending on the type declared beforehand, a title will generally be displayed as a 'label' of the element (see the example above).
* **description** : depending on the type declared beforehand, a description will be adding details after the title.

## string
* **string** : asks the user for input as a string (= input box).
  * *placeholder* - a hint inside the input box (optional)

>Example:
>```javascript
>type: 'string',
>default: '',
>title: 'script',
>placeholder: 'Script name'
>```
>```javascript
>let s = plan.config.script;
>```

## number
* **number** : asks the user for input as a number (= input box).
  * *placeholder* - a hint inside the input box (optional)

>Example:
>```javascript
>type: 'number',
>default: '80',
>title: 'port',
>placeholder: 'Port number'
>```
>```javascript
>let n = plan.config.port;
>```

## boolean
* **boolean** : asks the user for a true/false input (= check box).

>Example:
>```javascript
>type: 'boolean',
>default: 'true',
>title: 'Enable potato mode'
>```
>You can get the value of this boolean by encapsulating it in an **object** (see below), here we pretend the object's name is checkBox
>```javascript
>if (plan.config.checkBox) {
>  launchPotatoe();
>}
>```

## object
* **object** : the object type allows you to create your own schema through the *schemas* attribute.
  * *schemas* - a schema is a configSchemaPart associated with a key. An object can contain mutliple schemas.

>Example:
>```javascript
>type: 'object',
>schemas: {
>  image: {
>    type: 'string',
>    default: '',
>    placeholder: 'ex: ubuntu'
>  },
>  port: {
>    type: 'number',
>    default: '80',
>    title: 'Port number',
>  }
>}
>```
>```javascript
>let data : {
>  image : plan.config.image,
>  port : plan.config.port
>};
>```

## array
* **array** : this type enables the possibility for the user to generate (0 to n) items defined in the *items* attribute. (Thanks to a '+' button)
  * *items* - an item is a **configSchemaPart** which will appear when the '+' button is clicked

>Example:
>```javascript
>type: 'array',
>default: [],
>items: {
>  type: 'object',
>  schemas: {
>    image: {
>      type: 'string',
>      default: '',
>      placeholder: 'ex: ubuntu'
>    },
>    port: {
>      type: 'number',
>      default: '80',
>      title: 'port',
>      placeholder: 'Port number'
>    }
>  }
>}
>```
>As for the **boolean** type, the array has to be encapsulated in an object, here we pretend the object's name is Docks
>```javascript
>plan.config.Docks.map((dock) => {
>  let data : {
>    image : dock.image,
>    port : dock.port
>  };
>  /* DO STUFF */
>});
>```

## enum
* **enum** : this type allows you to declare an array of elements from which the user can chose using a drop-down menu. (generally used with **conditional** as the *expression*)
  * *enum* - it is an array of mixed elements having 2 attributes:
    * value : equivalent to a *key*, code-related value
    * description : the caption displayed in the drop-down menu

>Example:
>```javascript
>type: 'enum',
>enum: [
>  {value: 'local', description: 'Local'},
>  {value: 'global', description: 'Global'}
>]
>```
>The enum type is convenient for the **conditional** type, as the 'expression' attribute (see below)

## conditional
* **conditional** : this type allows you to create different configSchemaParts depending on the *expression* input. Think of it as a switch function.
  * *expression* - ask the user for input using one of the above types
  * *cases* - for each value declared in the *expression* attribute, another configSchemaPart is expected

>Example:
>```javascript
>type: 'conditional',
>expression: {
>  type: 'enum',
>  enum: [
>    {value: 'local', description: 'Local'},
>    {value: 'global', description: 'Global'}
>  ]
>},
>cases: {
>  local: {
>    type: 'string',
>    default: '',
>    title: 'cmd',
>    placeholder: 'Shell command'
>  },
>  global: {
>    type: 'number',
>    default: '0',
>    title: 'iterations',
>    placeholder: 'Number of iterations'
>  }
>}
>```
>Again, encapsulating this in an object to better access it, here we pretend the object's name is binary
>```javascript
>if(plan.config.binary.expressionValue == 'global') {
>  let iterations = plan.config.caseValue.cmd;
>} else {
>  let shellCmd = plan.config.caseValue.iterations;
>}
>``
