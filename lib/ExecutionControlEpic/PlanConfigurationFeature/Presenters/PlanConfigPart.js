"use babel";
// @flow

import React from "react";
import type {
  ArrayConfigSchema,
  ConditionalConfigSchema,
  ConfigSchemaPartBase,
  EnumConfigSchema,
  NumberConfigSchema,
  ObjectConfigSchema,
  StringConfigSchema,
} from "../Types/types.js.flow";
import PlanConfigSelectInputField from "./PlanConfigSelectInputField";
import PlanConfigTextInputField from "./PlanConfigTextInputField";
import PlanConfigGroup from "./PlanConfigGroup";
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
            name={this.props.name}
            options={this.props.enum}
            default={this.props.default}
          />
        );
      case "object":
        return (
          <PlanConfigGroup
            name={this.props.name}
            title={this.props.title}
            schemas={this.props.schemas}
          />
        );
      case "string":
        return (
          <PlanConfigTextInputField
            name={this.props.name}
            default={this.props.default}
            label={this.props.title}
            placeholder={this.props.placeholder}
          />
        );
      case "number":
        return (
          <PlanConfigNumberInputField
            name={this.props.name}
            default={this.props.default}
            title={this.props.title}
          />
        );
      /*case "conditional":
        return (
          <PlanConfigConditionalGroup
            name={this.props.name}
            default={this.props.default}
            expression={this.props.expression}
            cases={this.props.cases}
          />
        );*/
      case "array":
        return (
          <PlanConfigList
            name={this.props.name}
            default={this.props.default}
            items={this.props.items}
            title={this.props.title}
          />
        );
      case "boolean":
        return (
          <PlanConfigCheckboxInputField
            name={this.props.name}
            default={this.props.default}
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
  name: string,
// eslint-disable-next-line prettier/prettier
} & (
// eslint-disable-next-line prettier/prettier
    (EnumConfigSchema & { value: any })
    | (ObjectConfigSchema & { value: { [key: string]: any } })
    | (StringConfigSchema & { value: string })
    | (NumberConfigSchema & { value: number })
    | (ConditionalConfigSchema & {
      value: { expressionValue: mixed, caseValue: mixed },
    })
    | (ArrayConfigSchema & { value: Array<any> }));

type State = {};
