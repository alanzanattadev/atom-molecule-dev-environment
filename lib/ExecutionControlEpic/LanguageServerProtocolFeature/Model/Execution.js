"use babel";
// @flow

import Terminal from "xterm";
import type { Task } from "../../TaskExecutionFeature/Types/types.js.flow";
import EventEmitter from "events";

export default class Execution {
  terminal: Terminal;
  task: Task;
  broker: EventEmitter;
  handlers: { [handlerName: string]: (...params: Array<any>) => void };
  constructor({ task }: { task: Task }) {
    this.task = task;
    this.broker = new EventEmitter();
    this.terminal = null;
    this._handlers = {};

    this._handleKeyDown = this._handleKeyDown.bind(this);
  }

  initTerminal() {
    this.terminal = new Terminal({
      cols: 80,
      rows: 17,
    });

    this.terminal.on("keydown", this._handleKeyDown);
  }

  stopTerminal() {
    this.terminal.off("keydown", this._handleKeyDown);
    if (this._handlers.onTerminalResize) {
      this.terminal.off("resize", this.handlers.onTerminalResize);
    }
    if (this._handlers.onTerminalData) {
      this.terminal.off("data", this.handlers.onTerminalData);
    }
  }

  _handleKeyDown(e: KeyboardEvent) {
    if (e.keyCode == 8) {
      this.terminal.write("\b ");
    } else if (!e.altKey && !e.altGraphKey && !e.ctrlKey && !e.metaKey) {
      this.terminal.write(e.key);
    }
  }

  onTerminalResize(cb: (infos: { cols: number, rows: number }) => void) {
    if (this._handlers.onTerminalResize) {
      this.terminal.off("resize", this.handlers.onTerminalResize);
    }
    this._handlers.onTerminalResize = cb;
    this.terminal.on("resize", cb);
  }

  onTerminalData(cb: (data: string) => void) {
    if (this._handlers.onTerminalData) {
      this.terminal.off("data", this.handlers.onTerminalData);
    }
    this._handlers.onTerminalData = cb;
    this.terminal.on("data", cb);
  }
}
