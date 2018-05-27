"use babel";
// @flow

import * as React from "react";
import DevTool from "./DevTool";
import DevToolName from "./DevToolName";
import type { DiagnosticSeverity } from "../../DiagnosticsFeature/Types/types";
import DiagnosticsSummaryCircle from "../../DiagnosticsFeature/Presenters/DiagnosticsSummaryCircle";
import type { TaskState } from "../../TaskExecutionFeature/Types/types";
import { spring, TransitionMotion } from "react-motion";
import styled, { css } from "styled-components";
import ParticleSystem from "./ParticleSystem";
import { compose, withPropsOnChange } from "recompose";
import Rx from "rxjs";

function countCircles(props: Props) {
  let count = 0;
  if (props.info > 0) count = count + 1;
  if (props.warnings > 0) count = count + 1;
  if (props.errors > 0) count = count + 1;
  if (props.successes > 0) count = count + 1;
  return count;
}

function getEntityWidth() {
  return 55;
}

function getSingleCircleStyles(props: Props) {
  return [
    css`
      top: -${props.circleSize}px;
      left: ${getEntityWidth() / 2 - props.circleSize / 2}px;
      transform: ${props.hovered ? "translate3d(0, -14px, 0)" : ""};
    `,
  ];
}

function getDoubleCircleStyles(props: Props) {
  return [
    css`
      top: -${props.circleSize}px;
      left: ${getEntityWidth() / 2 - props.circleSize - 2}px;
      transform: ${props.hovered
        ? "translate3d(-5px, -14px, 0px)"
        : "translate3d(0px, 0px, 0px)"};
    `,
    css`
      top: -${props.circleSize}px;
      right: ${getEntityWidth() / 2 - props.circleSize - 2}px;
      transform: ${props.hovered
        ? "translate3d(5px, -14px, 0)"
        : "translate3d(0px, 0px, 0px)"};
    `,
  ];
}

function getTripleCirclesStyles(props: Props) {
  return [
    css`
      top: -${props.circleSize}px;
      left: ${getEntityWidth() / 2 - props.circleSize * 1.5 - 5}px;
      transform: ${props =>
        props.hovered
          ? "translate3d(5px, -14px, 0)"
          : "translate3d(0px, 0px, 0px)"};
    `,
    css`
      top: -${props.circleSize + 10}px;
      left: ${getEntityWidth() / 2 - props.circleSize / 2}px;
      transform: ${props.hovered
        ? "translate3d(0px, -18px, 0)"
        : "translate3d(0px, 0px, 0px)"};
    `,
    css`
      top: -${props.circleSize}px;
      right: ${getEntityWidth() / 2 - props.circleSize * 1.5 - 5}px;
      transform: ${props.hovered
        ? "translate3d(5px, -14px, 0)"
        : "translate3d(0px, 0px, 0px)"};
    `,
  ];
}

function getFourCirclesStyles(props: Props) {
  return [
    css`
      top: -${props.circleSize - 10}px;
      left: ${getEntityWidth() / 2 - props.circleSize * 1.8}px;
      transform: ${props.hovered
        ? "translate3d(-16px, -14px, 0)"
        : "translate3d(0px, 0px, 0px)"};
    `,
    css`
      top: -${props.circleSize + 10}px;
      left: ${getEntityWidth() / 2 - props.circleSize - 2}px;
      transform: ${props.hovered
        ? "translate3d(-10px, -18px, 0)"
        : "translate3d(0px, 0px, 0px)"};
    `,
    css`
      top: -${props.circleSize + 10}px;
      right: ${getEntityWidth() / 2 - props.circleSize - 2}px;
      transform: ${props.hovered
        ? "translate3d(10px, -18px, 0)"
        : "translate3d(0px, 0px, 0px)"};
    `,
    css`
      top: -${props.circleSize - 10}px;
      right: ${getEntityWidth() / 2 - props.circleSize * 1.8}px;
      transform: ${props.hovered
        ? "translate3d(16px, -14px, 0)"
        : "translate3d(0px, 0px, 0px)"};
    `,
  ];
}

function getStylesForCircles(props) {
  let count = countCircles(props);
  switch (count) {
    case 0:
      return {};
    case 1:
      return getSingleCircleStyles(props);
    case 2:
      return getDoubleCircleStyles(props);
    case 3:
      return getTripleCirclesStyles(props);
    case 4:
      return getFourCirclesStyles(props);
    default:
      return getFourCirclesStyles(props);
  }
}

const DevtoolWithDiagnosticsBox = styled.div`
  position: relative;
  width: ${getEntityWidth}px;
  height: 55px;
  width: 55px;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  display: flex;
  margin: 0px 5px;
  flex-shrink: 0;
  z-index: ${props => (props.hovered ? "2" : "1")};
  cursor: pointer;
`;

const SummaryPositionner = styled.div`
  position: absolute;
  transition: all 0.2s;
  display: flex;
  flex: 0 0 auto;
  ${props => props.movementStyle};
`;

const DevtoolIconPositionner = styled.div`
  transform: ${props =>
    props.hovered ? `translate3d(0, -16px, 0)` : `translate3d(0, 0, 0)`};
  justify-content: center;
  align-items: center;
  transition: transform 0.2s;
  position: absolute;
  width: 100%;
  bottom: 5px;
  display: flex;
  text-align: center;
`;

