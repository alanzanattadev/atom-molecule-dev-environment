helperAPI
=========

The HelperAPI provide methods to facilitate your development, such as JSon and terminal output-to-html parser, filesystem abstraction, and severity levels used in diagnostics

The different method available are:

* **HelperApi.outputToHTML(output)**: This method will transform your output into an HTML string.

* **HelperApi.json.parseAsync(json)**: This method will read a JSON and return you a Promise<Object>.

* **HelperApi.fs.getTmpPath(fileName)**: This method takes the filename of a temporary file used by your plugin as argument and the path to the temporary file. The path return will depend of the OS temporary folder who run Molecule.

## Severity

The HelperAPI provide you an object containing all the different levels of severity used by the diagnostics.

* **HelperApi.severity**: Below are listed the different levels of severity

``` js
severity: {
  error: 1,
  warning: 2,
  info: 3,
  hint: 4,
  success: 5,
},
```

## Example

``` js
// Use of the helperAPI on jest plugin
function getOutputFilePath(planName: string, helperAPI: HelperApi): string {
  return helperAPI.fs.getTmpPath(`jest-${planName}.output.json`);
}

let command = `${
  binaryPath
} --json --useStderr --silent --outputFile ${getOutputFilePath(
  plan.name,
  helperApi,
)}`;

// Use of the helperAPI on npm plugin
controller: {
onData(data: string, taskAPI: TaskAPI, helperAPI: HelperApi): void {
  taskAPI.addDiagnostics({
    uri: "npm",
    diagnostics: [{
      severity: helperAPI.severity.info, //display the right style for the diagnostic
      message: helperAPI.outputToHTML(data.toString()) ,//display the message in HTML
      date: moment().unix(),
    }],
  });
},
```
