"use babel";
// @flow

import { connect } from "react-redux";
import DiagnosticDetails from "../Presenters/DiagnosticDetails";
import { selectTasksReducer } from "../../../GlobalSystem/Selectors";
import { selectTaskOfID } from "../../TaskExecutionFeature/Selectors/Tasks";
import { DevToolsControllerInstance } from "../../DevtoolLoadingFeature/Model/DevToolsController";
import type { State } from "../../../GlobalSystem/types";
import type { MoleculeDiagnostic } from "../Types/types";

export function mapStateToProps(
  state: State,
  ownProps: { diagnostic: MoleculeDiagnostic },
): { view: any } {
  const task = selectTaskOfID(
    selectTasksReducer(state),
    ownProps.diagnostic.task || "-42",
  );
  return {
    view: DevToolsControllerInstance.getView(task ? task.plan.tool.id : "-42"),
  };
}

export function mapDispatchToProps() {
  return {};
}

export var Connecter = connect(mapStateToProps, mapDispatchToProps);

export default Connecter(DiagnosticDetails);
