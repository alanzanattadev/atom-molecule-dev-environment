"use babel";
// @flow

import * as React from "react";
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
  elementName,
  ...props
}: { elementName: string } & ConfigSchemaPartBase & {
    onChange: (value: any) => void,
    // eslint-disable-next-line prettier/prettier
  } & ( // eslint-disable-next-line prettier/prettier
    | (EnumConfigSchema & { value: any })
    | (FileConfigSchema & { value: any })
    | (ObjectConfigSchema & { value: { [key: string]: any } })
    | (StringConfigSchema & { value: string })
    | (NumberConfigSchema & { value: number })
    | (ConditionalConfigSchema & {
        value: { expressionValue: mixed, caseValue: mixed },
      })
    | (ArrayConfigSchema & { value: Array<any> })
  )) {
  switch (type) {
    case "enum":
      return (
        <PlanConfigSelectInputField
          options={props.enum}
          default={props.default}
          value={value}
          onChange={onChange}
          elementName={elementName}
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
          elementName={elementName}
        />
      );
    case "object":
      return (
        <PlanConfigGroup
          label={label}
          schemas={schemas}
          value={value}
          onChange={onChange}
          elementName={elementName}
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
          elementName={elementName}
        />
      );
    case "number":
      return (
        <PlanConfigNumberInputField
          default={props.default}
          value={value}
          onChange={onChange}
          label={label}
          elementName={elementName}
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
          elementName={elementName}
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
          elementName={elementName}
        />
      );
    case "boolean":
      return (
        <PlanConfigCheckboxInputField
          value={value}
          default={props.default}
          onChange={onChange}
          label={label}
          elementName={elementName}
        />
      );
    default:
      return null;
  }
}
