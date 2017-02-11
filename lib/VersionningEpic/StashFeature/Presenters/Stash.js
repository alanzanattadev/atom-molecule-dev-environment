'use babel'
// @flow

import React from 'react';

export default class Stash extends React.Component<DefaultProps, Props, State> {

  state: State;
  props: Props;
  static defaultProps: DefaultProps;

  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <div style={{textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '450px', overflow: 'hidden'}}>
        <span className="stash-color" style={{
          display:'inline-flex', justifyContent: 'center', alignItems: 'center',
          fontSize: '18px', color: 'white', fontFamily: 'Inconsolata',
          margin: '10px', borderRadius: '50%', backgroundColor: 'black', padding: '5px',
          width: '25px', height: '25px'
        }}>{this.props.index}</span>
        <span className="text-color-highlight" style={{fontSize: '18px', fontFamily: 'Inconsolata', margin: '0'}}>{this.props.name}</span>
        <span className="text-color-highlight" style={{fontSize: '18px', fontFamily: 'Inconsolata', margin: '0 5px'}}>on</span>
        <span className="text-color-highlight" style={{fontSize: '18px', fontFamily: 'Inconsolata', margin: '0'}}>{this.props.branchName}</span>
        <span className="text-color-highlight" style={{fontSize: '18px', fontFamily: 'Inconsolata', margin: '0px 5px 0px 0px'}}>:</span>
        <span className="text-color-highlight" style={{fontSize: '18px', fontFamily: 'Inconsolata', margin: '0px 5px'}}>{this.props.commitId}</span>
        <span className="text-color-highlight" style={{fontSize: '18px', fontFamily: 'Inconsolata', margin: '0px 5px'}}>{this.props.commitMessage}</span>
      </div>
    )
  }
}

Stash.propTypes = {

};

Stash.defaultProps = {

};

type DefaultProps = {

};

type Props = {
  index: number,
  name: string,
  branchName: string,
  commitId: string,
  commitMessage: string,
};

type State = {

};
