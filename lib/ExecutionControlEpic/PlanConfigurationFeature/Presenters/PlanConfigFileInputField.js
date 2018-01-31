"use babel";
// @flow

import type { Package } from "../../../ProjectSystemEpic/PackageFeature/Types/types.js.flow";
import PlanConfigPart from "./PlanConfigPart";
import { compose, lifecycle, mapProps } from "recompose";
import { List } from "immutable";
// $FlowFixMe
import { StateProxy } from "react-forms-state";

const enhance = compose(
  StateProxy(),
  lifecycle({
    componentDidMount() {
      this.props.dispatchRefreshPackages();
    },
  }),
  mapProps(
    ({
      label,
      files = List(),
      value,
      onChange,
    }: {
      label: string,
      files: List<Package>,
      value: string,
      onChange: (v: string) => void,
    }) => ({
      type: "enum",
      label,
      enum:
        files && files.size > 0
          ? [
              { description: "-- Not Selected --", value: null },
              ...files.map(p => ({
                description: p.name,
                value: p.path,
              })),
            ]
          : [{ description: "-- Not Selected --", value: null }],
      value,
      onChange,
    }),
  ),
);

export default enhance(PlanConfigPart);
