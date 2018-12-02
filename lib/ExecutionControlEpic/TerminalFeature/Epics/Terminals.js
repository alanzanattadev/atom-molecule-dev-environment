"use babel";
// @flow

import Rx from "rxjs";
import { addTerminal } from "../Actions/AddTerminal";
import { removeTerminal } from "../Actions/RemoveTerminal";
import TerminalStrategy from "../../LanguageServerProtocolFeature/Model/TerminalStrategy";
import getUserShell from "../Model/GetUserShell";
import TerminalsController from "../Model/TerminalsController";
import os from "os";
import path from "path";

let lastUsedTerminalId = -1;

export function CreateTerminal() {
  return action$ =>
    action$.ofType("CREATE_TERMINAL").mergeMap(action => {
      lastUsedTerminalId += 1;
      const id = lastUsedTerminalId.toString();

      return Rx.Observable.create(observer => {
        const execution = TerminalsController.addTerminal(id);
        execution.initTerminal();

        let shell = os.platform == "win32" ? "cmd.exe /c" : "sh -c";
        let command = getUserShell(os.platform());

        const strategy = new TerminalStrategy({
          strategy: {
            type: "terminal",
            shell: shell,
            command: command,
            cwd: path.dirname(action.payload.path),
            env: process.env,
          },
        });

        strategy.on("data", ({ data }) => {
          execution.terminal.write(data);
          execution.broker.emit("terminal/output", {
            data,
          });
        });

        strategy.on("exit", () => {
          observer.next(removeTerminal(id));
          observer.complete();
        });
        strategy.on("error", err => {
          console.log(err);
          observer.next(removeTerminal(id));
          observer.complete();
        });
        strategy.run();

        execution.onTerminalData(data => {
          strategy.emit("terminal/input", { data });
        });
        execution.onTerminalResize(info => {
          strategy.emit("terminal/resize", {
            cols: info.cols,
            rows: info.rows,
          });
        });

        observer.next(addTerminal(id, action.payload.path));

        return function unsubscribe() {
          strategy.stop();
          execution.stopTerminal();
          execution.terminal.dispose();
          TerminalsController.removeTerminal(id);
        };
      }).takeUntil(
        action$.ofType("REMOVE_TERMINAL").filter(a => a.payload.id === id),
      );
    });
}
