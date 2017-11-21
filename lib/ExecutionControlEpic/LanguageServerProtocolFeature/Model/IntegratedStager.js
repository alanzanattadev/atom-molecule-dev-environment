"use babel";
// @flow

import { runController } from "./Controller";
import StreamBuffers from "stream-buffers";
import type { JsonRPCStreams } from "../Types/jsonrpc-stream";
import type { PlanConfig } from "../../PlanConfigurationFeature/Types/types.js.flow";
import { Writable } from "stream";

class RedirectWritableStream extends Writable {
  _readable: stream$Readable;

  constructor(options, readable: stream$Readable) {
    super(options);
    this._readable = readable;
  }

  _write(chunk, encoding, cb) {
    this._readable.push(chunk);
    cb();
  }
}

export function runIntegratedStager(config: {
  plan: PlanConfig,
}): { streams: JsonRPCStreams } {
  const controllerInStream = new StreamBuffers.ReadableStreamBuffer();
  const moleculeInStream = new StreamBuffers.ReadableStreamBuffer();
  const controllerOutStream = new RedirectWritableStream(
    undefined,
    moleculeInStream,
  );
  const moleculeOutStream = new RedirectWritableStream(
    undefined,
    controllerInStream,
  );

  const controllerStreams = {
    inStream: controllerInStream,
    outStream: controllerOutStream,
  };

  const moleculeStreams = {
    inStream: moleculeInStream,
    outStream: moleculeOutStream,
  };

  runController({
    plan: config.plan,
    streams: controllerStreams,
    actions: {
      kill: () => {},
    },
  });

  return {
    streams: moleculeStreams,
  };
}
