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
      packageInfos: (
        this.props.packages[0] ? this.props.packages[0].path : undefined
      ),
    };
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
          style={{
            display: "flex",
            overflow: "auto",
          }}
          label="name"
          value={this.state.name}
          onChange={value =>
            this.setState(fromJS(this.state).set("name", value).toJS())}
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
          style={{
            display: "flex",
            overflow: "auto",
          }}
          value={this.state.config}
          onChange={value =>
            this.setState(fromJS(this.state).set("config", value).toJS())}
          {...this.props.config}
        />
        <PackageConfig
          style={{
            display: "flex",
            overflow: "auto",
          }}
          value={this.state.packageInfos}
          onChange={value =>
            this.setState(fromJS(this.state).set("packageInfos", value).toJS())}
          packages={this.props.packages}
        />
        <StagerConfig
          style={{
            display: "flex",
            overflow: "auto",
          }}
          value={this.state.stager}
          onChange={value =>
            this.setState(fromJS(this.state).set("stager", value).toJS())}
        />
        <span
          style={{ display: "flex", overflow: "auto", alignSelf: "flex-end" }}
        >
          <AddButton
            onClick={() => this.props.onAddPlan({
              config: this.state.config,
              name: this.state.name,
              stager: {
                type: this.state.stager.expressionValue,
                host: (
                  this.state.stager.expressionValue == "remote"
                    ? Object.assign({}, this.state.stager.caseValue.host, {
                        transport: Object.assign(
                          {},
                          {
                            type: this.state.stager.caseValue.method.expressionValue,
                          },
                          this.state.stager.caseValue.method.caseValue,
                        ),
                      })
                    : null
                ),
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
