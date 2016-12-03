'use babel'
// @flow

import React from 'react';
import CommitMessageInputField from "./CommitMessageInputField";
import CommitButton from "./CommitButton";
import SelectableFilePaths from "./SelectableFilePaths";
import type {File} from "../Types/types.js";

export default class CommitPanel extends React.Component<DefaultProps, Props, State> {

  state: State;
  props: Props;
  static defaultProps: DefaultProps;

  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <div style={{maxWidth: '450px'}}>
        <span style={{fontSize: '25px', fontFamily: 'Inconsolata', color: 'white', marginLeft: '10px'}}>Index</span>
        <div style={{height: '250px', overflow: 'auto'}}>
          <SelectableFilePaths files={this.props.files} onFileChange={this.props.onFileChange}/>
        </div>
        <div style={{display: 'flex', margin: '5px 10px', alignItems: 'center', justifyContent: 'space-between'}}>
          <CommitMessageInputField message={this.props.message} onChange={value => this.props.onMessageChange(value)}/>
          <CommitButton onClick={() => this.props.onCommit()}/>
        </div>
      </div>
    )
  }
}

CommitPanel.propTypes = {

};

CommitPanel.defaultProps = {
  onCommit: () => {},
  onMessageChange: () => {},
  onFileChange: () => {},
};

type DefaultProps = {

};

type Props = {
  files: Array<File & {selected: boolean}>,
  onFileChange(file: File, selected: boolean): void,
  message: string,
  onMessageChange(message: string): void,
  onCommit(): void,
};

type State = {

};
