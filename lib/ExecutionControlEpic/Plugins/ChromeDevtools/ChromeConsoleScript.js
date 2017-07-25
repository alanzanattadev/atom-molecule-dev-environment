"use babel";
// @flow

const CDP = require("chrome-remote-interface");

CDP({ port: process.argv[2] ? process.argv[2] : "9222" }, client => {
  client.Page.enable();
  client.Log.enable();
  client.on("Page.loadEventFired", () => {
    process.send(
      JSON.stringify({
        type: "step",
      }),
    );
  });
  client.on("Log.entryAdded", log => {
    let data = {
      type: log.entry.level == "verbose" ? "info" : log.entry.level,
      data: `[${log.entry.source}
      ${log.entry.networkRequestId ? ", " + log.entry.networkRequestId : ""}
      ${log.entry.workerId ? ", " + log.entry.workerId : ""}] ${log.entry.text}
      ${log.entry.url ? "<br/>" + log.entry.url : ""}${log.entry.lineNumber
        ? " : " + log.entry.lineNumber
        : ""}
      ${log.entry.stackTrace
        ? "stack trace:" +
          log.entry.stackTrace.callFrames.map(frame => {
            return (
              "<br/>(" +
              frame.url +
              ", " +
              frame.lineNumber +
              ":" +
              frame.columnNumber +
              ")" +
              frame.functionName
            );
          })
        : ""}`,
    };
    process.send(JSON.stringify(data));
  });
});
