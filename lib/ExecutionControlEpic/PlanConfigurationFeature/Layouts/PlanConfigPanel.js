"use babel";
// @flow

import React from "react";
import styled from "styled-components";
import PlanConfigurer from "../Containers/PlanConfigurer";

const PlanExplanationBox = styled.p`
  margin: 8px 16px;
`;

function PlanExplanation() {
  return (
    <PlanExplanationBox className="text-color">
      A plan is a reusable action (command, script, request) of a tool.
      <br />
      You can create as many plan as you need for your daily tasks.
    </PlanExplanationBox>
  );
}

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
          <PlanExplanation />
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
  onClose(): void,
};

type State = {};
