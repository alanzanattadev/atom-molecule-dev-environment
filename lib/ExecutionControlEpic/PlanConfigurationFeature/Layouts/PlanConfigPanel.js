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
      A plan is a reusable action (command, script, request) of a tool. You can create as many plan as you need for your daily tasks.
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
        <PlanExplanation />
        <div
          style={{
            flex: "1",
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            overflow: "auto",
            borderTop: "2px solid #000",
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
