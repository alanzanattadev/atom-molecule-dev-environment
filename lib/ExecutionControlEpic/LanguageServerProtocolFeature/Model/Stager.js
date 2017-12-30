"use babel";
// @flow

import type { JsonRPCStreams } from "../Types/jsonrpc-stream";
import EventEmitter from "events";

export default class Stager extends EventEmitter {
  streams: JsonRPCStreams;
  constructor({ streams }: { streams: JsonRPCStreams }) {
    super();
    this.streams = streams;
  }

  kill() {
    this.emit("kill");
  }
}
