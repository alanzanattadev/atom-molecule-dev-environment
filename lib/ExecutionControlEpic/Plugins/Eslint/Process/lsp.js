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

function getDiagnostics(openedPath) {
  exec(
    `${process.env.ESLINT_BINARY} ${openedPath} -f json`,
    { cwd: process.env.ESLINT_CWD },
    (err, stdout, stderr) => {
      if (stderr) {
        // Note: err is non-null when eslint finds diagnostics in the code
        // (because the executable returns 1)
        // To check for actual execution errors, we need to read stderr
        void err;
        console.error("Error running Eslint: ", stderr.toString());
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

connection.onRequest("initialize", async () => {
  connection.onNotification("textDocument/didOpen", didOpenEvent => {
    getDiagnostics(didOpenEvent.textDocument.uri);
  });

  connection.onNotification("textDocument/didSave", didSaveEvent => {
    getDiagnostics(didSaveEvent.textDocument.uri);
  });
});

connection.listen();
