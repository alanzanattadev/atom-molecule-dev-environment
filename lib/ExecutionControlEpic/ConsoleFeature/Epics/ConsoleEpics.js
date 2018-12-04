"use babel";
// @flow

import Rx from "rxjs";
import { addConsoleLogsForTask } from "../Actions/AddConsoleLog";
import { addBufferedLogsForTask } from "../Actions/AddBufferedLogs";
import {
  ConsoleLogError,
  ConsoleLogWarning,
  ConsoleLogInformation,
} from "../Types/types";

const consoleEpic = () => (action$: any) => {
  const currentDate = require("moment");
  const molecule = {
    source: "Molecule",
    color: "#592b71",
    version: "0.4.0",
  };

  return Rx.Observable.merge(
    action$
      .ofType("BUFFER_CONSOLE_LOG")
      .bufferTime(3000)
      .filter(t => t && t.length > 0)
      .map(actions => addBufferedLogsForTask(actions.map(a => a.payload))),

    action$.ofType("ADD_PLAN_CONFIGURATION").map(action =>
      addConsoleLogsForTask({
        ...molecule,
        severity: ConsoleLogInformation,
        message:
          "The plan " +
          action.payload.name +
          " from the tool " +
          action.payload.tool.name +
          " has been created",
        date: currentDate().format("DD-MM-YYYY kk:mm:ss"),
      }),
    ),

    action$.ofType("FEATURE_LOAD").map(action =>
      addConsoleLogsForTask({
        ...molecule,
        severity: ConsoleLogInformation,
        message: "The option " + action.payload.featureName + " is active",
        date: currentDate().format("DD-MM-YYYY kk:mm:ss"),
      }),
    ),

    action$.ofType("REMOVE_PLAN_CONFIGURATION").map(action =>
      addConsoleLogsForTask({
        ...molecule,
        severity: ConsoleLogInformation,
        message:
          "The plan " +
          action.payload.name +
          " from the tool " +
          action.payload.tool.name +
          " has been deleted",
        date: currentDate().format("DD-MM-YYYY kk:mm:ss"),
      }),
    ),

    action$.ofType("PIN_PLAN_CONFIGURATION").map(action =>
      addConsoleLogsForTask({
        ...molecule,
        severity: ConsoleLogInformation,
        message:
          "The plan " +
          action.payload.planConfig.name +
          " from the tool " +
          action.payload.planConfig.tool.name +
          " has been pinned",
        date: currentDate().format("DD-MM-YYYY kk:mm:ss"),
      }),
    ),

    action$.ofType("UNPIN_PLAN_CONFIGURATION").map(action =>
      addConsoleLogsForTask({
        ...molecule,
        severity: ConsoleLogInformation,
        message:
          "The plan " +
          action.payload.planConfig.name +
          " from the tool " +
          action.payload.planConfig.tool.name +
          " has been unpinned",
        date: currentDate().format("DD-MM-YYYY kk:mm:ss"),
      }),
    ),

    action$.ofType("RUN_TASK").map(action =>
      addConsoleLogsForTask({
        ...molecule,
        severity: ConsoleLogInformation,
        message:
          "The plan " +
          action.payload.plan.name +
          " from the tool " +
          action.payload.plan.tool.name +
          " is running",
        date: currentDate().format("DD-MM-YYYY kk:mm:ss"),
      }),
    ),

    action$.ofType("STOP_TASK").map(action =>
      addConsoleLogsForTask({
        ...molecule,
        severity: ConsoleLogInformation,
        message: "The task has stopped for " + action.payload.name,
        date: currentDate().format("DD-MM-YYYY kk:mm:ss"),
      }),
    ),

    action$.ofType("CRASH_TASK").map(action =>
      addConsoleLogsForTask({
        ...molecule,
        severity: ConsoleLogError,
        message: "The task " + action.payload.name + " has crashed",
        date: currentDate().format("DD-MM-YYYY kk:mm:ss"),
      }),
    ),

    action$.ofType("FAIL_TASK").map(action =>
      addConsoleLogsForTask({
        ...molecule,
        severity: ConsoleLogError,
        message: "The task" + action.payload.name + "has stopped",
        date: currentDate().format("DD-MM-YYYY kk:mm:ss"),
      }),
    ),

    action$.ofType("KILL_TASK").map(action =>
      addConsoleLogsForTask({
        ...molecule,
        severity: ConsoleLogWarning,
        message:
          "The task " +
          action.payload.plan.name +
          " of tool " +
          action.payload.plan.tool.name +
          " has been killed",
        date: currentDate().format("DD-MM-YYYY kk:mm:ss"),
      }),
    ),
  );
};

export default consoleEpic;
