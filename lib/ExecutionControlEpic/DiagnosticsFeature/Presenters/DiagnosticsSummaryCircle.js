"use babel";
// @flow

import * as React from "react";
import type { DiagnosticSeverity } from "../Types/types.js.flow";
import { getColorForDiagnosticType } from "../Styles/Colors";
import Image from "react-image-fallback";
import styled, { keyframes } from "styled-components";

const pulseKeyframes = keyframes`
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.5);
  }

  100% {
    transform: scale(1);
  }
`;

const scaleInKeyframes = keyframes`
  from {
    transform: scale(0);
  }

  to {
    transform: scale(1);
  }
`;

const AnimationBox = styled.div`
  transform: scale(0);
  animation: ${scaleInKeyframes} 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94)
    forwards;
`;

const CircleBox = styled.div`
  height: ${props => props.size}px;
  width: ${props => props.size}px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  transition: all 0.2s;
  cursor: ${props => props.onClick && "pointer"};
  animation: ${props =>
    props.pulsing ? `${pulseKeyframes} 0.3s ease-in-out both` : undefined};
`;

export class DiagnosticsSummaryCircle extends React.Component<Props, State> {
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

  getIconForType(type: DiagnosticSeverity): string {
    switch (type) {
      case 2:
        return "diagnostic-icon-warning.svg";
      case 1:
        return "diagnostic-icon-error.svg";
      case 3:
        return "diagnostic-icon-info.svg";
      case 5:
        return "diagnostic-icon-info.svg";
      default:
        return "";
    }
  }

  componentWillReceiveProps(nextProps: Props) {
    if (
      nextProps.number !== this.props.number &&
      this.state.pulsing === false
    ) {
      this.setState({ pulsing: true }, () => {
        setTimeout(() => {
          this.setState({ pulsing: false });
        }, 301);
      });
    }
  }

  render() {
    return (
      <AnimationBox onClick={this.props.onClick}>
        <CircleBox
          className={getColorForDiagnosticType(this.props.type)}
          size={this.props.size}
          onClick={this.props.onClick}
          pulsing={this.state.pulsing}
          // onMouseEnter={() => this.setState({ hovered: true })}
          // onMouseLeave={() => this.setState({ hovered: false })}
        >
          {this.state.hovered ? (
            <Image
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
          ) : (
            <span
              className="text-color-highlight"
              style={{ fontSize: `${parseInt(this.props.size) / 2}px` }}
            >
              {this.props.number}
            </span>
          )}
        </CircleBox>
      </AnimationBox>
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
  type: DiagnosticSeverity,
  size: string,
  onClick(): void,
};

type State = {
  animated: boolean,
  hovered: boolean,
  pulsing: boolean,
};

export default DiagnosticsSummaryCircle;
