"use babel";
// @flow

import React from "react";
import type { DiagnosticType } from "../Types/types.js.flow";
import { getColorForDiagnosticType } from "../Styles/Colors";
import Image from "react-image-fallback";

export default class DiagnosticsSummaryCircle
  extends React.Component<DefaultProps, Props, State> {
  state: State;
  props: Props;
  static defaultProps: DefaultProps;

  constructor(props: Props) {
    super(props);

    this.state = { hovered: false };
  }

  getIconForType(type: DiagnosticType): ?string {
    switch (type) {
      case "warning":
        return "diagnostic-icon-warning.svg";
      case "error":
        return "diagnostic-icon-error.svg";
      case "info":
        return "diagnostic-icon-info.svg";
      case "success":
        return "diagnostic-icon-info.svg";
      default:
        return null;
    }
  }

  render() {
    return (
      <div
        className={getColorForDiagnosticType(this.props.type)}
        style={{
          height: `${this.props.size}px`,
          width: `${this.props.size}px`,
          borderRadius: "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "5px",
          transition: "all 0.2s",
          cursor: this.props.onClick && "pointer"
        }}
        onClick={this.props.onClick}
        onMouseEnter={() => this.setState({ hovered: true })}
        onMouseLeave={() => this.setState({ hovered: false })}
      >
        {this.state.hovered
          ? <Image
              src={
                "atom://molecule-dev-environment/.storybook/public/" +
                  this.getIconForType(this.props.type)
              }
              fallbackImage={this.getIconForType(this.props.type)}
              className="text-color-highlight"
              style={{
                height: `${parseInt(this.props.size) / 2}px`,
                width: `${parseInt(this.props.size) / 2}px`
              }}
            />
          : <span
              className="text-color-highlight"
              style={{ fontSize: `${parseInt(this.props.size) / 2}px` }}
            >
              {this.props.number}
            </span>}
      </div>
    );
  }
}

DiagnosticsSummaryCircle.propTypes = {};

DiagnosticsSummaryCircle.defaultProps = {
  size: "10px"
};

type DefaultProps = {
  size: string
};

type Props = {
  number: number,
  type: DiagnosticType,
  size: string,
  onClick(): void
};

type State = {
  hovered: boolean
};
