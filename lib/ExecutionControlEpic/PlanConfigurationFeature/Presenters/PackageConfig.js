"use babel";
// @flow

import React from "react";
import type {PackageConfig as PackageConfigType} from "../../../ProjectSystemEpic/PackageFeature/Types/types.js.flow";
import PlanConfigPart from "./PlanConfigPart";

export default class PackageConfig
  extends React.Component<DefaultProps, Props, State> {
  state: State;
  props: Props;
  static defaultProps: DefaultProps;

  constructor(props: Props) {
    super(props);
  }

  render() {
    let config = {
      type: "enum",
      label: "package",
      enum: [{ description: "-- Not Selected --", value: null }].concat(
        this.props.packages.map(p => ({
          description: p.name,
          value: p.path,
        })),
      ),
    };

    return (
      <div>
        <PlanConfigPart
          {...config}
          onChange={this.props.onChange}
          value={this.props.value}
        />
      </div>
    );
  }
}

PackageConfig.propTypes = {};

PackageConfig.defaultProps = {};

type DefaultProps = {};

type Props = {
  value: any,
  onChange(v: any): void,
  packages: Array<PackageConfigType>,
};

type State = {};
