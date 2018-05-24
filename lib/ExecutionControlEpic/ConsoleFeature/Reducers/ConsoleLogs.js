"use babel";
// @flow

import type { ConsoleLog } from "../../LanguageServerProtocolFeature/Types/standard";
import { OrderedMap } from "immutable";

export default function(
  state: ConsoleLogsReducer = OrderedMap(),
  action: any,
): ConsoleLogsReducer {
  switch (action.type) {
    case "ADD_CONSOLE_LOG":
      return state.setIn([action.payload.consoleLog.date + state.size], {
        ...action.payload.consoleLog,
      });
    default:
      return state;
  }
}

export type ConsoleLogsReducer = OrderedMap<string, ConsoleLog>;