const DevtoolNamePositionner = styled.div`
  opacity: ${props => props.opacity};
  bottom: 0;
  transform: translate3d(0, ${props => props.bottom}px, 0);
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  left: 0;
  right: 0;
`;

const DevtoolBox = styled.div`
  display: flex;
  justify-content: center;
`;

const ParticlesPositionner = styled.div`
  display: flex;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: hidden;
  justify-content: center;
  align-items: center;
  z-index: -1;
  flex: 0 1 0px;
`;

export class DevToolWithDiagnostics extends React.Component<Props, State> {
  state: State;
  props: Props;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  static defaultProps: DefaultProps;

  constructor(props: Props) {
    super(props);

    this.state = {
      hovered: false,
    };

    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
  }

  onMouseEnter() {
    this.setState({ hovered: true });
  }

  onMouseLeave() {
    this.setState({ hovered: false });
  }

  render() {
    return (
      <DevtoolWithDiagnosticsBox hovered={this.state.hovered} {...this.props}>
        {[
          { severity: 2, number: this.props.warnings },
          { severity: 1, number: this.props.errors },
          { severity: 5, number: this.props.successes },
          { severity: 3, number: this.props.info },
        ]
          .filter(diagnostic => diagnostic.number > 0)
          .map((diagnostic, i) => (
            <SummaryPositionner
              movementStyle={
                getStylesForCircles({
                  ...this.props,
                  hovered: this.state.hovered,
                })[i]
              }
              key={diagnostic.severity}
            >
              <DiagnosticsSummaryCircle
                size={this.props.circleSize.toString()}
                severity={diagnostic.severity}
                number={diagnostic.number}
                onClick={() =>
                  this.props.onDiagnosticClick(diagnostic.severity)
                }
              />
            </SummaryPositionner>
          ))}
        <DevtoolBox
          onMouseEnter={this.onMouseEnter}
          onMouseLeave={this.onMouseLeave}
        >
          <DevtoolIconPositionner hovered={this.state.hovered}>
            <DevTool
              iconUri={this.props.iconUri}
              dominantColor={this.props.dominantColor}
              onClick={this.props.onLogsClick}
              state={this.props.state}
              color={this.props.planColor}
              showColor={this.props.showColor}
              legend={this.props.legend}
              index={this.props.index}
              busy={this.props.busy}
            />
          </DevtoolIconPositionner>
          <ParticlesPositionner>
            <ParticleSystem destY={"40px"} notifier={this.props.notifier} />
          </ParticlesPositionner>
          <TransitionMotion
            willLeave={() => ({
              opacity: spring(0, {
                stifness: 390,
                damping: 15,
                precision: 0.2,
              }),
              bottom: spring(10, {
                stifness: 390,
                damping: 10,
                precision: 0.2,
              }),
            })}
            willEnter={() => ({ opacity: 0, bottom: -10 })}
            styles={(this.state.hovered ? [{ key: "item" }] : []).map(item => ({
              key: item.key,
              style: { opacity: 1, bottom: 0 },
            }))}
          >
            {interpolatedStyles => (
              <div style={{ overflow: "visible" }}>
                {interpolatedStyles.map(config => (
                  <DevtoolNamePositionner
                    key={this.props.name}
                    opacity={config.style.opacity}
                    bottom={config.style.bottom}
                  >
                    <DevToolName onClick={this.props.onSettingsClick}>
                      {this.props.name}
                    </DevToolName>
                  </DevtoolNamePositionner>
                ))}
              </div>
            )}
          </TransitionMotion>
        </DevtoolBox>
      </DevtoolWithDiagnosticsBox>
    );
  }
}

DevToolWithDiagnostics.defaultProps = {
  info: 0,
  warnings: 0,
  errors: 0,
  successes: 0,
  size: 80,
  circleSize: 25,
  devtoolSize: 20,
  showColor: false,
  // eslint-disable-next-line no-unused-vars
  onDiagnosticClick(severity: DiagnosticSeverity) {},
  onSettingsClick() {},
  onLogsClick() {},
};

type DefaultProps = {
  info: 0,
  warnings: 0,
  errors: 0,
  successes: 0,
  size: 80,
  devtoolSize: 25,
  circleSize: 20,
  showColor: false,
  onDiagnosticClick(severity: DiagnosticSeverity): void,
  onSettingsClick(): void,
  onLogsClick(): void,
};

type Props = {
  name: string,
  iconUri: string,
  info: number,
  warnings: number,
  errors: number,
  successes: number,
  size: number,
  devtoolSize: number,
  circleSize: number,
  state: TaskState,
  showColor: boolean,
  planColor?: string,
  legend?: string,
  index?: number,
  notifier: Rx.Observable<any>,
  onDiagnosticClick(severity: DiagnosticSeverity): void,
  onSettingsClick(): void,
  onLogsClick(): void,
};

type State = {
  hovered: boolean,
};

export default compose(
  withPropsOnChange(
    ["notifier"],
    ({ notifier }: { notifier: events$EventEmitter }) => ({
      notifier:
        notifier == null
          ? Rx.Observable.empty()
          : Rx.Observable.create(function subscribe(observer) {
              function handler(task, data) {
                observer.next(data);
              }
              notifier.addListener("terminal/output", handler);
              return function unsubscribe() {
                notifier.removeListener("terminal/output", handler);
              };
            }),
    }),
  ),
)(DevToolWithDiagnostics);
