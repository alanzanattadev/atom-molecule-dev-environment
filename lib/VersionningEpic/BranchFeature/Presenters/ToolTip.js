'use babel'
// @flow
import React from 'react';

export default class ToolTip extends React.Component<DefaultProps, Props, State> {
  state: State;
  props: Props;
  static defaultProps: DefaultProps;

  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <span style={{padding: '5px', border: '1px #000 solid', color: '#fff', backgroundColor: '#6563DF'}}>
        {this.props.children}
      </span>
    )
  }
}

ToolTip.propTypes = {

};

ToolTip.defaultProps = {

};

type DefaultProps = {

};

type Props = {

};

type State = {

};
