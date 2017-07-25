"use babel";
// @flow

import React from "react";
import Image from "react-image-fallback";
import type { ConfigSchemaPart } from "../Types/types.js.flow";
import PlanConfigPart from "./PlanConfigPart";
import styled from "styled-components";
// $FlowFixMe
import { StateProxy } from "react-forms-state";
import { compose, withState } from "recompose";

const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  flex-shrink: 0;
  margin: 8px 0px;
`;

const LabelBox = styled.div`
  display: flex;
  justify-content: space-between;
  flex-shrink: 0;
  margin: 4px 0px;
`;

const Label = styled.span.attrs({
  className: "text-color-highlight",
})`
  display: flex;
  font-size: 13px;
`;

const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  align-items: stretch;
`;

export function PlanConfigGroup({
  label,
  expanded = true,
  setExpanded = () => {},
  schemas = {},
}: {
  label: string,
  expanded: boolean,
  setExpanded: (v: boolean) => void,
  schemas: { [key: string]: ConfigSchemaPart },
  value: any,
  onChange: (v: any) => void,
}) {
  return (
    <Box>
      <LabelBox onClick={() => setExpanded(!expanded)}>
        <Label>
          config{label != null ? ` > ${label}` : ""}
        </Label>
        <Image
          src="atom://molecule-dev-environment/.storybook/public/arrow-right.svg"
          fallbackImage="arrow-right.svg"
          style={{
            display: "flex",
            height: "16px",
            width: "16px",
            transform: expanded ? "rotate(90deg)" : "",
            transition: "0.2s transform",
          }}
        />
      </LabelBox>
      {expanded &&
        <ContentBox>
          {Object.keys(schemas).map(key =>
            <PlanConfigPart {...schemas[key]} name={key} key={key} />,
          )}
        </ContentBox>}
    </Box>
  );
}

const enhance = compose(
  StateProxy(),
  withState("expanded", "setExpanded", true),
);

export default enhance(PlanConfigGroup);
