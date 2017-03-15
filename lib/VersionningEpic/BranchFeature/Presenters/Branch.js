"use babel";
// @flow
import React from "react";
import Radium from "radium";

export class Branch extends React.Component<DefaultProps, Props, State> {
  state: State;
  props: Props;
  static defaultProps: DefaultProps;

  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <div
        className={ this.props.current ? "color-background-green" : "color-background-lgrey"}
        style={{
          padding: "5px 10px",
          margin: "5px 10px",
          borderColor: "#000",
          borderRadius: "15px",
          display: "inline-flex",
          justifyContent: "center",
          alignItems: "center",
          whiteSpace: "nowrap"
        }}
        onClick={this.props.onClick}
      >
        <span className="color-text-dark">
          {this.props.name}
        </span>
      </div>
    );
  }
}

Branch.propTypes = {};

Branch.defaultProps = {};

type DefaultProps = {};

type Props = {
  name: string,
  current: boolean
};

type State = {};

export default Radium(Branch);
