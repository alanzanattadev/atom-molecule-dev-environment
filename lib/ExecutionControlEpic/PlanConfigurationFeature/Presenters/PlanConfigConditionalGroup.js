"use babel";
// @flow

import * as React from "react";
import PlanConfigPart from "./PlanConfigPart";
import type { ConfigSchemaPart } from "../Types/types.js.flow";
import { getDefault } from "../Model/PlanConfigManipulators";
import styled from "styled-components";
// $FlowFixMe
import { StateProxy } from "react-forms-state";
import { compose } from "recompose";

const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  flex-shrink: 0;
`;

type Value = { expressionValue: mixed, caseValue: mixed };

export function PlanConfigConditionalGroup({
  value = { expressionValue: null, caseValue: null },
  onChange,
  cases,
  expression,
}: {
  value: Value,
  onChange: (v: Value) => void,
  cases: { [key: mixed]: ConfigSchemaPart },
  expression: ConfigSchemaPart,
}) {
  return (
    <Box>
      <PlanConfigPart
        {...expression}
        value={value && value.expressionValue}
        name="expressionValue"
        onChange={v =>
          onChange({
            expressionValue: v,
            caseValue: getDefault(cases[v] || {}),
          })
        }
      />
      {value == null ||
      value.expressionValue == null ||
      cases[value.expressionValue] == null ? null : (
        <PlanConfigPart
          {...cases[value.expressionValue]}
          value={value.caseValue}
          name="caseValue"
        />
      )}
    </Box>
  );
}

const enhance = compose(StateProxy());

export default enhance(PlanConfigConditionalGroup);
