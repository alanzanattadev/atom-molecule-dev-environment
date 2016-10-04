'use babel'
// @flow

import React from 'react';
import TargetConfigPart from "./TargetConfigPart";
import AddButton from "./AddButton";
import type {ConfigSchemaPart} from "../Types/types.js.flow";
import {getDefault} from "../Model/TargetConfigManipulators";
import TargetConfigTextInputField from "./TargetConfigTextInputField";

export default class TargetConfigurer extends React.Component<DefaultProps, Props, State> {

  state: State;
  props: Props;
  static defaultProps: DefaultProps;

  constructor(props: Props) {
    super(props);

    this.state = {
      config: getDefault(this.props.config),
      name: '',
    };
  }

  render() {
    return (
      <div className="block" style={{maxWidth: '500px'}}>
        <TargetConfigTextInputField value={this.state.name} onChange={value => this.setState({name: value, config: this.state.config})}/>
        <TargetConfigPart value={this.state.config} onChange={value => this.setState({name: this.state.name, config: value})} {...this.props.config}/>
        <AddButton onClick={() => this.props.onAddTarget({config: this.state.config, name: this.state.name})} success>
          Create
        </AddButton>
      </div>
    )
  }
}

TargetConfigurer.propTypes = {

};

TargetConfigurer.defaultProps = {

};

type DefaultProps = {

};

type Props = {
  config: ConfigSchemaPart,
  onAddTarget(target: {config: mixed, name: string}): void,
};

type State = {
  name: string,
  config: mixed
};
