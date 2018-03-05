"use babel";
// @flow

import { runController } from "./Controller";
import StreamBuffers from "stream-buffers";
import type { PlanConfig } from "../../PlanConfigurationFeature/Types/types";
import { Writable } from "stream";
import Stager from "./Stager";

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

export function runIntegratedStager(config: { plan: PlanConfig }): Stager {
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

  const stager = new Stager({
    streams: moleculeStreams,
  });

  const controller = runController({
    plan: config.plan,
    streams: controllerStreams,
    actions: {
      kill: () => {
        stager.emit("killed");
      },
    },
  });

  stager.on("kill", () => {
    controller.kill();
  });

  return stager;
}
