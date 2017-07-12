"use babel";
// @flow

import { connect } from "react-redux";
import PlanConfigFileInputField from "../Presenters/PlanConfigFileInputField";
import type { State } from "../../../GlobalSystem/types.js.flow";
import { selectPackagesReducer } from "../../../GlobalSystem/Selectors";
import {
  selectPackagesOfTool,
} from "../../../ProjectSystemEpic/PackageFeature/Selectors/Packages";
import {
  refreshPackages,
} from "../../../ProjectSystemEpic/PackageFeature/Actions/RefreshPackages";

export function mapStateToProps(state: State, { title }): {} {
  return {
    files: selectPackagesOfTool(selectPackagesReducer(state), title),
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
          tool: { name: ownProps.title, id: ownProps.title, iconUri: "" },
          isPackage: ownProps.tester,
        },
      ];
      dispatch(refreshPackages(global.atom.project.getPaths()[0], plugins));
    },
  };
}

export var Connecter = connect(mapStateToProps, mapDispatchToProps);

export default Connecter(PlanConfigFileInputField);
