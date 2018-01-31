"use babel";
// @flow

import * as React from "react";
import PlanConfigPart from "./PlanConfigPart";
import AddButton from "./AddButton";
import type { ConfigSchemaPart } from "../Types/types.js.flow";
import StagerConfig from "./StagerConfig";
import PlanConfigTextInputField from "./PlanConfigTextInputField";
import PackageConfig from "./PackageConfig";
import type { Package } from "../../../ProjectSystemEpic/PackageFeature/Types/types.js.flow";
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
      <SectionTitle>Stager</SectionTitle>
      <Explanation>
        A stager is a way for controlling how your plan will be executed by
        Molecule.
        <br />j RECOMMENDED: By default, integrated, means it will be executed
        in Atom.
        <br />
        EXPERIMENTAL: The local one adds an intermediary process to bufferise
        the output, can be a performant gain in some cases, but we don t
        recommand using it for now.
        <br />
        HIGHLY EXPERIMENTAL: The remote stager is for executing your plan on a
        remote machine.
      </Explanation>
      <StagerConfig elementName="stager" value="integrated" />
      <ButtonPositioner>
        <AddButton onClick={submit} success>
          Create
        </AddButton>
      </ButtonPositioner>
    </ConfigurerBox>
  );
}
