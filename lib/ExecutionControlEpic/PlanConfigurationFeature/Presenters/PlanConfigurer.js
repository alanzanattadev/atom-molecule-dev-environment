"use babel";
// @flow

import React from "react";
import PlanConfigPart from "./PlanConfigPart";
import AddButton from "./AddButton";
import type { ConfigSchemaPart } from "../Types/types.js.flow";
import { getDefault } from "../Model/PlanConfigManipulators";
import StagerConfig from "./StagerConfig";
import PlanConfigTextInputField from "./PlanConfigTextInputField";
import PackageConfig from "./PackageConfig";
import { fromJS } from "immutable";
import type {
  Package,
} from "../../../ProjectSystemEpic/PackageFeature/Types/types.js.flow";
import styled from "styled-components";

const SectionTitleElement = styled.h1`
  font-size: 16px;
`;

function SectionTitle({ children }: { children?: any }) {
  return (
    <SectionTitleElement className="text-color-highlight">
      {children}
    </SectionTitleElement>
  );
}

const ExplanationElement = styled.p`
  margin: 8px 16px 8px 0px;
`;

function Explanation({ children }: { children?: any }) {
  return (
    <ExplanationElement className="text-color">
      {children}
    </ExplanationElement>
  );
}

export default class PlanConfigurer
  extends React.Component<DefaultProps, Props, State> {
  state: State;
  props: Props;
  static defaultProps: DefaultProps;

  constructor(props: Props) {
    super(props);

    this.state = {
      config: getDefault(this.props.config),
      name: "",
      stager: {
        expressionValue: "integrated",
        caseValue: null,
      },
      packageInfos: this.props.packages[0]
        ? this.props.packages[0].path
        : undefined,
    };
  }

  componentWillReceiveProps(nextProps: Props) {
    if (this.props.packages.length === 0 && nextProps.packages !== 0) {
      this.setState({
        packageInfos: nextProps.packages[0]
          ? nextProps.packages[0].path
          : undefined,
      });
    }
  }

  render() {
    return (
      <div
        style={{
          maxWidth: "500px",
          padding: "16px",
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
          flex: "1 0",
        }}
      >
        <PlanConfigTextInputField
          label="name"
          value={this.state.name}
          onChange={value =>
            this.setState(fromJS(this.state).set("name", value).toJS())}
        />
        <SectionTitle>Action</SectionTitle>
        <PlanConfigPart
          value={this.state.config}
          onChange={value =>
            this.setState(fromJS(this.state).set("config", value).toJS())}
          {...this.props.config}
        />
        <SectionTitle>Package</SectionTitle>
        <Explanation>
          A package is a file / folder that defines a location for your tool
          execution. You can think of it as an app definition, considering each
          tool has a file / folder that defines it, either a configuration,
          or a marker.
        </Explanation>
        <PackageConfig
          value={this.state.packageInfos}
          onChange={value =>
            this.setState(fromJS(this.state).set("packageInfos", value).toJS())}
          packages={this.props.packages}
        />
        <SectionTitle>Stager</SectionTitle>
        <Explanation>
          A stager is a way for controlling how your plan will be executed by Molecule.
          <br />
          RECOMMENDED: By default, integrated, means
          it will be executed in Atom.
          <br />
          EXPERIMENTAL: The local one adds an intermediary process
          to bufferise the output, can be a performant gain in some cases,
          but we don t recommand using it for now.
          <br />
          HIGHLY EXPERIMENTAL: The remote stager is for executing
          your plan on a remote machine.
        </Explanation>
        <StagerConfig
          value={this.state.stager}
          onChange={value =>
            this.setState(fromJS(this.state).set("stager", value).toJS())}
        />
        <span
          style={{ display: "flex", flexShrink: "0", alignSelf: "flex-end" }}
        >
          <AddButton
            onClick={() =>
              this.props.onAddPlan({
                config: this.state.config,
                name: this.state.name,
                stager: {
                  type: this.state.stager.expressionValue,
                  host: this.state.stager.expressionValue == "remote"
                    ? Object.assign({}, this.state.stager.caseValue.host, {
                        transport: Object.assign(
                          {},
                          {
                            type: this.state.stager.caseValue.method
                              .expressionValue,
                          },
                          this.state.stager.caseValue.method.caseValue,
                        ),
                      })
                    : null,
                },
                packageInfos: this.props.packages.find(
                  p => p.path == this.state.packageInfos,
                ),
              })}
            success
          >
            Create
          </AddButton>
        </span>
      </div>
    );
  }
}

PlanConfigurer.defaultProps = {
  packages: [],
};

type DefaultProps = {};

type Props = {
  config: ConfigSchemaPart,
  onAddPlan(plan: { config: mixed, name: string }): void,
  packages: Array<Package>,
};

type State = {
  name: string,
  config: any,
  stager: {
    expressionValue: any,
    caseValue: any,
  },
  packageInfos?: string,
};
