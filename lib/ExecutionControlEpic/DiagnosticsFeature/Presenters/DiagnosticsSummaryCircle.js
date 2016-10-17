'use babel'
// @flow

import React from 'react';
import type {DiagnosticType} from "../Types/types.js.flow";
import {getColorForDiagnosticType} from "../Styles/Colors";

export default class DiagnosticsSummaryCircle extends React.Component<DefaultProps, Props, State> {

  state: State;
  props: Props;
  static defaultProps: DefaultProps;

  constructor(props: Props) {
    super(props);

    this.state = {hovered: false}
  }

  getIconForType(type: DiagnosticType): ?string {
    switch(type) {
      case "warning": return "diagnostic-icon-warning.svg";
      case "error": return "diagnostic-icon-error.svg";
      case "info": return "diagnostic-icon-info.svg";
      case "success": return "diagnostic-icon-info.svg";
      default: return null;
    }
  }

  render() {
    return (
      <div style={{
        height: `${this.props.size}px`,
        width: `${this.props.size}px`,
        borderRadius: '50%',
        backgroundColor: getColorForDiagnosticType(this.props.type),
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '5px',
        fontFamily: 'Inconsolata',
        transition: 'all 0.2s',
        cursor: this.props.onClick && 'pointer',
      }} onClick={this.props.onClick} onMouseEnter={() => this.setState({hovered: true})} onMouseLeave={() => this.setState({hovered: false})}>
        {
          this.state.hovered ?
            (
              <img src={this.getIconForType(this.props.type)} style={{color: 'white', height: `${parseInt(this.props.size) / 2}px`, width: `${parseInt(this.props.size) / 2}px`}}/>
            ) :
            (
              <span style={{color: 'white', fontSize: `${parseInt(this.props.size) / 2}px`}}>{this.props.number}</span>
            )
        }
      </div>
    )
  }
}

DiagnosticsSummaryCircle.propTypes = {

};

DiagnosticsSummaryCircle.defaultProps = {
  size: "10px"
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
  hovered: boolean
};
