'use babel'
// @flow

import { connect } from "react-redux";
import ToolDiagnostics from "../Presenters/ToolDiagnostics";
import type {Diagnostic} from "../Types/types.js.flow";
import {selectDiagnosticsOfTask, selectLastDiagnostics} from "../Selectors/Diagnostics";
import type {State} from "../../../GlobalSystem/types.js.flow";
import {selectPertinentTaskID, selectTasksOfTool, selectMostPertinentTaskOf} from "../../TaskExecutionFeature/Selectors/Tasks";
import {selectDiagnosticsReducer, selectTasksReducer, selectPlansReducer} from "../../../GlobalSystem/Selectors";

import React from 'react';
import type {PlanConfig} from "../../PlanConfigurationFeature/Types/types.js.flow";
import type {Task} from "../../TaskExecutionFeature/Types/types.js.flow";
import {selectPlansOfTool} from "../../PlanConfigurationFeature/Selectors/PlanConfigs";
import {areSamePlans} from "../../PlanConfigurationFeature/Model/PlanManipulators";
import {List} from 'immutable';

export class DiagnosticsStatefulSelector extends React.Component<DefaultProps, Props, ComponentState> {

  state: ComponentState;
  props: Props;
  static defaultProps: DefaultProps;

  constructor(props: Props) {
    super(props);

    this.state = {
      selectedTasks: [
        selectPertinentTaskID(
          selectTasksOfTool(selectTasksReducer(this.props.state), this.props.toolId)
        )
      ]
    }
  }

  componentWillReceiveProps(nextProps: Props) {
    let prevPertinentTaskID = selectPertinentTaskID(
      selectTasksOfTool(selectTasksReducer(this.props.state), this.props.toolId)
    );
    let nextPertinentTaskID = selectPertinentTaskID(
      selectTasksOfTool(selectTasksReducer(nextProps.state), nextProps.toolId)
    );
    if (prevPertinentTaskID != nextPertinentTaskID) {
      console.log("NEW TASK ID : ", nextPertinentTaskID);
      this.setState({selectedTasks: [selectPertinentTaskID(
        selectTasksOfTool(selectTasksReducer(nextProps.state), nextProps.toolId)
      )]});
    }
  }

  getDiagnosticsOfTasks() {
    return this.state.selectedTasks
            .map(taskId => selectLastDiagnostics(selectDiagnosticsOfTask(selectDiagnosticsReducer(this.props.state), taskId)))
            .reduce((reduction, value) => reduction.concat(value), List())
            .toJS();
  }

  getPlansWithTasks() {
    let tasksOfTool = selectTasksOfTool(selectTasksReducer(this.props.state), this.props.toolId);
    return selectPlansOfTool(selectPlansReducer(this.props.state), this.props.toolId)
            .map(plan => ({
              plan: plan,
              tasks: tasksOfTool
                      .filter(task => areSamePlans(task.plan, plan))
                      .map(task => Object.assign({}, task, {selected: this.state.selectedTasks.includes(task.id)}))
                      .sort((taskA, taskB) => selectMostPertinentTaskOf(taskA, taskB) == taskA ? -1 : 1)
            }))
  }

  render() {
    return (
      <ToolDiagnostics
        onTaskClick={(task: Task) => {
          let index;
          if ((index = this.state.selectedTasks.findIndex(id => id == task.id)) != -1) {
            this.setState({selectedTasks: this.state.selectedTasks.filter(id => id != task.id)});
          } else {
            this.setState({selectedTasks: this.state.selectedTasks.concat([task.id])})
          }
        }}
        onPlanClick={(plan: PlanConfig) => {}}
        diagnostics={this.getDiagnosticsOfTasks()}
        plansWithTasks={this.getPlansWithTasks()}
        {...Object.assign({}, this.props, {state: null})}
      />
    )
  }
}

DiagnosticsStatefulSelector.propTypes = {

};

DiagnosticsStatefulSelector.defaultProps = {

};

type DefaultProps = {

};

type Props = {
  state: State,
  toolId: string,
};

type ComponentState = {
  selectedTasks: Array<string>
};

export function mapStateToProps(state: State, ownProps: {toolId: string}): {
  state: State
} {
  return {
    state
  };
};

export function mapDispatchToProps(dispatch: (action: any) => any): {} {
  return {

  };
};

export var Connecter = connect(mapStateToProps, mapDispatchToProps);

export default Connecter(DiagnosticsStatefulSelector);
