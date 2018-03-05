"use babel";
// @flow

import type { Package } from "../../../ProjectSystemEpic/PackageFeature/Types/types";
import PlanConfigPart from "./PlanConfigPart";
import { compose, lifecycle, mapProps } from "recompose";
import { List } from "immutable";
// $FlowFixMe
import { FormElement } from "react-forms-state";

const enhance = compose(
  FormElement(),
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
      elementName,
    }: {
      label: string,
      files: List<Package>,
      value: string,
      onChange: (v: string) => void,
      elementName: string,
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
      elementName,
    }),
  ),
);

export default enhance(PlanConfigPart);
