'use babel'
// @flow

import React from 'react';
import Target from "./Target";
import type {TargetConfig} from "../Types/types.js.flow";

export default class Targets extends React.Component<DefaultProps, Props, State> {

  state: State;
  props: Props;
  static defaultProps: DefaultProps;

  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <ul style={{paddingLeft: '0', margin: '5px', display: 'flex'}}>
        {this.props.targets.map(target => (
          <li key={target.tool.id + ' ' + target.name} style={{listStyle: 'none', margin: '0px 3px'}}>
            <Target
              iconUri={target.tool.iconUri}
              name={target.name}
              pinnable={this.props.pinnable}
              onClick={() => this.props.onTargetClick(target)}
              onPin={() => this.props.onTargetPin(target)}
            />
          </li>
        ))}
      </ul>
    )
  }
}

Targets.propTypes = {

};

Targets.defaultProps = {
  pinnable: false
};

type DefaultProps = {
  pinnable: false
};

type Props = {
  targets: Array<TargetConfig>,
  pinnable: boolean,
  onTargetClick(target: TargetConfig): void,
  onTargetPin(targer: TargetConfig): void,
};

type State = {

};
