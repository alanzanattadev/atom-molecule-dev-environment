"use babel";
// @flow

import JsonRpcConnection from "./JsonRpcConnection";
import type { ConnectionOptions } from "./JsonRpcConnection";
import type { InitializeParams } from "../Types/standard";

/*
** Connection initiated from the client to the server.
*/
export default class LanguageServerConnection extends JsonRpcConnection {
  constructor(options: ConnectionOptions) {
    super(options);
  }

  async initialize(params: InitializeParams) {
    return await this.sendRequest("initialize", params);
  }

  async initalized() {
    return await this.sendRequest("initialized");
  }

  async shutdown() {
    return await this.sendRequest("shutdown");
  }

  async exit() {
    return await this.sendRequest("exit");
  }
}
