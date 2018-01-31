"use babel";
// @flow

import type { Package } from "../../../ProjectSystemEpic/PackageFeature/Types/types.js.flow";
import PlanConfigPart from "./PlanConfigPart";
import { compose, mapProps } from "recompose";

const enhance = compose(
  mapProps(
    ({
      packages = [],
      value,
      elementName,
      onChange,
    }: {
      packages: Array<Package>,
      elementName: string,
      value: string,
      onChange: (v: string) => void,
    }) => ({
      type: "enum",
      label: "package",
      elementName: elementName,
      enum:
        packages !== null && packages.length > 0
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
