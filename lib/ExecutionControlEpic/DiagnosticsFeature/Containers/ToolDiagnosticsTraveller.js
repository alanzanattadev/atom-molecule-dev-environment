"use babel";
// @flow

import { connect } from "react-redux";
import { selectDiagnosticsOfTask } from "../Selectors/Diagnostics";
import type { Range } from "../../LanguageServerProtocolFeature/Types/standard";
import type { State } from "../../../GlobalSystem/types";
import {
  selectPertinentTaskID,
  selectTaskOfID,
  selectTasksOfPlan,
} from "../../TaskExecutionFeature/Selectors/Tasks";
import {
  selectDiagnosticsReducer,
  selectTasksReducer,
} from "../../../GlobalSystem/Selectors";
import type { Task } from "../../TaskExecutionFeature/Types/types";
import { jumpTo } from "../Actions/JumpTo";
import { compose, lifecycle, withProps, withState } from "recompose";
import DiagnosticsPanel from "../Presenters/DiagnosticsPanel";
import type { PlanConfig } from "../../PlanConfigurationFeature/Types/types";
import ExecutionsController from "../../LanguageServerProtocolFeature/Model/ExecutionsController";

export function mapStateToProps(
  state: State,
  // eslint-disable-next-line no-unused-vars
  ownProps: { toolId: string },
): {
  state: State,
} {
  return {
    state,
    getExecution: selectedTask =>
      ExecutionsController.getExecution(selectedTask),
  };
}

export function mapDispatchToProps(
  dispatch: (action: any) => any,
): { onJumpTo(range: Range): void } {
  return {
    onJumpTo(range: Range) {
      dispatch(jumpTo(range));
    },
  };
}

export const Connecter = connect(mapStateToProps, mapDispatchToProps);

function selectPertinentTaskIDForPanel(
  state,
  toolId: string,
  plan: PlanConfig,
) {
  if (plan === undefined) return "";
  return selectPertinentTaskID(
    selectTasksOfPlan(selectTasksReducer(state), plan),
  );
}

export const TaskState = withState(
  "selectedTaskId",
  "setSelectedTaskId",
  ({
    state,
    toolId,
    plan,
  }: {
    state: State,
    toolId: string,
    plan: PlanConfig,
  }) => selectPertinentTaskIDForPanel(state, toolId, plan),
);

export const PertinentTaskSelector = lifecycle({
  componentWillReceiveProps(nextProps) {
    let prevPertinentTaskID = selectPertinentTaskIDForPanel(
      this.props.state,
      this.props.toolId,
      this.props.plan,
    );
    let nextPertinentTaskID = selectPertinentTaskIDForPanel(
      nextProps.state,
      nextProps.toolId,
      nextProps.plan,
    );
    if (prevPertinentTaskID != nextPertinentTaskID) {
      this.props.setSelectedTaskId(nextPertinentTaskID);
    }
  },
});

export const DiagnosticsSelector = withProps(({ state, selectedTaskId }) => ({
  diagnostics: selectDiagnosticsOfTask(
    selectDiagnosticsReducer(state),
    selectedTaskId,
  ),
}));

export const ExecutionSelector = withProps(
  ({ getExecution, selectedTaskId }) => {
    const execution = getExecution(selectedTaskId);
    return {
      xtermInstance:
        execution != null && execution.task.strategy.type === "terminal"
          ? execution.terminal
          : undefined,
    };
  },
);

export const TaskChangeHandler = withProps(({ setSelectedTaskId }) => ({
  onTaskClick: (task: Task) => setSelectedTaskId(task.id),
}));

export const Adapter = withProps(({ state, plan, selectedTaskId }) => ({
  state: null,
  currentTask: selectTaskOfID(selectTasksReducer(state), selectedTaskId),
  tasks:
    (plan &&
      selectTasksOfPlan(state.tasks, plan).map(task => ({
        ...task,
        selected: selectedTaskId === task.id,
      }))) ||
    [],
}));

export const enhance = compose(
  Connecter,
  TaskState,
  PertinentTaskSelector,
  ExecutionSelector,
  DiagnosticsSelector,
  TaskChangeHandler,
  Adapter,
);

export default enhance(DiagnosticsPanel);
