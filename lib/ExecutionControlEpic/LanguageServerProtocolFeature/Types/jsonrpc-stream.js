"use babel";
// @flow

export type JsonRPCStreams = {
  inStream: stream$Readable,
  outStream: stream$Writable,
};
