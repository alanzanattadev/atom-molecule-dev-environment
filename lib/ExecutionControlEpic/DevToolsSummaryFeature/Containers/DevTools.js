'use babel'
// @flow

import { connect } from "react-redux";
import DevTools from "../Presenters/DevTools";
import type {DevTool} from "../Types/types.js.flow";
import {selectDevtoolsReducer, selectTasksReducer} from "../../../GlobalSystem/Selectors";
import {selectDevtools} from "../Selectors/DevToolsInfos";
import type {State} from "../../../GlobalSystem/types.js.flow";
import {openTargetConfigurer} from "../../TargetConfigurationFeature/Actions/OpenTargetConfigurer";
import {selectStateOfTool} from "../../TaskExecutionFeature/Selectors/Tasks";
import { fromJS } from "immutable";

export function mapStateToProps(state: State): {tools: Array<DevTool>} {
  return {
    tools: selectDevtools(selectDevtoolsReducer(state)).map(devtool => fromJS(devtool).set('state', selectStateOfTool(selectTasksReducer(state), devtool.id)).toJS())
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
