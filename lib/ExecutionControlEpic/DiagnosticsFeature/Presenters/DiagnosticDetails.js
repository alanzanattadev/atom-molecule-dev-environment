'use babel'
// @flow

import React from 'react';

export default class DiagnosticDetails extends React.Component<DefaultProps, Props, State> {

  state: State;
  props: Props;
  static defaultProps: DefaultProps;

  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <div style={{maxWidth: '800px'}}>
        {this.props.message}
      </div>
    )
  }
}

DiagnosticDetails.propTypes = {

};

DiagnosticDetails.defaultProps = {

};

type DefaultProps = {

};

type Props = {
  message: string
};

type State = {

};
