# Creating a plugin

Molecule's main strength is to leverage Atom's extensibility. You can integrate
new tools to Molecule by creating plugins in which you define how Molecule
should interact with the tools.

For instance, if you want to integrate a new language (say, Ocaml) to Molecule,
you need to create a **Molecule Plugin** for this language.

This article details Molecule's plugin API and how to use it.

## The plugin system

A Molecule plugin is a JavaScript object with the following fields:

``` js
export default {
  info: {
    // ...
  },
  configSchema: {
    // ...
  },
  getStrategyForPlan(plan: PlanConfig, helperApi: HelperAPI) {
    // ...
    return {
      strategy: { /* ... */ },
      controller: { /* ... */ }
    };
  },
  DiagnosticView: /* ... */,
  isPackage: /* ... */
};
```

Once you have built this object (see **Plugin Structure** for details), you
must send it to Molecule's plugin handler. This can be done in several ways.

### As an Atom Package

This feature is not available yet.

[Comment]: # (TODO - Complete section once package integration is done)

### In Molecule's source code

If you're a Molecule contributer, and you want to add your plugin directly to
Molecule's codebase, you need to follow these steps:

* Add your plugin and **all the files it uses** to the
`lib/ExecutionControlEpic/Plugins/<plugin name>` directory. All the required
files (helpers, presenters, etc) must be in this directory or a sub-directory.
* Export your plugin object from the
`lib/ExecutionControlEpic/Plugins/<plugin name>/index.js` file, using the
`export default` statement.
* Add `<plugin name>/index.js` to the plugin list in
`lib/molecule-dev-environment.js`

