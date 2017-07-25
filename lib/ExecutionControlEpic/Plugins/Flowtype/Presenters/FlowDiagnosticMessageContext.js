"use babel";
// @flow

import React from "react";
import Radium from "radium";
import type { FlowLogSource } from "../Types/types.flow";

export class FlowDiagnosticMessageContext extends React.Component<
  DefaultProps,
  Props,
  State,
> {
  state: State;
  props: Props;
  static defaultProps: DefaultProps;

  constructor(props: Props) {
    super(props);
  }

  inRange(nb: number, min: number, max: number): boolean {
    return nb >= min && nb <= max ? true : false;
  }

  render() {
    return (
      <span>
        {Array.from(this.props.context).map((c, idx) => {
          return (
            <span key={idx}>
              {this.inRange(
                idx + 1,
                this.props.loc.start.column,
                this.props.loc.end.column,
              )
                ? <span style={{ color: "#FF0000", fontSize: "16px" }}>
                    {c}
                  </span>
                : <span style={{ fontSize: "16px" }}>
                    {c}
                  </span>}
            </span>
          );
        })}
      </span>
    );
  }
}

FlowDiagnosticMessageContext.defaultProps = {};

type DefaultProps = {};

type Props = {
  context: string,
  loc: FlowLogSource,
};

type State = {};

export default Radium(FlowDiagnosticMessageContext);
