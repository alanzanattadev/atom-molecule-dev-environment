'use babel'
// @flow

import React from 'react';
import {getColorForDiagnosticType, getDarkColorForDiagnosticType} from "../Styles/Colors";
import Arrow from "./Arrow";
import type {DiagnosticType} from "../Types/types.js.flow";

export default class DiagnosticSelector extends React.Component<DefaultProps, Props, State> {

  state: State;
  props: Props;
  static defaultProps: DefaultProps;

  constructor(props: Props) {
    super(props);
  }

  render() {
    let arrowContainerStyle = {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '20px'
    };
    return (
      <div style={{display: 'inline-flex', flexWrap: 'nowrap', margin: '5px 5px', height: '25px', borderRadius: '4px', backgroundColor: getColorForDiagnosticType(this.props.type)}}>
        {
          this.props.of > 1 ? (
            <div onClick={this.props.onBack} style={arrowContainerStyle}>
              <Arrow/>
            </div>
          ) :
          false

        }
        <div
          onClick={this.props.onClick}
          style={{
            minWidth: '30px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '5px 10px',
            backgroundColor: this.props.of > 1 && getDarkColorForDiagnosticType(this.props.type),
            borderRadius: this.props.of < 1 && '4px'
          }}
        >
          <span style={{color: '#fff', whiteSpace: 'nowrap'}}>
            {
              this.props.of > 1 ?
              `${this.props.index + 1} of ${this.props.of}` :
              1
            }
          </span>
        </div>
        {
          this.props.of > 1 ? (
            <div onClick={this.props.onForward} style={arrowContainerStyle}>
              <Arrow/>
            </div>
          ) :
          false
        }
      </div>
    )
  }
}

DiagnosticSelector.propTypes = {

};

DiagnosticSelector.defaultProps = {
  index: 0
};

type DefaultProps = {
  index: number
};

type Props = {
  of: number,
  index: number,
  type: DiagnosticType,
  onClick(): void,
  onBack(): void,
  onForward(): void,
};

type State = {

};
