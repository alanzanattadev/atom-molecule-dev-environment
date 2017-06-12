"use babel";
// @flow

import { connect } from "react-redux";
import type { DiagnosticLocation } from "../Types/types.js.flow";
import {
  selectDiagnosticsOfTask,
  selectLastDiagnostics,
} from "../Selectors/Diagnostics";
import type { State } from "../../../GlobalSystem/types.js.flow";
import {
  selectPertinentTaskID,
  selectTasksOfPlan,
} from "../../TaskExecutionFeature/Selectors/Tasks";
import {
  selectDiagnosticsReducer,
  selectTasksReducer,
} from "../../../GlobalSystem/Selectors";
import type { Task } from "../../TaskExecutionFeature/Types/types.js.flow";
import {
  TasksControllerInstance,
} from "../../TaskExecutionFeature/Model/TasksController";
import { jumpTo } from "../Actions/JumpTo";
import { compose, withProps, withState, lifecycle } from "recompose";
import DiagnosticsPanel from "../Presenters/DiagnosticsPanel";
import type {
  PlanConfig,
} from "../../PlanConfigurationFeature/Types/types.js.flow";

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
      TasksControllerInstance.getExecutionForTaskID(selectedTask),
  };
}

export function mapDispatchToProps(
  dispatch: (action: any) => any,
): { onJumpTo(location: DiagnosticLocation): void } {
  return {
    onJumpTo(location: DiagnosticLocation) {
      dispatch(jumpTo(location));
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
  diagnostics: selectLastDiagnostics(
    selectDiagnosticsOfTask(selectDiagnosticsReducer(state), selectedTaskId),
  ),
}));

export const ExecutionSelector = withProps(
  ({ getExecution, selectedTaskId }) => {
    const execution = getExecution(selectedTaskId);
    return {
      xtermInstance: execution != null &&
        execution.task.strategy.type === "shell"
        ? execution.terminal
        : undefined,
    };
  },
);

export const TaskChangeHandler = withProps(({ setSelectedTaskId }) => ({
  onTaskClick: (task: Task) => setSelectedTaskId(task.id),
}));

export const Adapter = withProps(() => ({ state: null }));

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
