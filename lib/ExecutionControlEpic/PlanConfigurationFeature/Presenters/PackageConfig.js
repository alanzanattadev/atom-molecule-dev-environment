"use babel";
// @flow

import React from "react";
import type {
  Package,
} from "../../../ProjectSystemEpic/PackageFeature/Types/types.js.flow";
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
      enum: this.props.packages !== null && this.props.packages.length > 0
        ? this.props.packages.map(p => ({
            description: p.name,
            value: p.path,
          }))
        : [{ description: "-- Not Selected --", value: null }],
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

PackageConfig.defaultProps = {};

type DefaultProps = {};

type Props = {
  value: any,
  onChange(v: any): void,
  packages: Array<Package>,
};

type State = {};
