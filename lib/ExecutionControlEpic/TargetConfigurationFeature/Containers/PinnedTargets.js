'use babel'
// @flow

import { connect } from "react-redux";
import Targets from "../Presenters/Targets";
import type {State} from "../../../GlobalSystem/types.js.flow";
import {selectPinnedTargets} from "../Selectors/TargetConfigs";
import {selectTargetsReducer, selectTasksReducer} from "../../../GlobalSystem/Selectors";
import type {TargetConfig} from "../Types/types.js";
import {selectStateOfTarget} from "../../TaskExecutionFeature/Selectors/Tasks";
import { fromJS } from "immutable";

export function mapStateToProps(state: State): {targets: Array<TargetConfig>} {
  return {
    targets: selectPinnedTargets(selectTargetsReducer(state)).map(target => fromJS(target).set('state', selectStateOfTarget(selectTasksReducer(state), {config: target.config, tool: target.tool})).toJS())
  };
};

export function mapDispatchToProps(dispatch: (action: any) => any): {} {
  return {

  };
};

export var Connecter = connect(mapStateToProps, mapDispatchToProps);

export default Connecter(Targets);
