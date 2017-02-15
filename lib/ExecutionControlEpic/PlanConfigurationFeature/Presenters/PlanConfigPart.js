'use babel'
// @flow

import React from 'react';
import PlanConfigSelectInputField from "./PlanConfigSelectInputField";
import PlanConfigTextInputField from './PlanConfigTextInputField';
import PlanConfigGroup from './PlanConfigGroup';
import type {ConfigSchemaPart} from '../../../types';
import PlanConfigConditionalGroup from "./PlanConfigConditionalGroup";
import PlanConfigNumberInputField from "./PlanConfigNumberInputField";
import PlanConfigCheckboxInputField from "./PlanConfigCheckboxInputField";
import PlanConfigList from "./PlanConfigList";

export default class PlanConfigPart extends React.Component<DefaultProps, Props, State> {

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
          <PlanConfigSelectInputField
            options={this.props.enum}
            default={this.props.default}
            value={this.props.value}
            onChange={this.props.onChange}
          />
        );
      case "object":
        return (
          <PlanConfigGroup
            schemas={this.props.schemas}
            value={this.props.value}
            onChange={this.props.onChange}
          />
        );
      case "string":
        return (
          <PlanConfigTextInputField
            default={this.props.default}
            value={this.props.value}
            onChange={this.props.onChange}
            label={this.props.title}
          />
        );
      case "number":
        return (
          <PlanConfigNumberInputField
            default={this.props.default}
            value={this.props.value}
            onChange={this.props.onChange}
            title={this.props.title}
          />
        );
      case "conditional":
        return (
          <PlanConfigConditionalGroup
            default={this.props.default}
            expression={this.props.expression}
            cases={this.props.cases}
            value={this.props.value}
            onChange={this.props.onChange}
          />
        );
      case "array":
        return (
          <PlanConfigList
            values={this.props.value}
            default={this.props.default}
            onChange={this.props.onChange}
            items={this.props.items}
          />
        );
      case "boolean":
        return (
          <PlanConfigCheckboxInputField
            value={this.props.value}
            default={this.props.default}
            onChange={this.props.onChange}
            title={this.props.title}
          />
        )
      default:
        return null;
    }
  }
}

PlanConfigPart.propTypes = {

};

PlanConfigPart.defaultProps = {

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
