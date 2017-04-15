"use babel";
// @flow

import React from "react";
import PlanConfigSelectInputField from "./PlanConfigSelectInputField";
import PlanConfigTextInputField from "./PlanConfigTextInputField";
import PlanConfigGroup from "./PlanConfigGroup";
import type {
  ArrayConfigSchema,
  ConditionalConfigSchema,
  ConfigSchemaPartBase,
  EnumConfigSchema,
  NumberConfigSchema,
  ObjectConfigSchema,
  StringConfigSchema,
} from "../Types/types.js.flow";
import PlanConfigConditionalGroup from "./PlanConfigConditionalGroup";
import PlanConfigNumberInputField from "./PlanConfigNumberInputField";
import PlanConfigCheckboxInputField from "./PlanConfigCheckboxInputField";
import PlanConfigList from "./PlanConfigList";

export default class PlanConfigPart
  extends React.Component<DefaultProps, Props, State> {
  props: Props;
  state: State;
  static defaultProps: DefaultProps;

  constructor(props: Props) {
    super(props);
  }

  render() {
    switch (this.props.type) {
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
            title={this.props.title}
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
            placeholder={this.props.placeholder}
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
            title={this.props.title}
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
        );
      default:
        return null;
    }
  }
}

PlanConfigPart.defaultProps = {};

type DefaultProps = {};

// eslint-disable-next-line prettier/prettier
type Props = ConfigSchemaPartBase & {
  onChange: (value: any) => void
} & (
  (EnumConfigSchema & { value: any })
  | (ObjectConfigSchema & { value: { [key: string]: any } })
  | (StringConfigSchema & { value: string })
  | (NumberConfigSchema & { value: number })
  | (ConditionalConfigSchema<any> & {
  value: { expressionValue: mixed, caseValue: mixed }
})
  | (ArrayConfigSchema & { value: Array<any> }));

type State = {};
