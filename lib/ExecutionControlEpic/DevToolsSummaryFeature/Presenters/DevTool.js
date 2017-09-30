"use babel";
// @flow

import React from "react";
import type { TaskState } from "../../TaskExecutionFeature/Types/types.js.flow";

export default class DevTool extends React.Component<
  DefaultProps,
  Props,
  State,
> {
  state: State;
  props: Props;
  static defaultProps: DefaultProps;

  constructor(props: Props) {
    super(props);

    this.state = { hovered: false };
  }

  getOpacityForState(state: TaskState): string {
    switch (state) {
      case "running":
        return "1";
      case "stopped":
        return "1";
      case "crashed":
        return "1";
      case "failed":
        return "1";
      case "succeed":
        return "1";
      case "created":
        return "1";
      default:
        return "1";
    }
  }

  render() {
    let style = {
      transition: "all 0.2s",
      height: this.props.size,
      width: this.props.size,
      opacity: this.getOpacityForState(this.props.state),
      WebkitFilter: "brightness(1)",
    };

    return (
      <div
        onClick={this.props.onClick}
        style={{
          cursor: "pointer",
          backgroundColor: this.props.circled ? "white" : "",
          opacity: this.props.state == "running" ? "1" : "0.5",
          padding: "5px",
          margin: "2px 0px 5px 0px",
          borderRadius: "50%",
          display: "inline-flex",
          position: "relative",
          overflow: "visible",
        }}
        onMouseEnter={() => this.setState({ hovered: true })}
        onMouseLeave={() => this.setState({ hovered: false })}
      >
        {
          /* this.state.hovered ?*/
          /* (<Image fallbackImage="diagnostic-icon-log.svg" src="atom://molecule-dev-environment/.storybook/public/diagnostic-icon-log.svg" style={style}/>) :*/
          <img src={this.props.iconUri} style={style} />
        }
        {this.props.showColor && (
          <span
            style={{
              color: this.props.color,
              fontSize: "18px",
              fontWeight: "500",
              position: "absolute",
              top: this.props.index % 2 == 0 ? "-100px" : "-80px",
              left: "-10px",
              zIndex: 15,
            }}
          >
            {this.props.legend}
          </span>
        )}
        {this.props.color && (
          <span
            style={{
              height: "10px",
              width: "10px",
              borderRadius: "50%",
              backgroundColor: this.props.color,
              position: "absolute",
              right: 0,
              bottom: 0,
              transform: this.props.showColor
                ? "scale3d(1.5, 1.5, 1.5)"
                : undefined,
              transition: "all 0.2s",
            }}
          />
        )}
      </div>
    );
  }
}

DevTool.defaultProps = {
  size: "20px",
  circled: true,
  showColor: false,
  index: 0,
};

type DefaultProps = {
  size: "20px",
  circled: true,
  index: number,
};

type Props = {
  iconUri: string,
  onClick(): void,
  state: TaskState,
  size: string,
  circled: boolean,
  color?: string,
  showColor: boolean,
  legend?: string,
  index: number,
};

type State = {
  hovered: boolean,
};
