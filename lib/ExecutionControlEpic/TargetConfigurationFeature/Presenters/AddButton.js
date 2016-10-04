'use babel'
// @flow

'use babel'
// @flow

import React from 'react';
import classNames from 'classnames';

export default class AddButton extends React.Component<DefaultProps, Props, State> {

  state: State;
  props: Props;
  static defaultProps: DefaultProps;

  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <button onClick={this.props.onClick} className={classNames("btn", "icon", "icon-plus", {"btn-success": this.props.success})}>
        {this.props.children}
      </button>
    );
  }
}

AddButton.propTypes = {

};

AddButton.defaultProps = {
  success: false
};

type DefaultProps = {
  success: false
};

type Props = {
  onClick(): void,
  children?: string
};

type State = {

};
