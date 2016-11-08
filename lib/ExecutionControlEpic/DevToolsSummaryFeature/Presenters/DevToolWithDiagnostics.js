'use babel'
// @flow

import React from 'react';
import DevTool from "./DevTool";
import DevToolName from "./DevToolName";
import type {DiagnosticType} from "../../DiagnosticsFeature/Types/types.js";
import DiagnosticsSummaryCircle from "../../DiagnosticsFeature/Presenters/DiagnosticsSummaryCircle";
import type {TaskState} from "../../TaskExecutionFeature/Types/types.js";
import {TransitionMotion, spring} from 'react-motion';
import Radium from 'radium';

export class DevToolWithDiagnostics extends React.Component<DefaultProps, Props, State> {

  state: State;
  props: Props;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  static defaultProps: DefaultProps;

  constructor(props: Props) {
    super(props);

    this.state = {
      hovered: false
    };

    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
  }

  onMouseEnter() {
    this.setState({hovered: true});
  }

  onMouseLeave() {
    this.setState({hovered: false});
  }

  countCircles(props: Props) {
    let count = 0;
    if (props.infos > 0)
      count = count + 1;
    if (props.warnings > 0)
      count = count + 1;
    if (props.errors > 0)
      count = count + 1;
    if (props.successes > 0)
      count = count + 1;
    return count;
  }

  getCircleStyleBase() {
    return {
      position: 'absolute',
      transition: 'all 0.2s'
    };
  }

  getSingleCircleStyles() {
    return [{
      top: `${this.props.circleSize + 10}px`,
      left: `${(this.props.size + this.props.circleSize + 10) / 2 - this.props.circleSize / 2}px`,
      transform: this.state.hovered ? 'translate3d(-5px, -22px, 0)' : '',
    }];
  }

  getDoubleCircleStyles() {
    return [{
      top: `${this.props.circleSize + 10}px`,
      left: `${(this.props.size + this.props.circleSize + 5) / 2 - this.props.circleSize - 2}px`,
      transform: this.state.hovered ? 'translate3d(-10px, -22px, 0)' : '',
    }, {
      top: `${this.props.circleSize + 10}px`,
      right: `${(this.props.size + this.props.circleSize + 5) / 2 - this.props.circleSize - 2}px`,
      transform: this.state.hovered ? 'translate3d(10px, -22px, 0)' : '',
    }];
  }

  getTripleCirclesStyles() {
    return [{
      top: `${this.props.circleSize + 20}px`,
      left: `${(this.props.size + this.props.circleSize + 5) / 2 - this.props.circleSize * 1.5 - 5}px`,
      transform: this.state.hovered ? 'translate3d(-15px, -16px, 0)' : '',
    }, {
      top: `${this.props.circleSize + 10}px`,
      left: `${(this.props.size + this.props.circleSize + 10) / 2 - this.props.circleSize / 2}px`,
      transform: this.state.hovered ? 'translate3d(-5px, -22px, 0)' : '',
    }, {
      top: `${this.props.circleSize + 20}px`,
      right: `${(this.props.size + this.props.circleSize + 5) / 2 - this.props.circleSize * 1.5 - 5}px`,
      transform: this.state.hovered ? 'translate3d(15px, -16px, 0)' : '',
    }];
  }

  getFourCirclesStyles() {
    return [{
      top: `${this.props.circleSize + 30}px`,
      left: `${this.props.size / 2 - this.props.circleSize - 4}px`,
      transform: this.state.hovered ? 'translate3d(-16px, -10px, 0)' : '',
    }, {
      top: `${this.props.circleSize + 10}px`,
      left: `${(this.props.size + this.props.circleSize + 5) / 2 - 20}px`,
      transform: this.state.hovered ? 'translate3d(-10px, -22px, 0)' : '',
    }, {
      top: `${this.props.circleSize + 10}px`,
      right: `${(this.props.size + this.props.circleSize + 5) / 2 - 20}px`,
      transform: this.state.hovered ? 'translate3d(10px, -22px, 0)' : '',
    }, {
      top: `${this.props.circleSize + 30}px`,
      right: `${this.props.size / 2 - this.props.circleSize - 4}px`,
      transform: this.state.hovered ? 'translate3d(16px, -10px, 0)' : '',
    }];
  }

