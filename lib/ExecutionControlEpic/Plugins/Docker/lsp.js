/* eslint-disable */
const {
  createMessageConnection,
  StreamMessageReader,
  StreamMessageWriter,
} = require("vscode-jsonrpc");

const { spawn, exec } = require("child_process");
const process = require("process");
const StreamSplitter = require("stream-splitter");
const stripAnsi = require("strip-ansi");

const connection = createMessageConnection(
  new StreamMessageReader(process.stdin),
  new StreamMessageWriter(process.stdout),
);

connection.onRequest("initialize", () => {
  return new Promise((resolve, reject) => {
    const { bin, command, service, configFile } = JSON.parse(
      process.env.COMPOSE_COMMAND,
    );

    const dockerProcess = spawn(bin, ["-f", configFile, command, service], {
      stderr: "pipe",
      stdout: "pipe",
    });
    dockerProcess.on("error", err =>
      connection.sendNotification("window/logMessage", {
        type: 3,
        message: `Error running Docker: ${err}`,
      }),
    );

    const lines = dockerProcess.stdout.pipe(StreamSplitter("\n"));
    lines.on("token", line =>
      connection.sendNotification("window/logMessage", {
        type: 1,
        message: stripAnsi(line.toString()),
      }),
    );

    connection.onRequest("shutdown", () => {
      return new Promise(resolve => {
        dockerProcess.kill();
        exec(
          `${bin} -f ${configFile} stop ${service}`,
          {},
          (err, stdout, stderr) => {
            resolve();
          },
        );
      });
    });
    resolve();
  });
});

connection.listen();
