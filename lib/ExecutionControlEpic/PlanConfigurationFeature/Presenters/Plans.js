"use babel";
// @flow

import * as React from "react";
import Plan from "./Plan";
import type { PlanConfig } from "../Types/types";
import Message from "./Message";
import type { TaskState } from "../../TaskExecutionFeature/Types/types";
import { List } from "immutable";

export default class Plans extends React.Component<Props, State> {
  state: State;
  props: Props;
  static defaultProps: DefaultProps;

  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <ul style={{ paddingLeft: "0", margin: "5px", display: "flex" }}>
        {this.props.plans.size > 0 ? (
          this.props.plans.map(plan => (
            <li
              key={plan.tool.id + " " + plan.name}
              style={{ listStyle: "none", margin: "0px 3px" }}
            >
              <Plan
                iconUri={plan.tool.iconUri}
                name={plan.name}
                pinnable={this.props.pinnable}
                state={plan.state}
                onClick={() => this.props.onPlanClick(plan)}
                onPin={() => this.props.onPlanPin(plan)}
                onUnpin={() =>
                  this.props.onPlanUnpin(
                    plan,
                    this.props.numberOfPinnedPlans == 1,
                  )
                }
                onRemove={() =>
                  this.props.onPlanRemove(
                    plan,
                    this.props.numberOfPinnedPlans == 1,
                  )
                }
              />
            </li>
          ))
        ) : (
          <Message>No plan has been created yet</Message>
        )}
      </ul>
    );
  }
}

Plans.defaultProps = {
  pinnable: false,
};

type DefaultProps = {
  pinnable: false,
};

type Props = {
  plans: List<PlanConfig & { state: TaskState }>,
  pinnable: boolean,
  numberOfPinnedPlans: number,
  onPlanClick(plan: PlanConfig): void,
  onPlanUnpin(plan: PlanConfig, hidePanel: boolean): void,
  onPlanPin(targer: PlanConfig): void,
  onPlanRemove(plan: PlanConfig, hidePanel: boolean): void,
};

type State = {};
