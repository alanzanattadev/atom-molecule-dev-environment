'use babel'
// @flow

import { connect } from "react-redux";
import Targets from "../Presenters/Targets";
import type {State} from "../../../GlobalSystem/types.js.flow";
import {selectTargetsReducer} from "../../../GlobalSystem/Selectors";
import {selectTargetsOfTool} from "../Selectors/TargetConfigs";
import {pinTargetConfig} from "../Actions/PinTargetConfig";
import type {TargetConfig} from "../Types/types.js.flow";

export function mapStateToProps(state: State, {toolId}: {toolId: string}): {targets: Array<TargetConfig>} {
  return {
    targets: selectTargetsOfTool(selectTargetsReducer(state), toolId)
  };
};

export function mapDispatchToProps(dispatch: (action: any) => any): {onTargetPin: (target: TargetConfig) => void} {
  return {
    onTargetPin: (target: TargetConfig) => {
      dispatch(pinTargetConfig(target));
    }
  };
};

export var Connecter = connect(mapStateToProps, mapDispatchToProps);

export default Connecter(Targets);
