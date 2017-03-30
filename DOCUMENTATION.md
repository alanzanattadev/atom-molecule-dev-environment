# Integration API: Documentation
**If you didn't read the README.md do it before going any further.**

You must export as an object every information that is asked in the sections below.
The final result of the integration must look like:

    export default {
      infos: {
        ...
      },
      configSchema: {
        ...
      },
      getStrategyForPlan(plan: PlanConfig) {
        ...
         return {
           strategy: {
             ...
           },
           controller: {
             ...
           }
         };
      },
      isPackage: ...
    };



## Requirements

First of all, add your *js* file in the **lib/ExecutionControlEpic/Plugins/** directory.

Then add the following imports to your file:

```javascript
import type {PlanConfig} from "../PlanConfigurationFeature/Types/types.js.flow";
import type {HelperApi} from "../TaskExecutionFeature/Model/HelperApi";
import type {TaskAPI} from "../DevtoolLoadingFeature/Types/types.js";
import path from 'path';
```

>Don't worry about them for now, we'll use them in a couple of steps.

Of course don't forget to *export default* your object, like:

```javascript
export default {
};
```

>Note that every object you will create in the next steps has to be inside the *export default*

Now you can go on the following sections !

## Infos

First, you'll have to create an **infos** object that has 3 attributes:

* **name**: the name of the tool
* **iconUri**: the uri pointing to the icon of the tool (which should be in *atom://molecule-dev-environment/.storybook/public/tool-name.png*)
* **defaultDiagnosticsMode**: the default display mode for your tool's diagnostics, can be 'logs' or 'organized' (set to 'organized' by default)

Example:

```javascript
infos: {
  name: 'docker',
  iconUri: 'atom://molecule-dev-environment/.storybook/public/devtool-icon-docker.png',
  defaultDiagnosticsMode: 'logs'
}
```


## ConfigSchema

This section is very important, you are going to define the way a user can create a plan for a better use of your tool.


>Here is an example of the creation of a plan:

>![NPM tool plan creation base](./Plan-creation-base.png)

>**MUST READ**: The *name* box is a default one, it will be the name of your plan once created. The last 2 boxes before the *Create* button are also default ones:
>They allow the user to chose the package in which the plan will be executed and how the process will be executed:
>* **integrated** : process as child of atom process
>* **local** : process as child of process launched as child of atom
>* **remote** : process launched on a remote machine

>![NPM tool plan creation](./Plan-creation.png)

>This is the **npm** tool plan configuration. As you can see, only the 2 circled boxes are required for npm to create a plan:
>* action (= run/start/test)
>* script (= name of the script)

>They are defined by the following configSchema:
>```javascript
>configSchema: {
>  type: 'conditional',
>  expression: {
>    type: 'enum',
>    enum: [
>      {value: 'run', description: 'run'},
>      {value: 'start', description: 'start'},
>      {value: 'test', description: 'test'}
>    ]
>  },
>  cases: {
>    run: {
>      type: 'string',
>      default: '',
>      title: 'script',
>      placeholder: 'script'
>    },
>    start: null,
>    test: null
>  }
>},
>```
>Note that a configSchema is the (only) way of Molecule to ask the user for input. So make sure to collect every user-related data you need in order to execute your tool properly in those configSchemas.


A **configSchema** can be divided in several **configSchemaParts**, and every part shares a basis composed of 4 attributes:
* **type** : the type of the config part.
* **default** : the default value of the corresponding type.
* **title** : depending on the type declared beforehand, a title will generally be displayed as a 'label' of the element (see the example above).
* **description** : depending on the type declared beforehand, a description will be adding details after the title.

First, note that you will be able to retrieve every choice the user has made in your configSchema through the 'plan.config' object (which we'll detail later).

Here are the available types (and their attributes), followed by an example of how to access it through 'plan.config', for your tool's configSchema:

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
>```


## Plan Strategy

This is the part where you get to use the imports you previously added to your file. Make sure you didn't forget those [imports](#requirements), and then add the **getStrategyForPlan(plan: PlanConfig)** function as in:

```javascript
export default {
  infos: {
    /* tool infos */
  },
  configSchema: {
    /* tool configSchema */
  },
  getStrategyForPlan(plan: PlanConfig) {
    /* TO-DO */
  }
};
```
>As you can see you get a **plan** variable from the **getStrategyForPlan** function. This variable will provide you the different parameters of the plan configuration:
>* the path of the package (through *plan.packageInfos.path*)
>* the data of your configSchema (through *plan.config*), check [configSchema](#configschema) for examples

This function will contain the content of the notifications you are going to provide to the user through the bottom dock of Molecule.

To get started, know that this function has to return an object composed of two objects: **strategy** and **controller** like:
```javascript
getStrategyForPlan(plan: PlanConfig) {
  /* You're free to do whatever operations you need to
  in order to be ready to pass informations through the return */
  ...
   return {
     strategy: {
       ...
     },
     controller: {
       ...
     }
   };
 }
