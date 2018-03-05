"use babel";
// @flow

import { connect } from "react-redux";
import DevTools from "../Presenters/DevTools";
import type { DevTool } from "../Types/types";
import {
  selectDevtoolsReducer,
  selectTasksReducer,
} from "../../../GlobalSystem/Selectors";
import { selectDevtools } from "../Selectors/DevToolsInfo";
import type { State } from "../../../GlobalSystem/types";
import { openPlanConfigurer } from "../../PlanConfigurationFeature/Actions/OpenPlanConfigurer";
import { selectStateOfTool } from "../../TaskExecutionFeature/Selectors/Tasks";
import { Map } from "immutable";

export function mapStateToProps(state: State): { tools: Map<string, DevTool> } {
  return {
    tools: selectDevtools(selectDevtoolsReducer(state)).map(devtool => ({
      ...devtool,
      state: selectStateOfTool(selectTasksReducer(state), devtool.id),
    })),
  };
}

export function mapDispatchToProps(
  dispatch: (action: any) => any,
): { onClick(devtool: DevTool): void } {
  return {
    onClick: (devtool: DevTool) => {
      dispatch(openPlanConfigurer(devtool));
    },
  };
}

export var Connecter = connect(mapStateToProps, mapDispatchToProps);

export default Connecter(DevTools);
