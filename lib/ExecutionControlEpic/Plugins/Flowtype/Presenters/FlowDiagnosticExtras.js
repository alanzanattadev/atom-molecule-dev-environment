"use babel";
// @flow

import * as React from "react";
import Radium from "radium";
import FlowDiagnosticExtra from "./FlowDiagnosticExtra";
import type { FlowLogExtra } from "../Types/types.flow";

export class FlowDiagnosticExtras extends React.Component<Props, State> {
  state: State;
  props: Props;
  static defaultProps: DefaultProps;

  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <div>
        <ul
          style={{
            listStyle: "none",
          }}
        >
          {this.props.extras.map((extra, dx) => {
            return (
              <li
                key={dx}
                style={{
                  paddingLeft: "5px",
                }}
              >
                <FlowDiagnosticExtra message={extra.message}>
                  {extra.children ? extra.children : null}
                </FlowDiagnosticExtra>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

FlowDiagnosticExtras.defaultProps = {
  extras: [{}],
};

type DefaultProps = {
  extras: [{}],
};

type Props = {
  extras: Array<FlowLogExtra>,
};

type State = {};

export default Radium(FlowDiagnosticExtras);
