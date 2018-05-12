"use babel";
// @flow

import * as React from "react";
import PlanConfigPart from "./PlanConfigPart";
import AddButton from "./AddButton";
import HintButton from "./hintButton";
import type { ConfigSchemaPart } from "../Types/types";
import PlanConfigTextInputField from "./PlanConfigTextInputField";
import PackageConfig from "./PackageConfig";
import type { Package } from "../../../ProjectSystemEpic/PackageFeature/Types/types";
import styled from "styled-components";

const SectionTitle = styled.h1.attrs({
  className: "text-color-highlight",
})`
  font-size: 16px;
`;

const Explanation = styled.p.attrs({
  className: "text-color",
})`
  margin: 8px 16px 8px 0px;
`;

const ConfigurerBox = styled.div`
  justify-content: space-between;
  padding: 16px;
  display: flex;
  align-items: stretch;
  flex: 1 1 0;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  align-content: flex-start;
`;

const ColumnBox = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 400px;
  width: 45%;
  flex-shrink: 0;
`;

const ButtonPositioner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const PlanExplanationBox = styled.p`
  margin: 8px 16px;
  margin-top: 13px;
`;

export default function PlanConfigurer(
  {
    config = {},
    packages = [],
    submit = () => {},
  }: {
    config?: ConfigSchemaPart,
    submit?: () => void,
    packages?: Array<Package>,
  } = { packages: [] },
) {
  return (
    <ConfigurerBox>
      <ColumnBox>
        <PlanConfigTextInputField label="name" elementName="name" />
      </ColumnBox>
      <ColumnBox>
        <PlanExplanationBox className="text-color">
          A plan is a reusable action (command, script, request) of a tool.
          <br />
          You can create as many plan as you need for your daily tasks.
        </PlanExplanationBox>
      </ColumnBox>
      <ColumnBox>
        <SectionTitle>Action</SectionTitle>
        <PlanConfigPart {...config} elementName="config" />
      </ColumnBox>
      <ColumnBox>
        <SectionTitle>
          <HintButton
            top="-83"
            hint="A package is a file / folder that defines a location for your tool execution. You can think of it as an app definition, considering each tool has a file / folder that defines it, either a configuration, or a marker."
          />
          Package
        </SectionTitle>
        <PackageConfig elementName="packageInfo" packages={packages} />
      </ColumnBox>
      <ButtonPositioner>
        <AddButton onClick={submit} success>
          Create
        </AddButton>
      </ButtonPositioner>
    </ConfigurerBox>
  );
}
