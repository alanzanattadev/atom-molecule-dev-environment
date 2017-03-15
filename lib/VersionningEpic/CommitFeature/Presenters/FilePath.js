"use babel";
// @flow

import React from "react";
import type { FileStatus } from "../Types/types.js";

export default class FilePath
  extends React.Component<DefaultProps, Props, State> {
  state: State;
  props: Props;
  static defaultProps: DefaultProps;

  constructor(props: Props) {
    super(props);
  }

  getColor(status: FileStatus) {
    switch (status) {
      case "modified":
        return "modified-color";
      case "added":
        return "added-color";
      case "removed":
        return "removed-color";
      default:
        return "default-color";
    }
  }

  render() {
    return (
      <span
        className={this.getColor(this.props.status)}
        style={{
          fontSize: "18px",
          whiteSpace: "nowrap",
          textAlign: "right",
          textOverflow: "ellipsis"
        }}
      >
        {this.props.path}
      </span>
    );
  }
}

FilePath.propTypes = {};

FilePath.defaultProps = {};

type DefaultProps = {};

type Props = {
  path: string,
  status: FileStatus
};

type State = {};
