"use babel";
// @flow

import type { Package } from "../../../ProjectSystemEpic/PackageFeature/Types/types.js.flow";
import PlanConfigPart from "./PlanConfigPart";
import { compose, mapProps } from "recompose";
import { List } from "immutable";

const enhance = compose(
  mapProps(
    ({
      packages = List(),
      value,
      name,
      onChange,
    }: {
      packages: List<Package>,
      name: string,
      value: string,
      onChange: (v: string) => void,
    }) => ({
      type: "enum",
      label: "package",
      name,
      enum:
        packages !== null && packages.size > 0
          ? packages.map(p => ({
              description: p.name,
              value: p.path,
            }))
          : [{ description: "-- Not Selected --", value: null }],
      value,
      onChange,
    }),
  ),
);

export default enhance(PlanConfigPart);
