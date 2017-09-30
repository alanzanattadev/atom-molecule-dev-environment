"use babel";
// @flow

import React from "react";
import PlanConfigPart from "./PlanConfigPart";
import type { ConfigSchemaPart } from "../Types/types.js.flow";
import { getDefault } from "../Model/PlanConfigManipulators";
import AddButton from "./AddButton";
import styled from "styled-components";
import { compose, withProps } from "recompose";
import {
  StateProxy,
  StateInjector,
  getValue,
  isValid,
  // $FlowFixMe
} from "react-forms-state";
import classNames from "classnames";

const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  margin: 8px 0px 8px 0px;
  border-radius: 5px;
`;

const Label = styled.span.attrs({
  className: props =>
    classNames({
      "text-color-highlight": !props.error,
      "diagnostic-color-error-text": props.error,
    }),
})`
  display: flex;
  font-size: 13px;
`;

const List = styled.ul`
  list-style: none;
  padding: 0px;
  margin: 8px 0px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

const Item = styled.li`
  display: flex;
  flex-direction: column;
  list-style: none;
  align-items: stretch;
`;

const ConnectedAddButton = compose(
  StateProxy(),
  withProps(({ onChange, items }) => ({
    onClick: () => onChange(getDefault(items)),
  })),
)(AddButton);

export function PlanConfigList({
  label,
  items,
  validation,
}: {
  label: string,
  value: Array<mixed>,
  onChange: (v: Array<mixed>) => void,
  items: ConfigSchemaPart,
  name: string,
  validation: any,
}) {
  return (
    <Box>
      <Label error={!isValid(validation)}>{label}</Label>
      <StateInjector watchPath={current => current}>
        {(v, props, { watchedStatePath }) => {
          const listValue = getValue(v, watchedStatePath);
          const index = listValue
            ? Object.keys(listValue).length.toString()
            : "0";
          return (
            <List>
              {listValue &&
                Object.keys(listValue).map(key => (
                  <Item key={key}>
                    <PlanConfigPart {...items} name={key} />
                  </Item>
                ))}
              <ConnectedAddButton items={items} name={index} />
            </List>
          );
        }}
      </StateInjector>
    </Box>
  );
}

const enhance = compose(StateProxy());

export default enhance(PlanConfigList);