When in doubt, you can consult [one of the existing plugins](https://github.com/alanzanattadev/atom-molecule-dev-environment/tree/master/lib/ExecutionControlEpic/Plugins)
as an example.


## Plugin Structure

As shown above, a plugin object has the following fields:

### `info`

The `info` field is a Javascrit object that Molecule uses to display the plugin.
This object has the following fields:

  * **name**: the name of the plugin
  * **iconUri**: the uri pointing to the icon of the plugin (which should be in
  *atom://molecule-dev-environment/.storybook/public/<plugin-name>.png*)

Example:

``` js
info: {
    name: "eslint",
    iconUri: "atom://molecule-dev-environment/.storybook/public/devtool-icon-eslint.svg",
}
```

### `configSchema`

When [creating a plan](../new-user/creating-a-plan.md) for a plugin, a panel
named **Plan configuration** opens, and displays a bunch of form inputs.

Some of the inputs are present for all plugins (the plan's name, package file,
and stager) and are used internally by Molecule.

The other inputs are depend on the plugin's `configSchema`, which is an object
that defines a list of inputs (checkboxes, text inputs, etc.) that the user will
be asked to fill out.

Molecule automatically generates the **Plan configuration** UI depending on
this schema. For instance, checkboxes are generated for boolean fields, text
boxes are generated for string fields.

As an example, the Eslint plugin declares the following schema:

``` js
configSchema: {
  type: "object",
  schemas: {
    binary: {
      type: "enum",
      label: "binary",
      enum: [
        { value: "local", description: "local" },
        { value: "global", description: "global" },
      ],
    },
    sources: {
      type: "object",
      label: "sources files",
      schemas: {
        source: {
          type: "string",
          label: "source",
          placeholder: "lib/",
          default: "lib/",
        },
        sourceArray: {
          type: "array",
          label: "aditional files",
          items: {
            type: "string",
            label: "source",
            placeholder: "lib/",
          },
        },
      },
    },
  },
},
```

From this, Molecule generates the following config UI:

![The exact look may vary](resources/eslint-config-panel.png)

Once the user is done configuring and clicks the "Create" button, a config
object is generated based on what the user has entered; this object is then
passed to the plugin's `getStrategyForPlan` method (see below).

For details on the `configSchema` API, see
[configSchema reference](./config-schema-reference.md).

### `getStrategyForPlan`

The `getStrategyForPlan` method represents the main entry point of your plugin.
It's called when the user finishes the configuration step and creates a plan.
It must return an object describing how Molecule should interact with the
plugin.

The parameters passed to `getStrategyForPlan` are:

  * **plan**: an object with the following fields:
    * **name**: the plan's unique name.
    * **config**: an object generated based on what the user entered into
    the plan configuration panel. See
    [configSchema reference](./config-schema-reference.md#plan-config).
    * **packageInfos.path**: path of the plan's [package](../new-user/creating-a-plan.md#package-system).
  * **helperApi**: an API providing methods to facilitate your development,
  such as JSON and terminal output-to-html parser, filesystem abstraction, and
  severity levels used in diagnostics. See
  [HelperAPI reference](./HelperAPI-reference.md).

[Comment]: # (TODO - Add PackageInfo API)

The returned object must have the following fields:

  * **strategy**: an object describing how the tool should be executed
  * **controller**: an object containing functions executed when Molecule receive
  data from the executed tool.

``` js
getStrategyForPlan(
  plan: PlanConfig,
  helperApi: HelperAPI,
): { strategy: Strategy, controller: Controller } {
  // ...
}
```

> Note: Molecule uses Flow's typing system to help ensure the codebase stays
> type-safe.
>
> The following types represent the different APIs you'll be able to use:
> ```
> import type { PlanConfig } from "../../PlanConfigurationFeature/Types/types.js.flow";
> import type { HelperAPI } from "../../TaskExecutionFeature/Model/HelperApi";
> import type { TaskAPI } from "../../DevtoolLoadingFeature/Types/types.js.flow";
> ```
> We recommend you use them in your plugin, to make sure your
> functions are compatible with our API.

The return value's **strategy** and **controller** fields represent different
concepts. The strategy is a plain Javascript object, with the information
necessary to _start_ the plugin's tool.

On the other hand, the controller is a dynamic object with methods, which are
called _when the tool is executed_, to link it with Molecule's frontend.

#### `strategy`

The `strategy` object must have the following fields:

  * **type**: the environment of execution of the tool. Possible values are:
    * **shell**: the process will be executed in a dedicated shell run by Molecule.
    In this mode, the plugin can only get data from the tool and there is no
    way to interact with it.
    * **terminal**: the process will be executed in a dedicated terminal run
    in Molecule. The user will have access to an xterm instance from the diagnostic
    panel and will be able to interact with the process. This is the best mode
    for tools that need inputs from the user.
    * **node**: the script will be executed inside a NodeJS instance. This is the
    best mode for tools that are written in JavaScript and made to be executed
    by NodeJS.
  * **command** *(shell and terminal strategies only)*: specify the command to
  execute.
  * **path** *(node strategies only)*: the path of the JS file to execute.
  * **args** *(node strategies only, optional)*: the arguments to pass to the
  script.
  * **cwd**: the working directory in which the command/script will be executed.
  * **env** *(optional)*: the environment variables to pass to the process.
  * **lsp** *(optional)*: boolean. See F[below](#lsp-integration) for details.

Example:

``` js
strategy: {
  type: "node",
  path: path.join(__dirname, "Process", "lsp"),
  cwd: path.dirname(plan.packageInfo.path),
  env: {
    ESLINT_CWD: path.dirname(plan.packageInfo.path),
    ESLINT_BINARY: binaryPath,
  },
  lsp: true,
},
```

> Note: in this example, we use a file named `lsp.js` in the `Process` folder of
our plugin. This file implements a LSP wrapping of the ESLint CLI. See
[LSP Integration](#lsp-integration) for details.

#### `controller`

Once the tool has been started using the *strategy*, Molecule will load the
plugin's `controller`. The controller is an object with the following methods:

  * **onData** *(data: string, taskAPI: TaskAPI, helperAPI: HelperAPI): void*:
  this method is called every time some data is emitted by the tool.
  * **onExit** *(code: number, taskAPI: TaskAPI, helperAPI: helperAPI): void*:
  this method is called on the tool's exit.
  * **onError** *(errcode: Number, taskAPI: TaskAPI, helperAPI: helperAPI): void*:
  this method is called if the command executed in the strategy fails.

These methods are the only way for your plugin to execute code and interact
with the tool's output.

[Comment]: # (TODO - Add details)

See [TaskAPI reference](./TaskAPI-reference.md) and
[HelperAPI reference](./HelperAPI-reference.md) for details.

#### LSP Integration

If your plugin's tool implements the
[Language Server Protocol](https://langserver.org/) - that is, if the tool
accepts LSP-compliant inputs and emits LSP-compliant outputs - then you can set
the strategy's `lsp` field to true. Molecule will then be able to communicate
with the tool without you having to write a controller.

Using the Language Server Protocol, Molecule can:

  * Receive diagnostics from the tool, and display them in the Diagnostic panel
  * Integrate them to the linter (e.g. highlight syntax errors in red).
  * When the user clicks on a diagnostic, open the relevant file at the relevant
  location (e.g. where the syntax error is).

These interactions can all be implemented in the controller using the TaskAPI.
However, using the LSP integration is faster and requires much less work for
developing (and maintaining) your plugin; as such, we recommend you use it
whenever it is available.

> Note: It is possible to both use the LSP integration and define a custom
controller, as seen in the Eslint example. In that case, the tool's outputs are
sent to both the LSP parser and the plugin's controller.

#### Complete `getStrategyForPlan` example

In this example, we wrote our own implementation of the LSP protocol on top of the
tool. This implementation handle all outputs from `eslint` and transforms them
into LSP-formatted objects.

Note that because an error can happen before the real execution of the tool, we
still write the `onError` method. This will handle error happening in our
implementation of LSP for this tool (such as if the executable is not found) but
the errors produced by the tool itself will be treated as normal LSP errors.

``` js
getStrategyForPlan(
  plan: PlanConfig,
  helperApi: HelperApi,
): { strategy: Strategy, controller: Controller } {
  let binaryPath;
  const sources = `${
    plan.config.sources.source
  } ${plan.config.sources.sourceArray.join(" ")}`;
  if (plan.config.binary.expressionValue === "local") {
    binaryPath = `${path.join(
      path.dirname(plan.packageInfo.path),
      "node_modules",
      ".bin",
      "eslint",
    )}`;
  } else binaryPath = "eslint";
  const cmd = `${binaryPath} ${sources} -f json -o ${getOutputFilePath(
    plan.name,
    helperApi,
  )}`;
  return {
    strategy: {
      type: "node",
      path: path.join(__dirname, "Process", "lsp"),
      cwd: path.dirname(plan.packageInfo.path),
      env: {
        ESLINT_CWD: path.dirname(plan.packageInfo.path),
        ESLINT_BINARY: binaryPath,
      },
      lsp: true,
    },
    controller: {
      onError(err: any, taskAPI: TaskAPI, helperAPI: HelperApi): void {
        taskAPI.diagnostics.setForPath({
          uri: "eslint",
          diagnostics: [
            {
              severity: helperApi.severity.error,
              message: err,
              date: moment().unix(),
            },
          ],
        });
      },
    },
  };
},
```

### `DiagnosticView`

The plugin's `DiagnosticView` field is a
[React Component](https://reactjs.org/docs/components-and-props.html) which
defines how diagnostics are rendered in the
[Diagnostic Panel](../new-user/using-a-plan.md#diagnostics-panel).

A `DiagnosticView` component must accept the following props:

  * `path`: string
  * `message`: string
  * `severity`: number
  * `source`: string

[Comment]: # (TODO - Add more details)

### `isPackage`

The `isPackage` field will define the way your tool can identify packages it can
work on. The detected packages will be listed in the *Package* field of the plan
configuration.

The **isPackage** field can have several types of values: function,
string or regexp.

[Comment]: # (TODO - Rewrite this section)

#### Function

The most flexible way to specify the `isPackage` field is using a function
that act as a predicate that return `true` if the current directory is a package.

This function will take two parameters:

  * **packagePath**: the absolute path of the tested file
  (ex: `/home/user/project/package.json`)
  * **directory** - an object containing the **name** of the directory, and a
  **files** field containing an array. This array contains all elements of the
  current directory, which can be either the element name (a **string**) if it is
  a file, or another **directory** object if it is a directory.

The value you return can either be a **boolean** or an **object** with the
following values:

  * **name**: the name of the package.
  * **path**: the path of the package.
  * **type**: the type of the package. Can be `file` or `directory`.

Example:

``` js
isPackage: (packageName: string, directory: PackageDirectory) => {
  if (path.basename(packageName).indexOf("eslintrc") !== -1) return true;
  else if (path.basename(packageName) === "package.json") {
    const check = new File(
      path.join(
        packageName.slice(
          0,
          packageName.lastIndexOf(path.basename(packageName)),
        ),
        "node_modules",
        "eslint",
      ),
    );
    return check.exists();
  } else {
    return false;
  }
},
```

#### String

You can also use a string containing the name of a file indicating that your
package is enabled:

``` js
isPackage: ".flowconfig",
```

#### Regexp

Finally, `isPackage` can be a regexp applied on all files of the project.
The regexp will be tested on the absolute path of the file
(ex: `/home/user/project/package.json`)

``` js
isPackage: /gulpfile|gruntfile)\.js/
```
