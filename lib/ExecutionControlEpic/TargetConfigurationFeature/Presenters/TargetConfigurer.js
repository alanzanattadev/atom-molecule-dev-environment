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
      <div style={{maxWidth: '500px', padding: '10px 20px', display: 'flex', flexDirection: 'column', alignItems: 'stretch'}}>
        <TargetConfigTextInputField label="name" value={this.state.name} onChange={value => this.setState({name: value, config: this.state.config})}/>
        <h1 style={{fontSize: '16px', color: '#fdfffc'}}>Config</h1>
        <TargetConfigPart value={this.state.config} onChange={value => this.setState({name: this.state.name, config: value})} {...this.props.config}/>
        <span style={{alignSelf: 'flex-end'}}>
          <AddButton onClick={() => this.props.onAddTarget({config: this.state.config, name: this.state.name})} success>
            Create
          </AddButton>
        </span>
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