```

Here is a description of the content of those two:
* **strategy** : the way you are going to execute your tool
  * **type** - the type of the process, it can be 'shell' or 'node'
    * **shell** - if the shell type is selected, you must set the **command** variable with the command you want to execute through shell
    * **node** - if the node type is selected, you must set the **path** variable with the path to the script you want to execute, an optional **args** (array of string) variable which can contain the arguments of your script is available as well
  * **cwd** - the directory from which the command will be executed

>Example:
>```javascript
>strategy: {
>  type: 'shell',
>  command: `${binaryPath} ${plan.config.task}`,
>  cwd: path.dirname(plan.packageInfos.path),
>}
>```
> The **path** import is used so we can properly set the directory in which the command will be executed.



* **controller** : the controller provides you 5 functions in which you will be able to add diagnostics to the bottom dock of Molecule, you will have to use the **addDiagnostics()** function through the taskAPI
  * **onExit** *(code: number, taskAPI: TaskAPI, helperAPI): void* - function called on the tool's exit
  * **onError** *(err: any, taskAPI: TaskAPI, helperAPI): void* - function called if the command executed in **strategy** fails
  * type: **shell** - if you selected type shell in your strategy, you'll have to return those two functions which will be called during your program's execution
    * **onStdoutData** *(data: string, taskAPI: TaskAPI, helperAPI): void* - function called if your tool communicates through STDOUT
    * **onStderrData** *(data: string, taskAPI: TaskAPI, helperAPI): void* - function called if your tool communicates through STDERR
  * type: **node** - if you selected type node in your strategy, you'll have to return this function which will be called during your script's execution
    * **onData** *(data: any, taskAPI: TaskAPI, helperAPI): void* - function called when your script uses the 'process.send(data: any)' function, data can be of *any* type

Basically, your controller will look like:
```javascript
controller: {
    onData(data: any, taskAPI: TaskAPI, helperAPI: HelperAPI): void {
        ... // type is node
    },
    onStdoutData(data: string, taskAPI: TaskAPI, helperAPI: HelperApi): void {
        ... // type is shell
    },
    onStderrData(data: string, taskAPI: TaskAPI, helperAPI: HelperApi): void {
        ... // type is shell
    },
    onError(err: any, taskAPI: TaskAPI, helperAPI: HelperAPI): void {
        ...
    },
    onExit(code: number, taskAPI: TaskAPI, helperAPI: HelperAPI) : void {
        ...
    }
}
```
>You can declare both onData & onStd functions if your tool returns a different type of strategy (node or shell)

As you can see there are two APIs you get from each function:
  * **taskAPI** : the main API of Molecule, from which you will be able to store data thanks to our cache system and display your logs through diagnostics
    * **addDiagnostics** is your way of adding notifications to the bottom dock of Molecule, takes an array of *Diagnostics* as parameter, a Diagnostic is an object composed of:
      >* **type** - can be 'error', 'warning', 'success' or 'info' (each of them has a different display on the dock)
      >* **message** - the data displayed in the diagnostics panel, different types of data can be passed:
        >   * a *string* displayed as a simple text
        >   * an *object* as in **{** **text** : *string*, **html** : *boolean* **}** with *text* being the actual message as a string and html a boolean which, if set to true, will display the string as HTML (supports HTML tags)
        >   * an *object* as in **{** **data** : *object* **}** with data being an object which, if filled with JSON, will be displayed as 'beautified' JSON
        >   * a *React Component*, it can be a function as well as a class extending 'React.Component'
      >* **date** - the date associated with the message
      >* **location** - OPTIONAL - adds a 'JumpTo' button so the user can jump to the file related to the diagnostic, the location object is formed as in **{** **path**: *string*, **line**: *number*, **column**: *number* **}**

    * **nextStep** is a function that allows your tool to separate your diagnostics during _a single_ Plan execution, they will then be separated in 'Steps' (1, 2, 3,..)

    * **cache** is an object containing an array of data. The **cache** object will provide you with two functions, from which you will be able to store and access data throughout the Plan's execution:
      >* **push** pushes data into an array, takes two arguments :
        >   * **data** : *any* - the data you wish to store, it can be of any type
        >   * **step** : *boolean* - telling Molecule whether or not to bind the data to the current step (set to false by default)
      >* **get** will return the array stored in **cache** independently of the step you're in. Can take an argument:
      >   * an object as in **{** **step** : *number*, **excludeNullStep** : *boolean* **}**
      >     * **step** is set to null by default, by setting its value to a number, the function will only return the cache associated to the step
      >     * **excludeNullStep** is set to true by default, a *NullStep* is a step which hasn't been associated to a step when pushed. By setting its value to false, you will receive the NullSteps' cache AND the selected step

  * **helperAPI** : the secondary Molecule API, which will be providing useful elements for integration:
    * **outputToHTML** transforms a string into a displayable HTML element
    * **json** is an object which only contains (for now) a **parseAsync** function taking a string as argument, which will be asynchronously parsed through the 'JSON.parse' function thanks to a Promise, and will _then_ be return to you

>Example:
>```javascript
>controller: {
>  onStdoutData(data: string, taskAPI: TaskAPI, helperAPI): void {
>    taskAPI.cache.push(data.toString());
>  },
>  onStderrData(data: string, taskAPI: TaskAPI, helperAPI): void {
>    taskAPI.addDiagnostics([{
>      type: "warning",
>      message: {
>        text : helperAPI.outputToHTML(data.toString()),
>        html : true,
>      },
>      date: moment().unix(),
>    }]);
>  },
>  onExit(code: number, taskAPI: TaskAPI, helperAPI): void {
>    helperAPI.json.parseAsync(taskAPI.cache.get().map(blob => blob.data).join('')).then((json) => {
>      taskAPI.addDiagnostics(json.logs.map(log => ({
>        type: "info",
>        message: log,
>        date: moment().unix(),
>      })));
>    }).catch(e => {
>      console.log(e);
>    });
>  },
>  onError(err: any, taskAPI: TaskAPI, helperAPI): void {
>    taskAPI.addDiagnostics([{
>      type: "error",
>      message: {
>        data : err,
>      },
>      date: moment().unix(),
>    }]);
>  }
>}
>```
>The **moment** import is used to associate a time to a diagnostic.


## Package

Last but not least, add a **isPackage** attribute. This will define the way your tool can identify packages and so operate on the proper projects.

The **isPackage** attribute can receive several type of value: function, string or regexp.

* **function** : if you chose to express your isPackage with a function, note that you will receive two arguments: packagePath & dirname
  * **packagePath** - full path + file name (*ex: /home/toto/projectdir/package.json*)
  * **dirname** - it is an object containing the *name* of the current tested directory and an array *files* of all the files contained in it
  * **return** - the value you return can either be a **boolean** or an **object** which will replace the current package state as in:
    ```javascript
    {
      name: 'string',
      path: 'string',
      type: 'string', // 'file' | 'directory'
    }
    ```

>Example:
>```javascript
>isPackage: (packagePath, dirname) =>
> path.basename(packagePath).indexOf("jest.config") != -1 ||
> path.basename(packagePath).indexOf(".jest.") != -1 ||
> path.basename(packagePath) == 'package.json',
>```

* **string** : the string is the name of the file describing your package, plain and simple

>Example:
>```javascript
>isPackage: 'package.json'
>```

* **regexp** : the regexp will be tested against the full path followed by the file name (ex: */home/toto/projectdir/package.json*)

>Example:
>```javascript
>isPackage: /gulpfile|gruntfile)\.js/
>```
