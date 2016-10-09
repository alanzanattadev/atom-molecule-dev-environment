'use babel'
// @flow

import React from 'react';

export default class PinButton extends React.Component<DefaultProps, Props, State> {

  state: State;
  props: Props;
  static defaultProps: DefaultProps;

  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <button className="btn icon icon-pin" onClick={e => {e.stopPropagation(); return this.props.onClick()}}/>
    )
  }
}

PinButton.propTypes = {

};

PinButton.defaultProps = {

};

type DefaultProps = {

};

type Props = {
  onClick(): void,
};

type State = {

};
