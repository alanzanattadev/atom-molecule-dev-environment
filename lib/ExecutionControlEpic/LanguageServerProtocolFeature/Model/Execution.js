"use babel";
// @flow

import Terminal from "xterm";
import type { Task } from "../../TaskExecutionFeature/Types/types.js.flow";
import EventEmitter from "events";

export default class Execution {
  terminal: Terminal;
  task: Task;
  broker: EventEmitter;
  _handlers: { [handlerName: string]: (...params: Array<any>) => void };
  constructor({ task }: { task: Task }) {
    this.task = task;
    this.broker = new EventEmitter();
    this.terminal = null;
    this._handlers = {};
  }

  initTerminal() {
    this.terminal = new Terminal({
      cols: 80,
      rows: 17,
    });
  }

  stopTerminal() {
    if (this._handlers.onTerminalResize) {
      this.terminal.off("resize", this._handlers.onTerminalResize);
    }
    if (this._handlers.onTerminalData) {
      this.terminal.off("data", this._handlers.onTerminalData);
    }
  }

  onTerminalResize(cb: (info: { cols: number, rows: number }) => void) {
    if (this._handlers.onTerminalResize) {
      this.terminal.off("resize", this._handlers.onTerminalResize);
    }
    this._handlers.onTerminalResize = cb;
    this.terminal.on("resize", cb);
  }

  onTerminalData(cb: (data: string) => void) {
    if (this._handlers.onTerminalData) {
      this.terminal.off("data", this._handlers.onTerminalData);
    }
    this._handlers.onTerminalData = cb;
    this.terminal.on("data", cb);
  }
}
