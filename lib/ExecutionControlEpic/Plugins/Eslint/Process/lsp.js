/* eslint-disable */
const {
  createMessageConnection,
  StreamMessageReader,
  StreamMessageWriter,
} = require("vscode-jsonrpc");

const { exec } = require("child_process");

const connection = createMessageConnection(
  new StreamMessageReader(process.stdin),
  new StreamMessageWriter(process.stdout),
);

let openedPath = null;

function getDiagnostics() {
  exec(
    `${process.env.ESLINT_BINARY} ${openedPath} -f json`,
    { cwd: process.env.ESLINT_CWD },
    (err, stdout, stderr) => {
      console.error(err, stdout, stderr);
      if (stderr) {
        console.error("Error in Eslint Language Server: ", err, stderr);
      } else {
        try {
          const json = JSON.parse(stdout.toString());
          connection.sendNotification("textDocument/publishDiagnostics", {
            uri: openedPath,
            diagnostics: json[0].messages.map(message => ({
              source: "eslint",
              severity: message.severity > 1 ? 1 : 2,
              message: message.message,
              range: {
                start: {
                  line: message.line - 1,
                  character: message.column - 1,
                },
                end: {
                  line: message.endLine - 1,
                  character: message.endColumn - 1,
                },
              },
            })),
          });
        } catch (e) {
          console.error("Error in Eslint Language Server: ", e);
        }
      }
    },
  );
}

connection.onRequest("initialize", () => {
  console.error("INITIALIZE LSP");
  return new Promise((resolve, reject) => {
    connection.onNotification("textDocument/didOpen", didOpenEvent => {
      console.error("Received didOpen event", didOpenEvent);
      openedPath = didOpenEvent.textDocument.uri;
      getDiagnostics();
    });

    connection.onNotification("textDocument/didChange", () => {
      if (openedPath) {
        getDiagnostics();
      } else {
        console.error("Error in ESlint Language Server: No path opened");
      }
    });

    connection.onNotification("textDocument/didClose", () => {
      openedPath = null;
    });
    resolve({});
  });
});

connection.listen();
