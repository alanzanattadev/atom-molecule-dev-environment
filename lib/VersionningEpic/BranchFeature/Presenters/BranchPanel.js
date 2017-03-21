"use babel";
// @flow
import React from "react";
import type {Branch} from "../Types/types.js.flow";
import Branches from "./Branches";
import {DragDropContext} from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import Remotes from "./Remotes";
import DropableTrash from "./DropableTrash";
import Radium from "radium";

export class BranchPanel extends React.Component<DefaultProps, Props, State> {
  state: State;
  props: Props;
  static defaultProps: DefaultProps;

  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flex: "1",
          alignItems: "stretch",
          margin: "20px 5px",
        }}
        tabIndex="-1"
      >
        <Remotes {...this.props} />
        <Branches {...this.props} />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <DropableTrash {...this.props} />
        </div>
      </div>
    );
  }
}

BranchPanel.propTypes = {};

BranchPanel.defaultProps = {};

type DefaultProps = {};

type Props = {
  branches: Array<Branch>,
  onRebase(branch: string): void,
  onMerge(branch: string): void,
  onCheckout(branch: string): void,
  onPush(remote: string, branch: string): void,
  onPull(remote: string, branch: string): void,
  onRemoveBranch(name: string): void,
  onRemoveRemote(remoteName: string): void,
  onCreateBranch(name: string): void,
};

type State = {};

export default DragDropContext(HTML5Backend)(Radium(BranchPanel));
