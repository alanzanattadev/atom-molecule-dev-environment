"use babel";
// @flow
import React from "react";
import ReactDOM from "react-dom";
import Terminal from "xterm";

export default class Term extends React.Component<DefaultProps, Props, State> {
  state: State;
  props: Props;
  // container: React$Component<*, *, *>;
  static defaultProps: DefaultProps;

  constructor(props: Props) {
    super(props);
  }

  componentDidMount() {
    this.props.xtermInstance.open(ReactDOM.findDOMNode(this.container));
    this.props.xtermInstance.scrollToBottom();
  }

  render() {
    return (
      <div
        ref={elem => (this.container = elem)}
        style={{
          minWidth: "600px",
        }}
      />
    );
  }
}

Term.defaultProps = {};

type DefaultProps = {};

type Props = {
  xtermInstance: Terminal,
};

type State = {};
