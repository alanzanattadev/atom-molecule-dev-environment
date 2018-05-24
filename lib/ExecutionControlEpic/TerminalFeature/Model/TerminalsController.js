"use babel";
// @flow

import { Map } from "immutable";
import Execution from "../../LanguageServerProtocolFeature/Model/Execution";

export class TerminalsController {
  terminals: Map<string, Execution>;

  constructor() {
    this.terminals = Map();
  }

  addTerminal(id: string) {
    const execution = new Execution({ task: null });
    this.terminals = this.terminals.set(id, execution);
    return execution;
  }

  removeTerminal(id: string) {
    this.terminals = this.terminals.remove(id);
  }

  getTerminalExecution(id: string) {
    return this.terminals.get(id);
  }
}

export default new TerminalsController();
