'use babel'
// @flow

import React from 'react';
import DevTool from "./DevTool";
import DevToolName from "./DevToolName";
import type {DiagnosticType} from "../../DiagnosticsFeature/Types/types.js";
import DiagnosticsSummaryCircle from "../../DiagnosticsFeature/Presenters/DiagnosticsSummaryCircle";

export default class DevToolWithDiagnostics extends React.Component<DefaultProps, Props, State> {

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
      top: `${10}px`,
      left: `${this.props.size / 2 - 5}px`,
      transform: this.state.hovered ? 'translate3d(-5px, -22px, 0)' : '',
    }];
  }

  getDoubleCircleStyles() {
    return [{
      top: `${10}px`,
      left: `${this.props.size / 2 - 12}px`,
      transform: this.state.hovered ? 'translate3d(-10px, -22px, 0)' : '',
    }, {
      top: `${10}px`,
      right: `${this.props.size / 2 - 12}px`,
      transform: this.state.hovered ? 'translate3d(10px, -22px, 0)' : '',
    }];
  }

  getTripleCirclesStyles() {
    return [{
      top: `${12}px`,
      left: `${this.props.size / 2 - 18}px`,
      transform: this.state.hovered ? 'translate3d(-15px, -16px, 0)' : '',
    }, {
      top: `${9}px`,
      left: `${this.props.size / 2 - 5}px`,
      transform: this.state.hovered ? 'translate3d(-5px, -22px, 0)' : '',
    }, {
      top: `${12}px`,
      right: `${this.props.size / 2 - 18}px`,
      transform: this.state.hovered ? 'translate3d(15px, -16px, 0)' : '',
    }];
  }

  getFourCirclesStyles() {
    return [{
      top: `${15}px`,
      left: `${this.props.size / 2 - 25}px`,
      transform: this.state.hovered ? 'translate3d(-16px, -10px, 0)' : '',
    }, {
      top: `${9}px`,
      left: `${this.props.size / 2 - 12}px`,
      transform: this.state.hovered ? 'translate3d(-10px, -22px, 0)' : '',
    }, {
      top: `${9}px`,
      right: `${this.props.size / 2 - 12}px`,
      transform: this.state.hovered ? 'translate3d(10px, -22px, 0)' : '',
    }, {
      top: `${15}px`,
      right: `${this.props.size / 2 - 25}px`,
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
        style={{position: 'relative', width: `${this.props.size}px`, height: `${this.props.size}px`, justifyContent: 'center', alignItems: 'center', flexDirection: 'column', display: 'flex', flexShrink: '0'}}
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
                size={this.state.hovered ? '20' : '5'}
                type={diagnostic.type}
                number={diagnostic.number}
                onClick={() => this.props.onDiagnosticClick(diagnostic.type)}
              />
            </div>
          ))
        }
        <div style={{
          display: 'flex',
          borderRadius: '50%',
          width: `${this.props.size / 3 + 5}px`,
          height: `${this.props.size / 3 + 5}px`,
          transform: this.state.hovered ? `translate3d(0, -${(this.props.size / 3 + 5) * 1.5 / 4}px, 0)` : ``,
          backgroundColor: 'white',
          justifyContent: 'center',
          alignItems: 'center',
          margin: '2px 0px 5px 0px',
          padding: '5px',
          transition: 'transform 0.2s'
        }}>
          <DevTool iconUri={this.props.iconUri} onClick={this.props.onLogsClick}/>
        </div>
        {
          this.state.hovered ? (
            <div style={{
              display: 'inline-flex',
              position: 'absolute',
              bottom: "0px",
              transition: 'all 0.2s',
            }}>
              <DevToolName onClick={this.props.onSettingsClick}>{this.props.name}</DevToolName>
            </div>
          ) : false
        }
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
  onDiagnosticClick(type: DiagnosticType): void,
  onSettingsClick(): void,
  onLogsClick(): void
};

type State = {
  hovered: boolean
};
