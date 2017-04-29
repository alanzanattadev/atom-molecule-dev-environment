"use babel";
// @flow

import React from "react";
import type { DiagnosticType } from "../Types/types.js.flow";
import { getColorForDiagnosticType } from "../Styles/Colors";
import Image from "react-image-fallback";
import Radium from "radium";

const pulseKeyframes = Radium.keyframes(
  {
    "0%": { transform: "scale(1)" },
    "50%": { transform: "scale(1.5)" },
    "100%": { transform: "scale(1)" },
  },
  "pulse",
);

const scaleInKeyframes = Radium.keyframes(
  {
    "0%": { transform: "scale(0)" },
    "100%": { transform: "scale(1)" },
  },
  "scaleIn",
);

export class DiagnosticsSummaryCircle
  extends React.Component<DefaultProps, Props, State> {
  state: State;
  props: Props;
  static defaultProps: DefaultProps;

  constructor(props: Props) {
    super(props);

    this.state = { hovered: false, pulsing: false, animated: false };
  }

  componentDidMount() {
    this.setState({ animated: true });
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

  componentWillReceiveProps(nextProps) {
    if (nextProps.number != this.props.number && this.state.pulsing === false) {
      this.setState({ pulsing: true }, () => {
        setTimeout(() => {
          this.setState({ pulsing: false });
        }, 301);
      });
    }
  }

  render() {
    return (
      <div
        style={{
          transform: this.state.animated === false ? "scale(0)" : undefined,
          animation: this.state.animated
            ? "x 0.25s cubic-bezier(0.250, 0.460, 0.450, 0.940) forwards"
            : undefined,
          animationName: this.state.animated ? scaleInKeyframes : undefined,
        }}
        onClick={this.props.onClick}
      >
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
            cursor: this.props.onClick && "pointer",
            animation: this.state.pulsing
              ? "x 0.3s ease-in-out both"
              : undefined,
            animationName: this.state.pulsing ? pulseKeyframes : undefined,
          }}
          // onMouseEnter={() => this.setState({ hovered: true })}
          // onMouseLeave={() => this.setState({ hovered: false })}
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
                  width: `${parseInt(this.props.size) / 2}px`,
                }}
              />
            : <span
                className="text-color-highlight"
                style={{ fontSize: `${parseInt(this.props.size) / 2}px` }}
              >
                {this.props.number}
              </span>}
        </div>
      </div>
    );
  }
}

DiagnosticsSummaryCircle.defaultProps = {
  size: "10px",
};

type DefaultProps = {
  size: string,
};

type Props = {
  number: number,
  type: DiagnosticType,
  size: string,
  onClick(): void,
};

type State = {
  hovered: boolean,
  pulsing: boolean,
};

export default Radium(DiagnosticsSummaryCircle);
