'use babel'
// @flow

import React from 'react';
import type {TaskState, Task} from "../Types/types.js";
import PlanWithTasks from "./PlanWithTasks";
import type {PlanConfig} from '../../PlanConfigurationFeature/Types/types.js.flow';

export default class PlansWithTasks extends React.Component<DefaultProps, Props, State> {

  state: State;
  props: Props;
  static defaultProps: DefaultProps;

  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <ul style={{display: 'flex', overflow: 'auto', flexWrap: 'no-wrap', alignItems: 'center', padding: 'none', margin: '5px 10px', overflow: 'visible'}}>
        {this.props.plansWithTasks.map(planWithTasks => (
          <li style={{display: 'flex', listStyle: 'none', margin: '5px'}} key={planWithTasks.plan.name + planWithTasks.plan.tool.id}>
            <PlanWithTasks plan={planWithTasks.plan} tasks={planWithTasks.tasks} onTaskClick={task => this.props.onTaskClick(task)} onPlanClick={plan => this.props.onPlanClick(plan)}/>
          </li>
        ))}
      </ul>
    )
  }
}

PlansWithTasks.propTypes = {

};

PlansWithTasks.defaultProps = {

};

type DefaultProps = {

};

type Props = {
  plansWithTasks: Array<{plan: PlanConfig, tasks: Array<Task>}>,
  onPlanClick(plan: PlanConfig): void,
  onTaskClick(task: Task): void,
};

type State = {

};
