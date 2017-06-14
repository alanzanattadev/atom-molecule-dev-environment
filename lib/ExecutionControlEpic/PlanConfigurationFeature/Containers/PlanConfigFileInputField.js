"use babel";
// @flow

import { connect } from "react-redux";
import PlanConfigFileInputField from "../Presenters/PlanConfigFileInputField";
import type { State } from "../../../GlobalSystem/types.js.flow";
import { selectPackagesReducer } from "../../../GlobalSystem/Selectors";
import {
  selectPackagesOfTool,
} from "../../../ProjectSystemEpic/PackageFeature/Selectors/Packages";

export function mapStateToProps(state: State, { title }): {} {
  return {
    files: selectPackagesOfTool(selectPackagesReducer(state), title),
  };
}

// eslint-disable-next-line no-unused-vars
export function mapDispatchToProps(dispatch: (action: any) => any): {} {
  return {};
}

export var Connecter = connect(mapStateToProps, mapDispatchToProps);

export default Connecter(PlanConfigFileInputField);
