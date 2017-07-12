"use babel";
// @flow

import React from "react";
import type {
  Package,
} from "../../../ProjectSystemEpic/PackageFeature/Types/types.js.flow";
import type { FileConfigSchema } from "../Types/types.js.flow";
import PlanConfigPart from "./PlanConfigPart";

export class PlanConfigFileInputField
  extends React.Component<DefaultProps, Props, State> {
  state: State;
  props: Props;
  static defaultProps: DefaultProps;

  constructor(props: Props) {
    super(props);
  }

  componentDidMount() {
    this.props.dispatchRefreshPackages();
  }

  render() {
    let config = {
      type: "enum",
      label: this.props.title,
      enum: this.props.files && this.props.files.length > 0
        ? [
            { description: "-- Not Selected --", value: null },
            ...this.props.files.map(p => ({
              description: p.name,
              value: p.path,
            })),
          ]
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

PlanConfigFileInputField.defaultProps = {};

type DefaultProps = {};

type Props = {
  value: any,
  title: string,
  files: Array<Package>,
  tester: FileConfigSchema,
  onChange(v: any): void,
  dispatchRefreshPackages(): void,
};

type State = {};

export default PlanConfigFileInputField;
