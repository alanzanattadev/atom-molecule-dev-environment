"use babel";
// @flow
import * as React from "react";
import ReactDOM from "react-dom";
import Terminal from "xterm";

Terminal.loadAddon("fit");

export default class Term extends React.Component<Props, State> {
  state: State;
  props: Props;
  container: React.Element<any>;
  static defaultProps: DefaultProps;
  containerKey: number;

  constructor(props: Props) {
    super(props);

    this.containerKey = 0;
  }

  initTerm() {
    if (this.props.xtermInstance != null) {
      this.props.xtermInstance.open(ReactDOM.findDOMNode(this.container));
      this.props.xtermInstance.fit();
      this.props.xtermInstance.scrollToBottom();
      if (this.resizeInterval) clearInterval(this.resizeInterval);
      this.resizeInterval = setInterval(
        () => this.props.xtermInstance.fit(),
        1000,
      );
    }
  }

  componentDidMount() {
    if (this.props.xtermInstance != null) {
      this.initTerm();
    }
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.xtermInstance !== this.props.xtermInstance) {
      if (nextProps.xtermInstance == null) clearInterval(this.resizeInterval);
      this.containerKey += 1;
    }
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.xtermInstance !== this.props.xtermInstance) {
      this.initTerm();
    }
  }

  componentWillUnmount() {
    if (this.props.xtermInstance != null) clearInterval(this.resizeInterval);
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
          ref={elem => (this.container = elem)}
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
