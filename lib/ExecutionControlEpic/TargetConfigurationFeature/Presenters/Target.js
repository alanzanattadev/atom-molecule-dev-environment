'use babel'
// @flow

import React from 'react';
import type {TaskState} from "../../TaskExecutionFeature/Types/types.js.flow";
import PinButton from "./PinButton";

export default class Target extends React.Component<DefaultProps, Props, State> {

  state: State;
  props: Props;
  static defaultProps: DefaultProps;

  constructor(props: Props) {
    super(props);
  }

  getStateColor(state: TaskState): string {
    switch(state) {
      case "running": return "#54FF93";
      case "failed": return "#FF4114";
      case "stopped": return "#ffffff";
      case "succeed": return "#37CC44";
      case "crashed": return "#FF4114";
      case "created": return "#CC7525";
      default: return "#ffffff";
    }
  }

  render() {
    return (
      <div style={{
        display: 'inline-block',
        padding: '5px',
        transition: 'border 1s',
        borderBottom: `2px solid ${this.getStateColor(this.props.state)}`,
        borderLeft: '0px solid #000',
        borderTop: '0px solid #000',
        borderRight: '0px solid #000'
      }} onClick={e => this.props.onClick()}>
        <img src={this.props.iconUri} style={{height: '30px', width: '30px'}}/>
        <span style={{marginLeft: '5px', marginRight: '5px'}}>{this.props.name}</span>
        {
          this.props.pinnable ?
          (<PinButton onClick={this.props.onPin}/>) :
          false
        }
      </div>
    )
  }
}

Target.propTypes = {

};

Target.defaultProps = {
  pinnable: false,
  onClick: () => {},
};

type DefaultProps = {
  onClick(): void,
};

type Props = {
  pinnable: boolean,
  onPin(): void,
  iconUri: string,
  name: string,
  state: TaskState,
  onClick(): void,
};

type State = {

};
