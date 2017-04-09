"use babel";
// @flow

import { connect } from "react-redux";
import ToolDiagnostics from "../Presenters/ToolDiagnostics";

import type {
  DiagnosticLocation,
  DiagnosticMode,
} from "../Types/types.js.flow";
import {
  selectDiagnosticsOfTask,
  selectLastDiagnostics,
} from "../Selectors/Diagnostics";
import type { State } from "../../../GlobalSystem/types.js.flow";
import {
  selectMostPertinentTaskOf,
  selectPertinentTaskID,
  selectTasksOfTool,
} from "../../TaskExecutionFeature/Selectors/Tasks";
import {
  selectDiagnosticsReducer,
  selectPlansReducer,
  selectTasksReducer,
} from "../../../GlobalSystem/Selectors";

import React from "react";

import type { Task } from "../../TaskExecutionFeature/Types/types.js.flow";
import {
  selectPlansOfTool,
} from "../../PlanConfigurationFeature/Selectors/PlanConfigs";
import {
  areSamePlans,
} from "../../PlanConfigurationFeature/Model/PlanManipulators";
import { List } from "immutable";
import { jumpTo } from "../Actions/JumpTo";

export class DiagnosticsStatefulSelector
  extends React.Component<DefaultProps, Props, ComponentState> {
  state: ComponentState;
  props: Props;
  static defaultProps: DefaultProps;

  constructor(props: Props) {
    super(props);

    this.state = {
      selectedTasks: [
        selectPertinentTaskID(
          selectTasksOfTool(
            selectTasksReducer(this.props.state),
            this.props.toolId,
          ),
        ),
      ],
    };
  }

  componentWillReceiveProps(nextProps: Props) {
    let prevPertinentTaskID = selectPertinentTaskID(
      selectTasksOfTool(
        selectTasksReducer(this.props.state),
        this.props.toolId,
      ),
    );
    let nextPertinentTaskID = selectPertinentTaskID(
      selectTasksOfTool(selectTasksReducer(nextProps.state), nextProps.toolId),
    );
    if (prevPertinentTaskID != nextPertinentTaskID) {
      this.setState({
        selectedTasks: [
          selectPertinentTaskID(
            selectTasksOfTool(
              selectTasksReducer(nextProps.state),
              nextProps.toolId,
            ),
          ),
        ],
      });
    }
  }

  getDiagnosticsOfTasks() {
    return this.state.selectedTasks
      .map(taskId =>
        selectLastDiagnostics(
          selectDiagnosticsOfTask(
            selectDiagnosticsReducer(this.props.state),
            taskId,
          ),
        ))
      .reduce((reduction, value) => reduction.concat(value), List())
      .toJS();
  }

  getPlansWithTasks() {
    let tasksOfTool = selectTasksOfTool(
      selectTasksReducer(this.props.state),
      this.props.toolId,
    );
    return selectPlansOfTool(
      selectPlansReducer(this.props.state),
      this.props.toolId,
    ).map(plan => ({
      plan: plan,
      tasks: tasksOfTool
        .filter(task => areSamePlans(task.plan, plan))
        .map(task => Object.assign({}, task, {
          selected: this.state.selectedTasks.includes(task.id),
        }))
        .sort(
          (taskA, taskB) =>
            selectMostPertinentTaskOf(taskA, taskB) == taskA ? -1 : 1,
        ),
    }));
  }

  render() {
    return (
      <ToolDiagnostics
        onTaskClick={(task: Task) => {
          if (this.state.selectedTasks.findIndex(id => id === task.id) !== -1) {
            this.setState({
              selectedTasks: this.state.selectedTasks.filter(
                id => id != task.id,
              ),
            });
          } else {
            this.setState({
              selectedTasks: this.state.selectedTasks.concat([task.id]),
            });
          }
        }}
        onPlanClick={() => {}}
        diagnostics={this.getDiagnosticsOfTasks()}
        diagnosticsMode={this.props.diagnosticsMode}
        onJumpTo={this.props.onJumpTo}
        plansWithTasks={this.getPlansWithTasks()}
        {...Object.assign({}, this.props, { state: null })}
      />
    );
  }
}

DiagnosticsStatefulSelector.defaultProps = {};

type DefaultProps = {};

type Props = {
  state: State,
  toolId: string,
  onJumpTo: (location: DiagnosticLocation) => void,
  diagnosticsMode?: DiagnosticMode,
};

type ComponentState = {
  selectedTasks: Array<string>,
};

export function mapStateToProps(
  state: State,
  // eslint-disable-next-line no-unused-vars
  ownProps: { toolId: string },
): {
  state: State,
} {
  return {
    state,
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

export var Connecter = connect(mapStateToProps, mapDispatchToProps);

export default Connecter(DiagnosticsStatefulSelector);
