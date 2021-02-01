"use babel";
// @flow

import * as React from "react";
import { Terminal } from "xterm";
import * as fit from "xterm/lib/addons/fit/fit";

Terminal.applyAddon(fit);

export default class Term extends React.Component<Props, State> {
  state: State;
  props: Props;
  container: { current: null | HTMLDivElement };
  static defaultProps: DefaultProps;
  containerKey: number;
  resizeInterval: ?IntervalID;

  constructor(props: Props) {
    super(props);

    this.containerKey = 0;
    this.container = React.createRef();
  }

  initTerm() {
    if (this.props.xtermInstance != null) {
      // $FlowFixMe
      this.props.xtermInstance.open(this.container.current, true);
      // `fit` is added by applyAddon
      // $FlowFixMe
      this.props.xtermInstance.fit();
      this.props.xtermInstance.scrollToBottom();
      if (this.resizeInterval) clearInterval(this.resizeInterval);
      this.resizeInterval = setInterval(
        // $FlowFixMe
        () => this.props.xtermInstance.fit(),
        1000,
      );
    }
  }

  clear() {
    if (this.resizeInterval) {
      clearInterval(this.resizeInterval);
      this.resizeInterval = null;
    }
  }

  componentDidMount() {
    if (this.props.xtermInstance != null) {
      this.initTerm();
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps: Props) {
    if (nextProps.xtermInstance !== this.props.xtermInstance) {
      if (nextProps.xtermInstance == null) this.clear();
      this.containerKey += 1;
    }
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.xtermInstance !== this.props.xtermInstance) {
      this.initTerm();
    }
  }

  componentWillUnmount() {
    this.clear();
  }

  render() {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "stretch",
          flex: "1 1 0",
        }}
      >
        <div
          key={this.containerKey}
          ref={this.container}
          style={{
            flex: "1",
            minWidth: "600px",
          }}
        />
      </div>
    );
  }
}

Term.defaultProps = {};

type DefaultProps = {};

type Props = {
  xtermInstance: Terminal,
};

type State = {};
