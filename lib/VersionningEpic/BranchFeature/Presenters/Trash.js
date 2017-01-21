'use babel'
// @flow
import React from 'react';

export default class Trash extends React.Component<DefaultProps, Props, State> {
  state: State;
  props: Props;
  static defaultProps: DefaultProps;

  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <div style={{
        display: 'flex',
        border: this.props.isOver ? '2px solid #D95245' : '1px solid #D95245',
        width: '100px',
        height: '70px',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '10px',
        visibility: this.props.isVisible ? 'visible' : 'hidden',
      }}>
        Remove
      </div>
    )
  }
}

Trash.propTypes = {

};

Trash.defaultProps = {
  isVisible: true
};

type DefaultProps = {

};

type Props = {
  isVisible: boolean,
};

type State = {

};
