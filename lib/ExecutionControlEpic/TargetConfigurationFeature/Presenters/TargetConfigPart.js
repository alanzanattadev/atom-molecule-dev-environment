'use babel'
// @flow

import React from 'react';
import TargetConfigSelectInputField from "./TargetConfigSelectInputField";
import TargetConfigTextInputField from './TargetConfigTextInputField';
import TargetConfigGroup from './TargetConfigGroup';
import type {ConfigSchemaPart} from '../../../types';
import TargetConfigConditionalGroup from "./TargetConfigConditionalGroup";
import TargetConfigNumberInputField from "./TargetConfigNumberInputField";
import TargetConfigCheckboxInputField from "./TargetConfigCheckboxInputField";
import TargetConfigList from "./TargetConfigList";

export default class TargetConfigPart extends React.Component<DefaultProps, Props, State> {

  props: Props;
  state: State;
  static defaultProps: DefaultProps;

  constructor(props: Props) {
    super(props);
  }

  render() {
    switch(this.props.type) {
      case "enum":
        return (
          <TargetConfigSelectInputField
            options={this.props.enum}
            default={this.props.default}
            value={this.props.value}
            onChange={this.props.onChange}
          />
        );
      case "object":
        return (
          <TargetConfigGroup
            schemas={this.props.schemas}
            value={this.props.value}
            onChange={this.props.onChange}
          />
        );
      case "string":
        return (
          <TargetConfigTextInputField
            default={this.props.default}
            value={this.props.value}
            onChange={this.props.onChange}
            label={this.props.title}
          />
        );
      case "number":
        return (
          <TargetConfigNumberInputField
            default={this.props.default}
            value={this.props.value}
            onChange={this.props.onChange}
            title={this.props.title}
          />
        );
      case "conditional":
        return (
          <TargetConfigConditionalGroup
            default={this.props.default}
            expression={this.props.expression}
            cases={this.props.cases}
            value={this.props.value}
            onChange={this.props.onChange}
          />
        );
      case "array":
        return (
          <TargetConfigList
            values={this.props.value}
            default={this.props.default}
            onChange={this.props.onChange}
            items={this.props.items}
          />
        );
      case "boolean":
        return (
          <TargetConfigCheckboxInputField
            value={this.props.value}
            default={this.props.default}
            onChange={this.props.onChange}
          />
        )
      default:
        return null;
    }
  }
}

TargetConfigPart.propTypes = {

};

TargetConfigPart.defaultProps = {

};

type DefaultProps = {

};

type Props = {
  value: any,
  default?: any,
  title?: string,
  onChange: (value: any)=> void,
} & (
  {type: 'enum', enum: Array<{value: any, description: string}>} |
  {type: 'object', schema: {[key: string]: ConfigSchemaPart}} |
  {type: 'string'} |
  {type: 'number'} |
  {type: 'conditional', expression: ConfigSchemaPart, value:{expressionValue: mixed, caseValue: mixed}, cases: {[key: mixed]: ConfigSchemaPart}} |
  {type: 'array', value: Array<mixed>, items: ConfigSchemaPart}
);

type State = {

};
