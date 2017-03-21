"use babel";
// @flow

import React from "react";
import SelectableFilePath from "./SelectableFilePath";
import type {File} from "../Types/types.js.flow";

export default class SelectableFilePaths
  extends React.Component<DefaultProps, Props, State> {
  state: State;
  props: Props;
  static defaultProps: DefaultProps;

  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <ul style={{ padding: "0px" }}>
        {this.props.files.map(file => (
          <li style={{ listStyle: "none" }} key={file.path}>
            <SelectableFilePath
              {...file}
              onChange={(value: boolean) =>
                this.props.onFileChange(file, value)}
            />
          </li>
        ))}
      </ul>
    );
  }
}

SelectableFilePaths.propTypes = {};

SelectableFilePaths.defaultProps = {
  files: [],
};

type DefaultProps = {};

type Props = {
  files: Array<File & { selected: boolean }>,
  onFileChange(file: File, value: boolean): void,
};

type State = {};
