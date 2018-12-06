"use babel";
// @flow

import * as React from "react";
import { compose } from "recompose";
import styled from "styled-components";
// $FlowFixMe
import { FormElement, isValid } from "react-forms-state";
import classNames from "classnames";

const SelectField = styled.select.attrs({
  className: "text-color-highlight input-select tool-name-background-color",
})`
  display: flex;
  flex: 1 1 0px;
  border-radius: 0px 5px 5px 0px;
  padding: 5px;
  border: 0px;
  margin: 0px;
  height: 40px;
  text-overflow: ellipsis;
`;

const Box = styled.div`
  display: flex;
  min-height: 40px;
  margin: 8px;
  align-items: stretch;
  flex: 0 1 0px;
`;

const Label = styled.span.attrs({
  className: props =>
    classNames({
      "tool-name-background-color": true,
      "text-color-highlight": !props.error,
      "diagnostic-color-error-text": props.error,
    }),
})`
  display: flex;
  padding: 8px;
  min-width: 80px;
  border-top-left-radius: 6px;
  border-bottom-left-radius: 6px;
  justify-content: center;
  align-items: center;
`;

export function PlanConfigSelectInputField({
  validation,
  options = [],
  label,
  value,
  onChange,
}: {
  value: string,
  onChange: (v: string) => void,
  options: Array<{
    description: string,
    value: string,
    onChange: (v: string) => void,
  }>,
  label: string,
  validation: any,
}) {
  return (
    <Box>
      <Label error={!isValid(validation)}>{label}</Label>
      <SelectField
        value={value ? value : ""}
        onChange={e => onChange(e.target.value)}
      >
        {options.map(option => (
          <option
            key={option.description}
            value={option && option.value ? option.value : ""}
          >
            {option.description}
          </option>
        ))}
      </SelectField>
    </Box>
  );
}

const enhance = compose(FormElement());

export default enhance(PlanConfigSelectInputField);
