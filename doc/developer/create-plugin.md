# How to create a plugin

Molecule allows you to easily integrate new tools by creating a plugin which define
how Molecule should interact with the tool.

A plugin is JavaScript object which follow this structure:

```
export default {
  info: {
    // ...
  },
  configSchema: {
    // ...
  },
  getStrategyForPlan(plan: PlanConfig, helperApi: HelperAPI) {
    ///...
    return {
     strategy: {
       // ...
     },
     controller: {
       // ...
     }
    };
  },
  isPackage: ...
};
```

Through this article we'll detail the purpose of each field as well as the various
API available to make plugin creation easier. 

> Node: you **must** export your plugin using `export default` without what Molecule
won't be able to load it.


## Plugin Files

First of all, **all files used by the plugin** file must be in the
`lib/ExecutionControlEpic/Plugins/<plugin name>` directory.
Each plugin must be in its own directory and contains at least an `index.js` file
which will contain the above structure.

The other files required by your plugin (helpers, presenters, etc.) must also
reside in this directory or any sub-directory. Plugins usually have a
`Presenters` folder containing the **React Presenters** used by the plugin.


## Plugin Structure

### Info Section

The info section contains the name and icon of your plugin that will be
displayed to the user. This section is an object containing the following
attributes:

  * **name**: the name of the plugin
  * **iconUri**: the uri pointing to the icon of the plugin (which should be in
  *atom://molecule-dev-environment/.storybook/public/<plugin-name>.png*)

Example:

```
info: {
    name: "eslint",
    iconUri: "atom://molecule-dev-environment/.storybook/public/devtool-icon-eslint.svg",
}
```

### ConfigSchema Section

The `configSchema` section contains the declaration, in the form of an object, of
the configuration possibilities offered to the user to create the plan. On a user
point of view, it's named *plan configuration*.

Molecule automatically generate the UI corresponding to the declared configuration
schema, and will also manage to pass the configuration to the strategy
(described) below.

Molecule adds some fields to each schema that are mandatory for the execution
of the tool. These fields are :

  * **name**: contains the name of the plan to create.
  * **package**: define the package for which the plugin will be run. This field is
  a drop-down list created by the result of the "isPackage" field.
  * **stager**: The stager define how the plugin will be run (integrated, local or
  remote). See the user documentation for more details.

In addition to these predefined fields, you can define your own configuraiton
fields as follow:

```
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

A **configSchema** is made of object nested in each other. Each object represent
a part of the configuration, a field. Each field have at least one field: the
**type** field, which define which kind of field should be created.

The field can also have supplementary attributes which allow to give more details
about the purpose of the field.

These fields are:

  * **default**: the default value of the corresponding type.
  * **label**: most fields (except the `conditional` type) allow you to specify a
  label in front of the field.
  * **description**: the description allows you to provide a more complete
  explanation about the field purpose than the **label** field.

You will be able to retrieve every choice the user has made in the
getStrategyForPlan section of the plugin through the 'plan.config' object in
(more details in the next section).

You can find a complete list of available fields in the 
[configSchema reference](./config-schema-reference.md).

### Plan Strategy

This part contains the main logic of your plugin which will link the tool and
Molecule by specifying how the tool should be run, and how to interact with it and
its life cycle.

#### Type Imports

Molecule use Flow as typing system to ensure a better quality and safety of the
code. We therefore recommend you to use it in your plugin.

You can import the following types which represent the different API you'll be
able to use:

```
import type { PlanConfig } from "../../PlanConfigurationFeature/Types/types.js.flow";
import type { HelperAPI } from "../../TaskExecutionFeature/Model/HelperApi";
import type { TaskAPI } from "../../DevtoolLoadingFeature/Types/types.js.flow";
```

#### The getStrategyForPlan() method

The getStrategyForPlan() method represent the main entry point of your plugin.
It must return an object describing how Molecule will interact with the tool.

The parameters passed to `getStrategyForPlan` are:

  * **plan**: an object containing the configuration of the plan. This object
  allows you to get the path of the package through `plan.packageInfos.path`,
  and the configuration selected by the user through `plan.config`
  (see [configSchema](#configschema-section))
  * **helperApi**: an API providing methods to facilitate your development, such as
  JSon and terminal output-to-html parser, filesystem abstraction, and severity
  levels used in diagnostics (see below). 

The returned object will have the following fields:

  * **strategy** is an object describing how the tool should be executed
  * **controller** is an object containing functions executed when Molecule receive
  data from the executed tool.

```
getStrategyForPlan(
  plan: PlanConfig,
  helperApi: HelperAPI,
): { strategy: Strategy, controller: Controller } {
  // ...
}
```

##### The strategy

Inside the object returned by `getStrategyForPlan`, the strategy attribute contains
all the configuration used to execute the tool. This object should contains the
following fields:

  * **type**: the environment of execution of the tool. Possible values are:
    * **shell**: the process will be executed in a dedicated shell run by Molecule.
    In this mode, the plugin can only get data from the tool and there is no
    possibilities to interact with it.
    * **terminal**: the process will be executed in a dedicated terminal run
    in Molecule. The user will have access to an xterm instance from the diagnostic
    panel and will be able to interact with the process. This is the idea mode in
    case of tools which necessitate interaction and inputs from the user.
    * **node**: the script will be executed inside a NodeJS instance. This is the
    ideal choice for tools that are written in JavaScript and made to be executed
    by NodeJS.
  * **command** (type *shell* and *terminal*): specify the command to execute.
  * **path** (type *node*): the path of the JS file to execute.
  * **args** (type *node*, *optional*): the arguments to pass to the script.
  * **cwd**: the working directory in which the command/script will be executed.
  * **env** (*optional*): the environment variables to pass to the process.
  * **lsp** (*optional*): boolean

Example:

```
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

> Node: in this example, we use a file named `lsp.js` in the `Process` folder of
our plugin to manage the LSP execution of the tool. See [LSP](#lsp-integration)
for more details.

##### The controller

Once the tool has been started using the *strategy*, Molecule will load the plugin
controller. The controller is an object containing the three following functions:

  * **onData** *(data: string, taskAPI: TaskAPI, helperAPI: HelperAPI): void*:
  this function is called every time some data are emitted by the tool.
  * **onExit** *(code: number, taskAPI: TaskAPI, helperAPI: helperAPI): void*:
  function called on the tool's exit.
  * **onError** *(err: any, taskAPI: TaskAPI, helperAPI: helperAPI): void*:
  function called if the command executed in **strategy** fails.

These function will be called every time an event of their attached type happens.
They are the only way for you to execute code and interact with the tool output.

Basically, your controller will look like:

```
controller: {
  onData(data: any, taskAPI: TaskAPI, helperAPI: HelperAPI): void {
    // ...
  },
  onError(err: any, taskAPI: TaskAPI, helperAPI: HelperAPI): void {
    // ...
  },
  onExit(code: number, taskAPI: TaskAPI, helperAPI: HelperAPI) : void {
    // ...
  }
}
```

##### LSP Integration

If the tool you integrate supports the LSP protocol, you can set the strategy
attribute `lsp` to true. Molecule will then handle everything for you without
having to write a controller.

Using the Language Server Protocol (LSP), Molecule can offer you the following
feature without having to code any integration:

  * Diagnostics
  * Linter integration (allows to highlight some part of the code corresponding
  to the diagnostics)
  * Jump To File from the diagnostics

If available, we highly recommend to use the LSP integration as it facilitate
and automate most of the plugin integration.

##### Example of getStrategyForPlan

In this example, we wrote our own implementation of the LSP protocol on top of the
tool. This implementation handle every outputs from the tool and transform it to
the LSP format.

Note that because an error can happens before the real execution of the tool, we
still write the `onError` method. This will handle error happening in our
implementation of LSP for this tool (such as if the executable is not found) but
the errors produced by the tool itself will be treated as normal LSP errors.

```
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

## Diagnostic view

## isPackage Section

Last but not least, the **isPackage** field will define the way your
tool can identify packages it can work on. The detected packages will be listed
in the *Package* field of the plan configuration.

The **isPackage** attribute can receive several type of value: function,
string or regexp.


### Function

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

```
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

### String

You can also use a string containing the name of a file indicating that your
package is enabled:

```
isPackage: ".flowconfig",
```

### Regexp

Finally, `isPackage` can be a regexp applied on all files of the project.
The regexp will be tested on the absolute path of the file
(ex: `/home/user/project/package.json`)

```
isPackage: /gulpfile|gruntfile)\.js/
```
