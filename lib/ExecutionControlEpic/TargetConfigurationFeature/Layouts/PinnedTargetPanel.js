'use babel'
// @flow

import React from 'react';
import PinnedTargets from "../Containers/PinnedTargets";

export default class PinnedTargetPanel extends React.Component<DefaultProps, Props, State> {

  state: State;
  props: Props;
  static defaultProps: DefaultProps;

  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <div style={{}}>
        <PinnedTargets {...this.props}/>
      </div>
    )
  }
}

PinnedTargetPanel.propTypes = {

};

PinnedTargetPanel.defaultProps = {

};

type DefaultProps = {

};

type Props = {

};

type State = {

};
