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
import type {
  Package,
} from "../../../ProjectSystemEpic/PackageFeature/Types/types.js.flow";

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
          padding: "10px 20px",
          display: "flex",
          overflow: "auto",
          flexDirection: "column",
          alignItems: "stretch",
          flex: "1",
        }}
      >
        <PlanConfigTextInputField
          name="name"
          style={{
            display: "flex",
            overflow: "auto",
          }}
          label="name"
        />
        <h1
          className="text-color-highlight"
          style={{
            fontSize: "16px",
          }}
        >
          Config
        </h1>
        <PlanConfigPart
          name="config"
          style={{
            display: "flex",
            overflow: "auto",
          }}
          {...this.props.config}
        />
        <PackageConfig
          name="packages"
          style={{
            display: "flex",
            overflow: "auto",
          }}
          packages={this.props.packages}
        />
        <StagerConfig
          name="stager"
          style={{
            display: "flex",
            overflow: "auto",
          }}
        />
        <span
          style={{ display: "flex", overflow: "auto", alignSelf: "flex-end" }}
        >
          <AddButton onClick={this.props.onSubmit} success>
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
  onSubmit(): void,
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