  getStylesForCircles() {
    let count = this.countCircles(this.props);
    switch (count) {
      case 0: return {};
      case 1: return this.getSingleCircleStyles();
      case 2: return this.getDoubleCircleStyles();
      case 3: return this.getTripleCirclesStyles();
      case 4: return this.getFourCirclesStyles();
      default: return this.getFourCirclesStyles();
    }
  }

  render() {
    return (
      <div
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
        style={{
          position: 'relative',
          width: `${this.props.size + this.props.circleSize + 10}px`,
          height: `${this.props.circleSize * 4 + 5 + 20}px`,
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          display: 'flex',
          flexShrink: '0',
          overflow: 'hidden'
        }}
      >
        {
          [
            {type: "warning", number: this.props.warnings},
            {type: "error", number: this.props.errors},
            {type: "success", number: this.props.successes},
            {type: "info", number: this.props.infos},
          ].filter(diagnostic => diagnostic.number > 0).map((diagnostic, i) => (
            <div style={Object.assign({}, this.getStylesForCircles()[i], this.getCircleStyleBase())} key={diagnostic.type}>
              <DiagnosticsSummaryCircle
                size={this.state.hovered ? '30' : this.props.circleSize.toString()}
                type={diagnostic.type}
                number={diagnostic.number}
                onClick={() => this.props.onDiagnosticClick(diagnostic.type)}
              />
            </div>
          ))
        }
        <div style={{
          transform: this.state.hovered ? `translate3d(0, -${22}px, 0)` : ``,
          justifyContent: 'center',
          alignItems: 'center',
          transition: 'transform 0.2s',
          position: 'absolute',
          width: '100%',
          bottom: '5px',
          display: 'flex',
          textAlign: 'center'
        }}>
          <DevTool iconUri={this.props.iconUri} onClick={this.props.onLogsClick} state={this.props.state}/>
        </div>
        <TransitionMotion
          willLeave={() => ({opacity: spring(0, {stifness: 390, damping: 15, precision: 0.2}), bottom: spring(-10, {stifness: 390, damping: 10, precision: 0.2})})}
          willEnter={() => ({opacity: 0, bottom: -10})}
          styles={(this.state.hovered ? [{key: 'item'}] : []).map(item => ({
            key: item.key,
            style: {opacity: 1, bottom: 0},
          }))}
        >
          {interpolatedStyles =>
            <div>
              {interpolatedStyles.map(config => (
                <div key={this.props.name} style={{
                  opacity: config.style.opacity,
                  bottom: config.style.bottom + 'px',
                  position: 'absolute',
                  display: 'flex',
                  justifyContent: 'center',
                  width: '100%',
                  alignItems: 'center',
                  textAlign: 'center',
                  left: '0'
                }}>
                  <DevToolName onClick={this.props.onSettingsClick}>{this.props.name}</DevToolName>
                </div>
              ))}
            </div>
          }
        </TransitionMotion>
      </div>
    )
  }
}

DevToolWithDiagnostics.propTypes = {

};

DevToolWithDiagnostics.defaultProps = {
  infos: 0,
  warnings: 0,
  errors: 0,
  successes: 0,
  size: 80,
  circleSize: 20,
  onDiagnosticClick(type: DiagnosticType) {},
  onSettingsClick() {},
  onLogsClick() {}
};

type DefaultProps = {
  infos: 0,
  warnings: 0,
  errors: 0,
  successes: 0,
  size: 80,
  circleSize: 20,
  onDiagnosticClick(type: DiagnosticType): void,
  onSettingsClick(): void,
  onLogsClick(): void
};

type Props = {
  name: string,
  iconUri: string,
  infos: number,
  warnings: number,
  errors: number,
  successes: number,
  size: number,
  circleSize: number,
  state: TaskState,
  onDiagnosticClick(type: DiagnosticType): void,
  onSettingsClick(): void,
  onLogsClick(): void
};

type State = {
  hovered: boolean
};

export default Radium(DevToolWithDiagnostics);
