'use babel'
// @flow

import { connect } from "react-redux";
import Targets from "../Presenters/Targets";
import type {State} from "../../../GlobalSystem/types.js.flow";
import {selectPinnedTargets} from "../Selectors/TargetConfigs";
import {selectTargetsReducer} from "../../../GlobalSystem/Selectors";
import type {TargetConfig} from "../Types/types.js";

export function mapStateToProps(state: State): {targets: Array<TargetConfig>} {
  return {
    targets: selectPinnedTargets(selectTargetsReducer(state))
  };
};

export function mapDispatchToProps(dispatch: (action: any) => any): {} {
  return {

  };
};

export var Connecter = connect(mapStateToProps, mapDispatchToProps);

export default Connecter(Targets);
