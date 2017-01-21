'use babel'
// @flow
import React from 'react';
import type {Branch} from '../Types/types.js.flow';
import DraggableBranch from './DraggableBranch';
import Trash from './Trash';
import Remotes from './Remotes';
import CustomBranch from './CustomBranch';
import Radium from 'radium';

export class Branches extends React.Component<DefaultProps, Props, State> {
  state: State;
  props: Props;
  static defaultProps: DefaultProps;

  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <ul style={{padding: '0px', margin: '5px', display: 'flex', flex: '1', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center'}}>
        {this.props.branches.map((branch: Branch) => (
          <li style={{listStyle: 'none'}} key={branch.name + branch.remote}>
            <DraggableBranch {...branch} {...this.props} onClick={() => {if (branch.current === false) this.props.onCheckout(branch.name)}}/>
          </li>
        ))}
        <CustomBranch onCreateBranch={this.props.onCreateBranch}/>
      </ul>
    )
  }
}

Branches.propTypes = {

};

Branches.defaultProps = {

};

type DefaultProps = {

};

type Props = {
  branches: Array<Branch>
};

type State = {

};

export default Radium(Branches);
