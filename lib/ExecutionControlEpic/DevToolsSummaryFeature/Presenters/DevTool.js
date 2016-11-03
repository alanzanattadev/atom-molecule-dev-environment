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

    this.state = {hovered: false};
  }

  getOpacityForState(state: TaskState): string {
    switch(state) {
      case "running": return '1';
      case "stopped": return '1';
      case "crashed": return '1';
      case "failed": return '1';
      case "succeed": return '1';
      case "created": return '1';
      default: return '1';
    }
  }

  render() {
    return (
      <div onClick={this.props.onClick} style={{cursor: 'pointer'}} onMouseEnter={() => this.setState({hovered: true})} onMouseLeave={() => this.setState({hovered: false})}>
        {
          this.state.hovered ?
          (<img src="diagnostic-icon-log.svg" style={{transition: 'all 0.2s', height: this.props.size, width: this.props.size}}/>) :
          (<img src={this.props.iconUri} style={{transition: 'all 0.2s', height: this.props.size, width: this.props.size, opacity: this.getOpacityForState(this.props.state)}}/>)
        }
      </div>
    )
  }
}

DevTool.propTypes = {

};

DevTool.defaultProps = {
  size: "20px"
};

type DefaultProps = {
  size: "20px"
};

type Props = {
  iconUri: string,
  onClick(): void,
  state: TaskState,
  size: string
};

type State = {
  hovered: boolean
};
