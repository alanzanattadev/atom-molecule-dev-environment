'use babel'
// @flow

import { connect } from "react-redux";
import ToolDiagnostics from "../Presenters/ToolDiagnostics";
import type {Diagnostic} from "../Types/types.js.flow";
import {selectDiagnosticsOfTask} from "../Selectors/Diagnostics";
import type {State} from "../../../GlobalSystem/types.js.flow";
import {selectPertinentTaskID, selectTasksOfTool} from "../../TaskExecutionFeature/Selectors/Tasks";
import {selectDiagnosticsReducer, selectTasksReducer} from "../../../GlobalSystem/Selectors";

export function mapStateToProps(state: State, ownProps: {toolId: string}): {
  diagnostics: Array<Diagnostic>
} {
  return {
    diagnostics:  selectDiagnosticsOfTask(
                    selectDiagnosticsReducer(state),
                    selectPertinentTaskID(
                      selectTasksOfTool(selectTasksReducer(state), ownProps.toolId)
                    )
                  )
  };
};

export function mapDispatchToProps(dispatch: (action: any) => any): {} {
  return {

  };
};

export var Connecter = connect(mapStateToProps, mapDispatchToProps);

export default Connecter(ToolDiagnostics);
