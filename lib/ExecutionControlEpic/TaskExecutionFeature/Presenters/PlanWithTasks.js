"use babel";
// @flow

import React from "react";
import Plan from "../../PlanConfigurationFeature/Presenters/Plan";
import Tasks from "./Tasks";
import type {PlanConfig} from "../../PlanConfigurationFeature/Types/types.js.flow";
import type {Task, TaskState} from "../Types/types.js.flow";

export default class PlanWithTasks
  extends React.Component<DefaultProps, Props, State> {
  state: State;
  props: Props;
  static defaultProps: DefaultProps;

  constructor(props: Props) {
    super(props);

    this.state = {
      hovered: false,
    };
  }

  render() {
    return (
      <div
        style={{ position: "relative", overflow: "visible" }}
        onMouseEnter={() => this.setState({ hovered: true })}
        onMouseLeave={() => this.setState({ hovered: false })}
      >
        <Plan
          name={this.props.plan.name}
          iconUri={this.props.plan.tool.iconUri}
          state={this.props.plan.state}
          onClick={() => this.props.onPlanClick(this.props.plan)}
        />
        <div
          style={{
            position: "absolute",
            top: 50,
            left: 0,
            visibility: this.state.hovered ? "visible" : "hidden",
          }}
        >
          <Tasks
            tasks={this.props.tasks}
            onTaskClick={task => this.props.onTaskClick(task)}
            limited
          />
        </div>
      </div>
    );
  }
}

PlanWithTasks.propTypes = {};

PlanWithTasks.defaultProps = {};

type DefaultProps = {};

type Props = {
  plan: PlanConfig & { state: TaskState },
  tasks: Array<Task & { selected: boolean }>,
  onPlanClick(plan: PlanConfig): void,
  onTaskClick(task: Task): void,
};

type State = {
  hovered: boolean,
};
