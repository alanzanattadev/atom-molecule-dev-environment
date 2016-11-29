'use babel'
// @flow

import React from 'react';
import type {TaskState} from "../../TaskExecutionFeature/Types/types.js.flow";
import PinButton from "./PinButton";
import DevToolCircle from "./DevToolCircle";
import Radium from 'radium';

let rippleAnimation = Radium.keyframes({
  '0%': {
    transform: 'scale(1)',
    background: 'rgba(255,255,255,0)'
  },
  '50%': {
    background: 'rgba(255,255,255,.2)'
  },
  '100%': {
    transform: 'scale(30)',
    background: 'rgba(255,255,255,0)'
  }
}, 'ripple')

export function getStateColor(state: TaskState): string {
  switch(state) {
    case "running": return "#2EC4B6";
    case "failed": return "#E71D36";
    case "stopped": return "#1C1F26";
    case "succeed": return "#37CC44";
    case "crashed": return "#E71D36";
    case "created": return "#2EC4B6";
    default: return "#1C1F26";
  }
}

export class Target extends React.Component<DefaultProps, Props, State> {

  state: State;
  props: Props;
  static defaultProps: DefaultProps;

  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <div style={{
        display: 'inline-flex',
        padding: '15px 20px',
        transition: 'border 1s',
        backgroundColor: '#21252C',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '8px',
        cursor: 'pointer',
        height: '50px',
        position: 'relative',
        flexWrap: 'no-wrap',
        flexGrow: '0',
        overflow: 'hidden',
      }} onClick={e => this.props.onClick()}>
        <DevToolCircle iconUri={this.props.iconUri} color={getStateColor(this.props.state)}/>
        <span style={{
          visibility: this.props.state == 'running' ? 'visible' : 'hidden',
          animation: 'x 2s ease 0s infinite',
          // Assign the result of `keyframes` to `animationName`
          animationName: rippleAnimation,
          borderRadius: '50%',
          height: '15px',
          width: '15px',
          position: 'absolute',
          top: '20px',
          left: '35px',
        }}/>
        <span style={{margin: '0px 15px', fontSize: '20px', fontFamily: 'Inconsolata', color: 'white'}}>{this.props.name}</span>
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

export default Radium(Target);
