"use babel";
// @flow

import { connect } from "react-redux";
import DevTools from "../Presenters/DevTools";
import type { DevTool } from "../Types/types.js.flow";
import {
  selectDevtoolsReducer,
  selectTasksReducer,
} from "../../../GlobalSystem/Selectors";
import { selectDevtools } from "../Selectors/DevToolsInfos";
import type { State } from "../../../GlobalSystem/types.js.flow";
import { openPlanConfigurer } from "../../PlanConfigurationFeature/Actions/OpenPlanConfigurer";
import { selectStateOfTool } from "../../TaskExecutionFeature/Selectors/Tasks";
import { fromJS } from "immutable";

export function mapStateToProps(state: State): { tools: Array<DevTool> } {
  return {
    tools: selectDevtools(selectDevtoolsReducer(state)).map(devtool =>
      fromJS(devtool)
        .set("state", selectStateOfTool(selectTasksReducer(state), devtool.id))
        .toJS(),
    ),
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
