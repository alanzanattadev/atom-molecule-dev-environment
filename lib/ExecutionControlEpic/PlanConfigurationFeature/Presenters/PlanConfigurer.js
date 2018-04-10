"use babel";
// @flow

import * as React from "react";
import PlanConfigPart from "./PlanConfigPart";
import AddButton from "./AddButton";
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
  max-width: 500px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  flex: 1 0;
`;

const ButtonPositioner = styled.span`
  display: flex;
  flex-shrink: 0;
  align-items: flex-end;
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
      <PlanConfigTextInputField label="name" elementName="name" />
      <SectionTitle>Action</SectionTitle>
      <PlanConfigPart {...config} elementName="config" />
      <SectionTitle>Package</SectionTitle>
      <Explanation>
        A package is a file / folder that defines a location for your tool
        execution. You can think of it as an app definition, considering each
        tool has a file / folder that defines it, either a configuration, or a
        marker.
      </Explanation>
      <PackageConfig elementName="packageInfo" packages={packages} />
      <ButtonPositioner>
        <AddButton onClick={submit} success>
          Create
        </AddButton>
      </ButtonPositioner>
    </ConfigurerBox>
  );
}
