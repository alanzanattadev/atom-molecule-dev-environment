'use babel'
// @flow

import React from 'react';
import TargetConfigTextInputField from "../../../ExecutionControlEpic/TargetConfigurationFeature/Presenters/TargetConfigTextInputField";

export default class CommitMessageInputField extends React.Component<DefaultProps, Props, State> {

  state: State;
  props: Props;
  static defaultProps: DefaultProps;

  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <TargetConfigTextInputField value={this.props.message} onChange={value => this.props.onChange(value)} label="message"/>
    )
  }
}

CommitMessageInputField.propTypes = {

};

CommitMessageInputField.defaultProps = {

};

type DefaultProps = {

};

type Props = {
  message: string,
  onChange(value: string): void,
};

type State = {

};
