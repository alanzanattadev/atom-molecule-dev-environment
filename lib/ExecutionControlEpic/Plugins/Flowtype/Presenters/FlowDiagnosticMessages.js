"use babel";
// @flow

import * as React from "react";
import Radium from "radium";
import FlowDiagnosticMessage from "./FlowDiagnosticMessage";
import type { FlowLogMessage } from "../Types/types.flow";
import { List } from "immutable";

export class FlowDiagnosticMessages extends React.Component<Props, State> {
  state: State;
  props: Props;
  static defaultProps: DefaultProps;

  constructor(props: Props) {
    super(props);
  }

  reduceArray(messages: Array<FlowLogMessage>) {
    return messages.reduce((acc, cur) => {
      return cur.type == "Blame"
        ? acc.push(cur)
        : acc.setIn(
            [acc.size - 1],
            Object.assign({}, acc.last(), { comment: cur.descr }),
          );
    }, List());
  }

  render() {
    return (
      <div>
        {this.reduceArray(this.props.messages).map((msg, dx) => {
          return <FlowDiagnosticMessage key={dx} message={msg} />;
        })}
      </div>
    );
  }
}

FlowDiagnosticMessages.defaultProps = {
  messages: [{}],
};

type DefaultProps = {
  messages: [{}],
};

type Props = {
  messages: Array<FlowLogMessage>,
};

type State = {};

export default Radium(FlowDiagnosticMessages);
