"use babel";
// @flow

import EventEmitter from "events";
import JsonRpcConnection from "./JsonRpcConnection";
import type { ConnectionOptions } from "./JsonRpcConnection";

export default class StrategyRunner extends EventEmitter {
  connection: ?JsonRpcConnection;

  constructor(...params: Array<any>) {
    super();

    this.connection = null;
  }

  run(): void {}

  stop(): void {}

  isStrategyLanguageServer(): boolean {
    return false;
  }

  isLanguageClient(): boolean {
    return this.isStrategyLanguageServer() && this.connection != null;
  }

  setupLanguageClient(options: ConnectionOptions) {
    this.connection = new JsonRpcConnection(options);
    this.connection.listen();
  }
}
