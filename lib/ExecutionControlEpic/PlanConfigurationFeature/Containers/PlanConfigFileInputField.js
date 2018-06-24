"use babel";
// @flow

import { connect } from "react-redux";
import PlanConfigFileInputField from "../Presenters/PlanConfigFileInputField";
import type { State } from "../../../GlobalSystem/types";
import { selectPackagesReducer } from "../../../GlobalSystem/Selectors";
import { selectPackagesOfTool } from "../../../ProjectSystemEpic/PackageFeature/Selectors/Packages";
import { refreshAllProjectsPackages } from "../../../ProjectSystemEpic/PackageFeature/Actions/RefreshAllProjectsPackages";

export function mapStateToProps(
  state: State,
  { label }: { label: string },
): {} {
  return {
    files: selectPackagesOfTool(selectPackagesReducer(state), label),
  };
}

export function mapDispatchToProps(
  dispatch: (action: any) => any,
  ownProps,
): {
  dispatchRefreshPackages(): void,
} {
  return {
    dispatchRefreshPackages: () => {
      const plugins = [
        {
          tool: { name: ownProps.label, id: ownProps.label, iconUri: "" },
          isPackage: ownProps.tester,
        },
      ];
      dispatch(refreshAllProjectsPackages(plugins));
    },
  };
}

export var Connecter = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default Connecter(PlanConfigFileInputField);
