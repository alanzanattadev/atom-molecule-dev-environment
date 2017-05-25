"use babel";
// @flow
import React from "react";
import ReactDOM from "react-dom";
import Terminal from "xterm";

Terminal.loadAddon("fit");

export default class Term extends React.Component<DefaultProps, Props, State> {
  state: State;
  props: Props;
  container: React$Element;
  static defaultProps: DefaultProps;
  containerKey: number;

  constructor(props: Props) {
    super(props);

    this.containerKey = 0;
  }

  initTerm() {
    this.props.xtermInstance.open(ReactDOM.findDOMNode(this.container));
    this.props.xtermInstance.scrollToBottom();
  }

  componentDidMount() {
    if (this.props.xtermInstance != null) this.initTerm();
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.xtermInstance !== this.props.xtermInstance) {
      this.containerKey += 1;
    }
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.xtermInstance !== this.props.xtermInstance) {
      this.initTerm();
    }
  }

  render() {
    return (
      <div
        key={this.containerKey}
        ref={elem => (this.container = elem)}
        style={{
          flex: "1",
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
