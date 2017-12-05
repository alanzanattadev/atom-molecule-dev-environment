"use babel";
// @flow

import EventEmitter from "events";

export default class StrategyRunner extends EventEmitter {
  constructor(...params: Array<any>) {
    super();
  }

  run() {}

  stop() {}
}
