'use babel'
// @flow

import React from 'react';
import StashList from "./StashList";
import StashButton from "./StashButton";
import StashPopButton from "./StashPopButton";
import type {StashType} from "../Types/types.js.flow";

export default class StashPanel extends React.Component<DefaultProps, Props, State> {

  state: State;
  props: Props;
  static defaultProps: DefaultProps;

  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <div style={{maxWidth: '350px'}}>
        <span style={{fontSize: '25px', color: 'white', fontFamily: 'Inconsolata', marginLeft: '10px'}}>Stash</span>
        <div>
          <StashList stashs={this.props.stashs}/>
        </div>
        <div style={{display: 'flex', justifyContent: 'flex-end'}}>
          <StashButton onClick={this.props.onStash}/>
          <StashPopButton onClick={this.props.onStashPop}/>
        </div>
      </div>
    )
  }
}

StashPanel.propTypes = {

};

StashPanel.defaultProps = {
  onStash() {},
  onStashPop() {},
};

type DefaultProps = {

};

type Props = {
  stashs: Array<StashType>,
  onStash(): void,
  onStashPop(): void,
};

type State = {

};
