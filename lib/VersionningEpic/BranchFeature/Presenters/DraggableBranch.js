"use babel";
// @flow

import React from "react";
import { DragSource, DropTarget } from "react-dnd";
import Branch from "./Branch";
import ToolTip from "./ToolTip";
import { BranchType, RemoteType } from "../Model/consts";

export class DraggableBranch
  extends React.Component<DefaultProps, Props, State> {
  state: State;
  props: Props;
  static defaultProps: DefaultProps;

  constructor(props: Props) {
    super(props);
  }

  getToolTip(): string {
    if (!this.props.sourceItem) return null;
    return getActionName(
      this.props.sourceItem,
      this.props,
      this.props.sourceItemType,
    );
  }

  render() {
    return this.props.connectDropTarget(
      <span>
        {this.props.connectDragSource(
          <span style={{ position: "relative" }}>
            <span
              style={{
                position: "absolute",
                top: -20,
                left: 0,
                visibility: (
                  this.props.isOver && this.props.canDrop && this.getToolTip()
                    ? "visible"
                    : "hidden"
                ),
              }}
            >
              <ToolTip>{this.getToolTip()}</ToolTip>
            </span>
            <Branch
              name={this.props.name}
              current={this.props.current}
              onClick={this.props.onClick}
            />
          </span>,
        )}
      </span>,
    );
  }
}

DraggableBranch.defaultProps = {};

type DefaultProps = {};

type Props = {
  name: string,
  current: boolean,
};

type State = {};

function getActionName(
  sourceBranch: Branch,
  targetBranch: Branch,
  type: string,
): ?string {
  if (type == BranchType) {
    if (targetBranch.current) {
      return "merge";
    } else if (sourceBranch.current) {
      return "rebase";
    } else {
      return null;
    }
  } else if (type == RemoteType) {
    if (targetBranch.current) return "pull";
    else return null;
  } else {
    return null;
  }
}

let source = {
  beginDrag(props: Props): { name: string, current: boolean } {
    return {
      name: props.name,
      current: props.current,
    };
  },
};

let target = {
  canDrop(props, monitor) {
    return monitor.getItemType() == BranchType &&
      props.name != monitor.getItem().name ||
      monitor.getItemType() == RemoteType && props.current;
  },
  drop(props, monitor) {
    if (monitor.getItemType() == BranchType) {
      switch (getActionName(monitor.getItem(), props)) {
        case "rebase":
          props.onRebase(props.name);
          break;
        case "merge":
          props.onMerge(monitor.getItem().name);
          break;
      }
    } else if (monitor.getItemType() == RemoteType) {
      props.onPull(monitor.getItem().name, props.name);
    }
  },
};

function collectSource(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  };
}

function collectTarget(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
    sourceItem: monitor.getItem(),
    sourceItemType: monitor.getItemType(),
  };
}

export default DragSource(BranchType, source, collectSource)(
  DropTarget([BranchType, RemoteType], target, collectTarget)(DraggableBranch),
);
