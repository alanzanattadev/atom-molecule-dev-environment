"use babel";
// @flow

import * as jsonrpc from "vscode-jsonrpc";
import type { AugmentedEventType } from "../Types/augmented";
import type { JsonRPCStreams } from "../Types/jsonrpc-stream";

export type ConnectionOptions = JsonRPCStreams;

export default class JsonRpcConnection {
  _connection: jsonrpc.connection;

  constructor({ inStream, outStream }: ConnectionOptions) {
    this._connection = jsonrpc.createMessageConnection(
      new jsonrpc.StreamMessageReader(inStream),
      new jsonrpc.StreamMessageWriter(outStream),
    );
  }

  listen() {
    this._connection.listen();
  }

  onNotification(
    messageType: AugmentedEventType,
    cb: (...params: Array<any>) => void,
  ) {
    return this._connection.onNotification(messageType, (...params) => {
      cb(...params);
    });
  }

  onRequest(
    messageType: AugmentedEventType,
    cb: (...params: Array<any>) => Promise<any>,
  ) {
    return this._connection.onRequest(messageType, (...params) => {
      return cb(...params);
    });
  }

  async sendRequest(message: AugmentedEventType, args?: Object) {
    return await this._connection.sendRequest(message, args);
  }

  sendNotification(message: AugmentedEventType, args?: Object): void {
    this._connection.sendNotification(message, args);
  }
}
