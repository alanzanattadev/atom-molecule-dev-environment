"use babel";
// @flow

import React from "react";
import { BranchType, RemoteType } from "../Model/consts";
import { DragSource, DropTarget } from "react-dnd";
import ToolTip from "./ToolTip";
import Remote from "./Remote";

export class DraggableRemote
  extends React.Component<DefaultProps, Props, State> {
  state: State;
  props: Props;
  static defaultProps: DefaultProps;

  constructor(props: Props) {
    super(props);
  }

  getToolTip(): ?string {
    if (this.props.sourceItem) {
      return getActionName(this.props.sourceItem, this.props);
    } else return null;
  }

  render() {
    return this.props.connectDropTarget(
      <span style={{ display: "flex", flex: "1", alignItems: "stretch" }}>
        {this.props.connectDragSource(
          <span style={{ position: "relative", display: "flex", flex: "1" }}>
            <span
              style={{
                position: "absolute",
                top: -20,
                left: 0,
                visibility: this.props.isOver &&
                  this.props.canDrop &&
                  this.getToolTip()
                  ? "visible"
                  : "hidden",
              }}
            >
              <ToolTip>{this.getToolTip()}</ToolTip>
            </span>
            <Remote name={this.props.name} />
          </span>,
        )}
      </span>,
    );
  }
}

DraggableRemote.defaultProps = {};

type DefaultProps = {};

type Props = {};

type State = {};

function getActionName(
  sourceItem: BranchType,
  targetRemote: RemoteType,
  // eslint-disable-next-line no-unused-vars
  type: string,
): ?string {
  if (sourceItem.current) {
    return "push";
  } else {
    return null;
  }
}

let source = {
  // eslint-disable-next-line no-unused-vars
  beginDrag(props, monitor): { name: string } {
    return {
      name: props.name,
    };
  },
};

function collectSource(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  };
}

let target = {
  canDrop(props, monitor) {
    return monitor.getItem().current;
  },
  drop(props, monitor) {
    props.onPush(props.name, monitor.getItem().name);
  },
};

function collectTarget(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
    sourceItem: monitor.getItem(),
  };
}

export default DragSource(RemoteType, source, collectSource)(
  DropTarget([BranchType], target, collectTarget)(DraggableRemote),
);
