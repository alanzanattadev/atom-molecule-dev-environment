"use babel";
// @flow

import * as React from "react";
import PlanConfigurer from "../Containers/PlanConfigurer";

export default class PlanConfigPanel extends React.Component<Props, State> {
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
          flexWrap: "wrap",
        }}
      >
        <h1
          className="text-color-highlight"
          style={{
            fontSize: "25px",
            marginLeft: "16px",
          }}
        >
          {this.props.toolId}
        </h1>
        <div
          className="border"
          style={{
            flex: "1",
            display: "flex",
            flexDirection: "column",
            alignItems: "stretch",
            overflow: "auto",
            borderLeft: "0px",
            borderRight: "0px",
            borderBottom: "0px",
          }}
        >
          <PlanConfigurer
            style={{
              display: "flex",
              flex: "1 0",
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
};

type State = {};
