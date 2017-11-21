"use babel";
// @flow

import type { Diagnostic, DocumentUri } from "../Types/standard";
import JsonRpcConnection from "./JsonRpcConnection";
import type { ConnectionOptions } from "./JsonRpcConnection";

/*
** Connection from the server to the client
*/
export default class LanguageClientConnection extends JsonRpcConnection {
  constructor(options: ConnectionOptions) {
    super(options);
  }

  publishDiagnosticsForFile({
    diagnostics,
    uri,
  }: {
    diagnostics: Array<Diagnostic>,
    uri: DocumentUri,
  }) {
    return this.sendNotification("textDocument/publishDiagnostics", {
      diagnostics,
      uri,
    });
  }

  publishDiagnosticsForWorkspace({
    diagnostics,
    workspace,
  }: {
    diagnostics: Array<Diagnostic>,
    workspace: DocumentUri,
  }) {
    return this.sendNotification("workspace/publishDiagnostics", {
      diagnostics,
      workspace,
    });
  }

  clearDiagnostics({ workspace }: { workspace: DocumentUri }) {
    return this.sendNotification("workspace/clearDiagnostics", {
      workspace,
    });
  }

  busy({ workspace }: { workspace: DocumentUri }) {
    return this.sendNotification("workspace/busy", {
      workspace,
    });
  }

  terminalOutput({ data }: { data: string }) {
    return this.sendNotification("terminal/output", {
      data,
    });
  }
}
