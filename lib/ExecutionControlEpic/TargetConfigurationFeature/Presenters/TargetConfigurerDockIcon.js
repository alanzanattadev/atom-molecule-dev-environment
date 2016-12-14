'use babel'
// @flow

import React from 'react';
import DockIcon from '../../../GlobalSystem/Presenters/DockIcon';

export default class TargetConfigurerDockIcon extends React.Component<DefaultProps, Props, State> {
  state: State;
  props: Props;
  static defaultProps: DefaultProps;

  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <DockIcon iconUri="atom://molecule-dev-environment/.storybook/public/target-configuration-icon.svg" name="target configuration" color="#35232A" {...this.props}/>
    )
  }
}

TargetConfigurerDockIcon.propTypes = {
};

TargetConfigurerDockIcon.defaultProps = {
};

type DefaultProps = {
};

type Props = {
};

type State = {
};
