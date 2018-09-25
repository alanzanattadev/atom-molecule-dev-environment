"use babel";
// @flow

import { Map } from "immutable";
import Execution from "../../LanguageServerProtocolFeature/Model/Execution";
import EventEmitter from "events";

export class TerminalsController {
  terminals: Map<string, Execution>;
  eventEmitter: EventEmitter;

  constructor() {
    this.terminals = Map();
    this.eventEmitter = new EventEmitter();
  }

  addTerminal(id: string) {
    const execution = new Execution({ task: null });
    this.terminals = this.terminals.set(id, execution);
    this.eventEmitter.emit("change", {
      type: "added",
      id,
    });
    return execution;
  }

  removeTerminal(id: string) {
    this.terminals = this.terminals.remove(id);
    this.eventEmitter.emit("change", {
      type: "removed",
      id,
    });
  }

  getTerminalExecution(id: string) {
    return this.terminals.get(id);
  }
}

export default new TerminalsController();
