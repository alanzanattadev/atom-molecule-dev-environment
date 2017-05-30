"use babel";
// @flow

import React from "react";
import PlanConfigurer from "../Containers/PlanConfigurer";

export default class PlanConfigPanel
  extends React.Component<DefaultProps, Props, State> {
  state: State;
  props: Props;
  static defaultProps: DefaultProps;

  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <div
        key={this.props.toolId}
        style={{
          overflow: "auto",
          display: "flex",
          justifyContent: "center",
          alignItems: "stretch",
          flex: "1",
          flexDirection: "column",
        }}
      >
        <h1
          className="text-color-highlight"
          style={{
            fontSize: "25px",
            marginLeft: "5px",
          }}
        >
          {this.props.toolId}
        </h1>
        <div
          style={{
            flex: "1",
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            overflow: "auto",
          }}
        >
          <PlanConfigurer
            style={{
              overflow: "auto",
              display: "flex",
            }}
            {...this.props}
          />
        </div>
      </div>
    );
  }
}

PlanConfigPanel.defaultProps = {};

type DefaultProps = {};

type Props = {
  toolId: string,
  onClose(): void,
};

type State = {};
