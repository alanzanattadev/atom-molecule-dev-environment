'use babel'
// @flow

import React from 'react';
import OrganizedButton from "./OrganizedButton";
import LogsButton from "./LogsButton";

export default class DiagnosticsModeSelector extends React.Component<DefaultProps, Props, State> {

  state: State;
  props: Props;
  static defaultProps: DefaultProps;

  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <button
        onClick={this.props.onClick}
        style={{
          height: '30px',
          backgroundColor: '#fdfffc',
          display: 'inline-flex',
          justifyContent: 'center',
          alignItems: 'center',
          border: '0px',
          borderRadius: '4px',
          padding: '5px 10px',
          margin: '5px 10px',
        }}
      >
        {
          this.props.type == "organized" ?
          (<LogsButton/>) :
          (<OrganizedButton/>)
        }
        <span style={{color: "black", fontSize: "16px", fontFamily: 'Inconsolata', marginLeft: '10px'}}>
          {
            this.props.type == "organized" ?
            "Logs" :
            "Organized"
          }
        </span>
      </button>
    )
  }
}

DiagnosticsModeSelector.propTypes = {

};

DiagnosticsModeSelector.defaultProps = {

};

type DefaultProps = {

};

type Props = {
  onClick(): void,
  type: 'organized' | 'logs',
};

type State = {

};
