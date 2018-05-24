"use babel";
// @flow

import Rx from "rxjs";
import { addTerminal } from "../Actions/AddTerminal";
import TerminalStrategy from "../../LanguageServerProtocolFeature/Model/TerminalStrategy";
import TerminalsController from "../Model/TerminalsController";

let lastUsedTerminalId = -1;

export function CreateTerminal() {
  return action$ =>
    action$.ofType("CREATE_TERMINAL").mergeMap(action => {
      lastUsedTerminalId += 1;
      const id = lastUsedTerminalId.toString();
      return Rx.Observable.create(observer => {
        const execution = TerminalsController.addTerminal(id);
        execution.initTerminal();
        const strategy = new TerminalStrategy({
          strategy: {
            type: "terminal",
            shell: "bash -c",
            command: "/bin/bash",
            cwd: action.payload.path,
            env: process.env,
          },
        });
        strategy.on("data", ({ data }) => {
          execution.terminal.write(data);
          execution.broker.emit("terminal/output", {
            data,
          });
        });
        strategy.on("exit", () => observer.complete());
        strategy.on("error", err => console.log(err) || observer.complete());
        strategy.run();
        execution.onTerminalData(data =>
          strategy.emit("terminal/input", { data }),
        );
        execution.onTerminalResize(info =>
          strategy.emit("terminal/resize", {
            cols: info.cols,
            rows: info.rows,
          }),
        );
        observer.next(addTerminal(id, action.payload.path));
        return function unsubscribe() {
          strategy.stop();
          TerminalsController.removeTerminal(action.payload.id);
        };
      }).takeUntil(
        action$.ofType("REMOVE_TERMINAL").filter(a => a.payload.id === id),
      );
    });
}
