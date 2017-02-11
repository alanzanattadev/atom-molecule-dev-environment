'use babel'
// @flow

import { connect } from "react-redux";
import DevToolsWithDiagnostics from "../Presenters/DevToolsWithDiagnostics";
import type {DevToolWithDiagnostics as DevToolWithDiagnosticsType} from "../Types/types.js.flow";
import {selectDevtoolsReducer, selectTasksReducer, selectDiagnosticsReducer} from "../../../GlobalSystem/Selectors";
import {selectDevtools} from "../Selectors/DevToolsInfos";
import type {State} from "../../../GlobalSystem/types.js.flow";
import {openTargetConfigurer} from "../../TargetConfigurationFeature/Actions/OpenTargetConfigurer";
import {selectTasksOfTool, selectPertinentTaskID, selectStateOfTool} from "../../TaskExecutionFeature/Selectors/Tasks";
import { fromJS } from "immutable";
import {selectDiagnosticsOfTask, selectLastDiagnostics} from "../../DiagnosticsFeature/Selectors/Diagnostics";
import type {DiagnosticType} from "../../DiagnosticsFeature/Types/types.js.flow";
import {openDiagnosticsTraveller} from "../../DiagnosticsFeature/Actions/OpenDiagnosticsTraveller";

export function mapStateToProps(state: State): {tools: Array<DevToolWithDiagnosticsType>} {
  return {
    tools: selectDevtools(selectDevtoolsReducer(state))
            .map(devtool => {
              let diagnostics = selectLastDiagnostics(
                                  selectDiagnosticsOfTask(
                                    selectDiagnosticsReducer(state),
                                    selectPertinentTaskID(
                                      selectTasksOfTool(selectTasksReducer(state), devtool.id)
                                    )
                                  )
                                );
              return fromJS(devtool)
                      .set('state', selectStateOfTool(selectTasksReducer(state), devtool.id))
                      .set('infos', diagnostics.filter(d => d.type == 'info').length)
                      .set('warnings', diagnostics.filter(d => d.type == 'warning').length)
                      .set('errors', diagnostics.filter(d => d.type == 'error').length)
                      .set('successes', diagnostics.filter(d => d.type == 'success').length)
                      .toJS();
            })
  };
};

export function mapDispatchToProps(dispatch: (action: any) => any): {
  onToolDiagnosticsClick(devtool: DevToolWithDiagnosticsType, type: DiagnosticType): void,
  onToolLogsClick(devtool: DevToolWithDiagnosticsType): void,
  onToolSettingsClick(devtool: DevToolWithDiagnosticsType): void
} {
  return {
    onToolSettingsClick: (devtool: DevToolWithDiagnosticsType) => {
      dispatch(openTargetConfigurer(devtool));
    },
    onToolLogsClick: (devtool: DevToolWithDiagnosticsType) => {
      dispatch(openDiagnosticsTraveller(devtool.id, devtool.name));
    },
    onToolDiagnosticsClick: (devtool: DevToolWithDiagnosticsType, type: DiagnosticType) => {
      dispatch(openDiagnosticsTraveller(devtool.id, devtool.name));
    },
  }
};

export var Connecter = connect(mapStateToProps, mapDispatchToProps);

export default Connecter(DevToolsWithDiagnostics);
