'use babel'
// @flow

import { connect } from "react-redux";
import DevTools from "../Presenters/DevTools";
import type {DevTool} from "../Types/types.js.flow";
import {selectDevtoolsReducer} from "../../../GlobalSystem/Selectors";
import {selectDevtools} from "../Selectors/DevToolsInfos";
import type {State} from "../../../GlobalSystem/types.js.flow";
import {openTargetConfigurer} from "../../TargetConfigurationFeature/Actions/OpenTargetConfigurer";

export function mapStateToProps(state: State): {tools: Array<DevTool>} {
  return {
    tools: selectDevtools(selectDevtoolsReducer(state))
  };
};

export function mapDispatchToProps(dispatch: (action: any) => any): {onClick(devtool: DevTool): void} {
  return {
    onClick: (devtool: DevTool) => {
      dispatch(openTargetConfigurer(devtool));
    }
  }
};

export var Connecter = connect(mapStateToProps, mapDispatchToProps);

export default Connecter(DevTools);
