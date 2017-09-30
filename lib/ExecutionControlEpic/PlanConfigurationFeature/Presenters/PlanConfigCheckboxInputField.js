"use babel";
// @flow

import React from "react";
import { compose } from "recompose";
import styled from "styled-components";
// $FlowFixMe
import { StateProxy, isValid } from "react-forms-state";
import classNames from "classnames";

const Box = styled.span``;
const Label = styled.label.attrs({
  className: props =>
    classNames("input-label", { "diagnostic-color-error-text": props.error }),
})`

`;

const CheckBoxField = styled.input.attrs({
  className: "input-checkbox",
  type: "checkbox",
})`

`;

export function PlanConfigCheckboxInputField({
  label,
  value,
  onChange,
  validation,
}: {
  label: string,
  value: boolean,
  onChange: (v: boolean) => void,
  validation: any,
}) {
  return (
    <Box>
      <Label error={!isValid(validation)}>
        <CheckBoxField
          checked={value}
          onChange={e => onChange(e.target.checked)}
        />
        {label}
      </Label>
    </Box>
  );
}

const enhance = compose(StateProxy());

export default enhance(PlanConfigCheckboxInputField);
