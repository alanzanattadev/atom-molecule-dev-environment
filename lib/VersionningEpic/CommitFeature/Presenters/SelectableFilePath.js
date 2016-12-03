'use babel'
// @flow

import React from 'react';
import FilePath from "./FilePath";
import type {FileStatus} from "../Types/types.js.flow";

export default class SelectableFilePath extends React.Component<DefaultProps, Props, State> {

  state: State;
  props: Props;
  static defaultProps: DefaultProps;

  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <div style={{display: 'flex', justifyContent: 'space-between', margin: '5px 10px', alignItems: 'center'}}>
        <span>
          <FilePath path={this.props.path} status={this.props.status}/>
        </span>
        <span style={{marginLeft: '15px'}}>
          <label class='input-label'>
            <input class='input-toggle' type='checkbox' checked={this.props.selected} onChange={e => this.props.onChange(e.target.selected)}/>
          </label>
        </span>
      </div>
    )
  }
}

SelectableFilePath.propTypes = {

};

SelectableFilePath.defaultProps = {
  
};

type DefaultProps = {

};

type Props = {
  status: FileStatus,
  path: string,
  onChange(selected: boolean): void,
  selected: boolean,
};

type State = {

};
