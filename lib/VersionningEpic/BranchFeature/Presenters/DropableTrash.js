'use babel'
// @flow
import React from 'react';
import {RemoteType, BranchType} from '../Model/consts';
import {DropTarget} from 'react-dnd';
import Trash from './Trash';

export class DropableTrash extends React.Component<DefaultProps, Props, State> {
  state: State;
  props: Props;
  static defaultProps: DefaultProps;

  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      this.props.connectDropTarget(
        <span>
          <Trash {...this.props}/>
        </span>
      )
    )
  }
}

DropableTrash.propTypes = {

};

DropableTrash.defaultProps = {

};

type DefaultProps = {

};

type Props = {

};

type State = {

};

let target = {
  canDrop(props, monitor) {
    return monitor.getItemType() == BranchType || monitor.getItemType() == RemoteType
  },
  drop(props, monitor) {
    if (monitor.getItemType() == BranchType) {
      props.onRemoveBranch(monitor.getItem().name);
    } else if (monitor.getItemType() == RemoteType) {
      props.onRemoveRemote(monitor.getItem().name);
    }
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isVisible: monitor.canDrop(),
    isOver: monitor.isOver(),
  };
}

export default DropTarget([RemoteType, BranchType], target, collect)(DropableTrash);
