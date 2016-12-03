'use babel'
// @flow

import React from 'react';
import type {FileStatus} from "../Types/types.js";

export default class FilePath extends React.Component<DefaultProps, Props, State> {

  state: State;
  props: Props;
  static defaultProps: DefaultProps;

  constructor(props: Props) {
    super(props);
  }

  getColor(status: FileStatus) {
    switch(status) {
      case "modified": return "#E5C07B";
      case "added": return "#90E5A0";
      case "removed": return "#E55656";
      default: return "#fff";
    }
  }

  render() {
    return (
      <span style={{fontSize: '18px', fontFamily: 'Inconsolata', color: this.getColor(this.props.status)}}>{this.props.path}</span>
    )
  }
}

FilePath.propTypes = {

};

FilePath.defaultProps = {

};

type DefaultProps = {

};

type Props = {
  path: string,
  status: FileStatus,
};

type State = {

};
