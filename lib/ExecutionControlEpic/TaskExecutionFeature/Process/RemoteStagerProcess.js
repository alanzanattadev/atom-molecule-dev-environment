"use babel";
// @flow

require("babel-register");
var exec = require("../Model/Strategies").exec;

console.log(process.argv[2]);
var strategy = JSON.parse(process.argv[2]);

var child = exec(strategy, {
  onStdoutData(data) {
    process.stdout.write(data.toString() + "\n");
  },
  onStderrData(data) {
    process.stderr.write(data.toString() + "\n");
  },
  onExit(exitCode) {
    process.exit(exitCode);
  },
  onError(err) {
    process.stderr.write(JSON.stringify(err) + "\n");
  },
});

if (!child) {
  process.stderr.write("Impossible to launch process\n");
  process.exit(0);
}

process.on("exit", () => child && child.kill());
