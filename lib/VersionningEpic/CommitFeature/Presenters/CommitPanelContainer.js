"use babel";
// @flow

import React from "react";
import type { File } from "../Types/types.js";
import CommitPanel from "./CommitPanel";
import { fromJS, Map } from "immutable";

export default class CommitPanelContainer
  extends React.Component<DefaultProps, Props, State> {
  state: State;
  props: Props;
  static defaultProps: DefaultProps;
  interval: any;

  constructor(props: Props) {
    super(props);

    this.state = {
      message: "",
      files: this.getStatefulFiles(this.props.files),
    };
  }

  getStatefulFiles(files: Array<File>): Array<File & { selected: boolean }> {
    return files.map(file => Object.assign({}, file, { selected: true }));
  }

  componentDidMount(): void {
    this.interval = setInterval(() => {
      this.props.onStatus();
    }, 5000);
  }

  componentWillReceiveProps(nextProps: Props): void {
    if (nextProps.files != this.props.files)
      this.setState(
        fromJS(this.state)
          .update("files", files => {
            return nextProps.files.map(f =>
              Object.assign({}, f, {
                selected: files
                  .find(
                    oldFile => oldFile.get("path") == f.path,
                    {},
                    Map().set("selected", true),
                  )
                  .get("selected"),
              }),
            );
          })
          .toJS(),
      );
  }

  componentWillUnmount(): void {
    clearInterval(this.interval);
  }

  render() {
    return (
      <CommitPanel
        onCommit={() => {
          this.props.onCommit(
            this.state.message,
            this.state.files.filter(file => file.selected),
          );
          this.setState(() => ({ message: "" }));
        }}
        onFileChange={(file, selected) =>
          this.setState(
            fromJS(this.state)
              .update("files", files =>
                files.map(
                  f =>
                    f.get("path") == file.path
                      ? f.set("selected", selected)
                      : f,
                ),
              )
              .toJS(),
          )}
        onMessageChange={message => {
          this.setState(fromJS(this.state).set("message", message).toJS());
        }}
        message={this.state.message}
        files={this.state.files}
      />
    );
  }
}

CommitPanelContainer.defaultProps = {};

type DefaultProps = {};

type Props = {
  onStatus(): void,
  onCommit(message: string, files: Array<File>): void,
  files: Array<File>,
};

type State = {
  message: string,
  files: Array<File & { selected: boolean }>,
};
