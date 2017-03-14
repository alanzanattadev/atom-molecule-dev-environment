"use babel";
// @flow

import React from "react";
import Radium from "radium";

export class DockIcon extends React.Component<DefaultProps, Props, State> {
  state: State;
  props: Props;
  static defaultProps: DefaultProps;

  constructor(props: Props) {
    super(props);

    this.state = {
      hovered: false
    };
  }

  render() {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: this.props.height,
          width: this.props.width,
          position: "relative",
          backgroundColor: this.props.color,
          cursor: "pointer"
        }}
        onClick={() => this.props.onClick()}
        onMouseEnter={() => this.setState({ hovered: true })}
        onMouseLeave={() => this.setState({ hovered: false })}
      >
        <div
          style={{
            backgroundColor: this.props.color,
            height: this.props.height,
            width: this.props.width,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: "2"
          }}
        >
          <img
            src={this.props.iconUri}
            style={{
              height: "25px",
              width: "25px",
              WebkitFilter: "brightness(0) invert(1)"
            }}
          />
        </div>
        <div
          style={{
            position: "absolute",
            top: "0",
            right: "0",
            height: "50px",
            display: "flex",
            alignItems: "center",
            backgroundColor: this.props.color,
            padding: "0px 10px",
            width: this.state.hovered ? undefined : "50px",
            transition: "all 0.25s",
            transform: (
              this.state.hovered ? "translate3d(-49px, 0, 0)" : undefined
            )
          }}
        >
          <span
            style={{
              fontSize: "25px",
              color: "white",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
              overflow: "hidden",
              width: this.state.hovered ? "" : "50px"
            }}
          >
            {this.props.name}
          </span>
        </div>
      </div>
    );
  }
}

DockIcon.propTypes = {};

DockIcon.defaultProps = {
  height: "50px",
  width: "50px",
  color: "#289B6B"
};

type DefaultProps = {};

type Props = {
  iconUri: string,
  name: string,
  onClick(): void,
  height: string,
  width: string,
  color: string
};

type State = {
  hovered: boolean
};

export default Radium(DockIcon);
