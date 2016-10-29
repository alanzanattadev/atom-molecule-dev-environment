'use babel'
// @flow

import type {Diagnostic} from "../Types/types.js.flow";
import { fromJS } from "immutable";

export default function Diagnostics(state: DiagnosticsReducer = [], action: any): DiagnosticsReducer {
  switch(action.type) {
    case "ADD_DIAGNOSTIC_FOR_TASK":
      return fromJS(state).push(action.payload.diagnostic).toJS();
    case "REMOVE_DIAGNOSTICS_OF_TASK":
      return fromJS(state).filter(diagnostic => diagnostic.get('task') != action.payload.task).toJS();
    default:
      return state;
  }
}

export type DiagnosticsReducer = Array<Diagnostic>;
