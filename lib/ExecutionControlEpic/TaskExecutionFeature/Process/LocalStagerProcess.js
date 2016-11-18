'use babel'
// @flow

require("babel-register");
var {exec} = require("../Model/Strategies");

if (process.send === undefined) {
  console.error("LocalStager has to be used as a (child process");
} else {
  var child = exec(JSON.parse(process.argv[2]), {
    onStdoutData(data) {process.send({type: 'stdout', data: data.toString()})},
    onStderrData(data) {process.send({type: 'stderr', data: data.toString()})},
    onExit(exitCode) {process.exit(exitCode)},
    onError(err) {process.send({type: 'error', data: err.toString()})},
  });

  if (!child) {
    process.send({type: 'error', data: 'Impossible to launch process'});
    process.exit(0);
  }

  process.on('exit', () => child && child.kill());
}
