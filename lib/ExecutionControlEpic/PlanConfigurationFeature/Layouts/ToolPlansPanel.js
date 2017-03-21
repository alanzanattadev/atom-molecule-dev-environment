"use babel";
// @flow

import React from "react";
import DevToolPlans from "../Containers/DevToolPlans";
import CloseButton from "../../DiagnosticsFeature/Presenters/CloseButton";

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
          minHeight: "75px",
          maxHeight: "230px",
          overflow: "auto",
          display: "flex",
          justifyContent: "center",
          alignItems: "stretch",
          flex: "1",
        }}
      >
        <div
          style={{
            display: "flex",
            flex: "1",
            alignItems: "stretch",
            flexDirection: "column",
            overflow: "auto",
            justifyContent: "center",
          }}
        >
          <DevToolPlans {...this.props} pinnable />
        </div>
        <div style={{ position: "absolute", top: "10px", right: "10px" }}>
          <CloseButton onClick={this.props.onClose} />
        </div>
      </div>
    );
  }
}

PlanConfigPanel.propTypes = {};

PlanConfigPanel.defaultProps = {};

type DefaultProps = {};

type Props = {
  toolId: string,
  onClose(): void,
};

type State = {};
