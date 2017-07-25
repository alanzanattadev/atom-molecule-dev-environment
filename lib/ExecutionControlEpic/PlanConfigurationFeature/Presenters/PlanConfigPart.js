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
  FileConfigSchema,
} from "../Types/types.js.flow";
import PlanConfigConditionalGroup from "./PlanConfigConditionalGroup";
import PlanConfigNumberInputField from "./PlanConfigNumberInputField";
import PlanConfigCheckboxInputField from "./PlanConfigCheckboxInputField";
import PlanConfigFileInputField from "../Containers/PlanConfigFileInputField";
import PlanConfigList from "./PlanConfigList";

export default function PlanConfigPart({
  type,
  value,
  onChange,
  label,
  items,
  expression,
  cases,
  placeholder,
  schemas,
  tester,
  name,
  ...props
}: { name: string } & ConfigSchemaPartBase & {
    onChange: (value: any) => void,
    // eslint-disable-next-line prettier/prettier
  } & ( // eslint-disable-next-line prettier/prettier
    (EnumConfigSchema & { value: any })
    | (FileConfigSchema & { value: any })
    | (ObjectConfigSchema & { value: { [key: string]: any } })
    | (StringConfigSchema & { value: string })
    | (NumberConfigSchema & { value: number })
    | (ConditionalConfigSchema & {
        value: { expressionValue: mixed, caseValue: mixed },
      })
    | (ArrayConfigSchema & { value: Array<any> }))) {
  switch (type) {
    case "enum":
      return (
        <PlanConfigSelectInputField
          options={props.enum}
          default={props.default}
          value={value}
          onChange={onChange}
          name={name}
          label={label}
        />
      );
    case "file":
      return (
        <PlanConfigFileInputField
          tester={tester}
          default={props.default}
          value={value}
          label={label}
          onChange={onChange}
          name={name}
        />
      );
    case "object":
      return (
        <PlanConfigGroup
          label={label}
          schemas={schemas}
          value={value}
          onChange={onChange}
          name={name}
        />
      );
    case "string":
      return (
        <PlanConfigTextInputField
          default={props.default}
          value={value}
          onChange={onChange}
          label={label}
          placeholder={placeholder}
          name={name}
        />
      );
    case "number":
      return (
        <PlanConfigNumberInputField
          default={props.default}
          value={value}
          onChange={onChange}
          label={label}
          name={name}
        />
      );
    case "conditional":
      return (
        <PlanConfigConditionalGroup
          default={props.default}
          expression={expression}
          cases={cases}
          value={value}
          onChange={onChange}
          name={name}
          label={label}
        />
      );
    case "array":
      return (
        <PlanConfigList
          value={value}
          default={props.default}
          onChange={onChange}
          items={items}
          label={label}
          name={name}
        />
      );
    case "boolean":
      return (
        <PlanConfigCheckboxInputField
          value={value}
          default={props.default}
          onChange={onChange}
          label={label}
          name={name}
        />
      );
    default:
      return null;
  }
}
