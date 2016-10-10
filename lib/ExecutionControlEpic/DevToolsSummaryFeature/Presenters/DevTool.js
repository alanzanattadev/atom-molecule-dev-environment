'use babel'
// @flow

'use babel'
// @flow

import React from 'react';
import type {TaskState} from "../../TaskExecutionFeature/Types/types.js.flow";

export default class DevTool extends React.Component<DefaultProps, Props, State> {

  state: State;
  props: Props;
  static defaultProps: DefaultProps;

  constructor(props: Props) {
    super(props);
  }

  getFilterForState(state: TaskState): string {
    switch(state) {
      case "running": return '';
      case "stopped": return 'grayscale(100%) brightness(200%)';
      case "crashed": return 'grayscale(100%) brightness(200%)';
      case "failed": return 'grayscale(100%) brightness(200%)';
      case "succeed": return 'grayscale(100%) brightness(200%)';
      case "created": return 'grayscale(100%) brightness(200%)';
      default: return 'grayscale(100%) brightness(200%)';
    }
  }

  render() {
    return (
      <div onClick={this.props.onClick} style={{cursor: 'pointer'}}>
        <img src={this.props.iconUri} style={{height: '25px', width: '25px', WebkitFilter: this.getFilterForState(this.props.state)}}/>
      </div>
    )
  }
}

DevTool.propTypes = {

};

DevTool.defaultProps = {

};

type DefaultProps = {

};

type Props = {
  iconUri: string,
  onClick(): void,
  state: TaskState,
};

type State = {

};
