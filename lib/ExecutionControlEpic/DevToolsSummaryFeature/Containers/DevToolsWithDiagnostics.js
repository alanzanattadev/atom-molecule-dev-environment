"use babel";
// @flow

import { connect } from "react-redux";
import DevToolsWithDiagnostics from "../Presenters/DevToolsWithDiagnostics";
import type { DevToolWithDiagnostics as DevToolWithDiagnosticsType } from "../Types/types.js.flow";
import {
  selectDevtoolsReducer,
  selectDiagnosticsReducer,
  selectPlansReducer,
  selectTasksReducer,
} from "../../../GlobalSystem/Selectors";
import { selectDevtools } from "../Selectors/DevToolsInfos";
import type { State } from "../../../GlobalSystem/types.js.flow";
import { openPlanConfigurer } from "../../PlanConfigurationFeature/Actions/OpenPlanConfigurer";
import {
  selectPertinentTaskID,
  selectStateOfPlan,
  selectStateOfTool,
  selectTasksOfPlan,
  selectTasksOfTool,
  selectTaskOfID,
} from "../../TaskExecutionFeature/Selectors/Tasks";
import { List } from "immutable";
import { selectPlansOfTool } from "../../PlanConfigurationFeature/Selectors/PlanConfigs";
import {
  selectDiagnosticsOfTask,
  selectLastDiagnostics,
} from "../../DiagnosticsFeature/Selectors/Diagnostics";
import type { DiagnosticType } from "../../DiagnosticsFeature/Types/types.js.flow";
import { openDiagnosticsTraveller } from "../../DiagnosticsFeature/Actions/OpenDiagnosticsTraveller";
import { selectPackagesReducer } from "../../../GlobalSystem/Selectors";
import { selectPackagesOfTool } from "../../../ProjectSystemEpic/PackageFeature/Selectors/Packages";
import ColorHash from "color-hash";
import ExecutionsController from "../../LanguageServerProtocolFeature/Model/ExecutionsController";
import { compose } from "recompose";

export function mapStateToProps(
  state: State,
): { tools: Array<DevToolWithDiagnosticsType> } {
  const tools = selectDevtools(selectDevtoolsReducer(state)).filter(devtool => {
    const hasPackages = selectPackagesOfTool(
      selectPackagesReducer(state),
      devtool.id,
    );
    return hasPackages.length > 0;
  });
  const toolsWithDiagnostics = tools
    .map((devtool, devtoolIndex) => {
      const plans = selectPlansOfTool(
        selectPlansReducer(state),
        devtool.id,
      ).filter(plan => {
        return selectTasksOfPlan(selectTasksReducer(state), plan).length > 0;
      });

      if (plans.length > 1) {
        return plans.map((plan, planIndex) => {
          const taskID = selectPertinentTaskID(
            selectTasksOfPlan(selectTasksReducer(state), plan),
          );

          const diagnostics = taskID
            ? selectLastDiagnostics(
                selectDiagnosticsOfTask(
                  selectDiagnosticsReducer(state),
                  taskID,
                ),
              )
            : List();

          const execution = taskID && ExecutionsController.getExecution(taskID);
          const notifier = execution ? execution.broker : null;

          return {
            ...devtool,
            state: selectStateOfPlan(selectTasksReducer(state), plan),
            infos: diagnostics.filter(d => d.type == "info").count(),
            warnings: diagnostics.filter(d => d.type == "warning").count(),
            errors: diagnostics.filter(d => d.type == "error").count(),
            successes: diagnostics.filter(d => d.type == "success").count(),
            planColor: new ColorHash({ lightness: 0.75, saturation: 1 }).hex(
              plan.name,
            ),
            plan: plan,
            busy: selectTaskOfID(selectTasksReducer(state), taskID).busy,
            legend: plan.name,
            index: devtoolIndex + planIndex,
            notifier,
          };
        });
      } else {
        const taskID = selectPertinentTaskID(
          selectTasksOfTool(selectTasksReducer(state), devtool.id),
        );
        const task = selectTaskOfID(selectTasksReducer(state), taskID);

        const diagnostics = taskID
          ? selectLastDiagnostics(
              selectDiagnosticsOfTask(selectDiagnosticsReducer(state), taskID),
            )
          : List();

        const execution = taskID && ExecutionsController.getExecution(taskID);
        const notifier = execution ? execution.broker : null;
        return [
          {
            ...devtool,
            state: selectStateOfTool(selectTasksReducer(state), devtool.id),
            infos: diagnostics.filter(d => d.type == "info").count(),
            warnings: diagnostics.filter(d => d.type == "warning").count(),
            errors: diagnostics.filter(d => d.type == "error").count(),
            successes: diagnostics.filter(d => d.type == "success").count(),
            busy: task && task.busy,
            plan: plans[0],
            notifier,
          },
        ];
      }
    })
    .reduce((red, devtools) => [...red, ...devtools], []);
  return {
    tools: toolsWithDiagnostics,
  };
}

export function mapDispatchToProps(
  dispatch: (action: any) => any,
): {
  onToolDiagnosticsClick(
    devtool: DevToolWithDiagnosticsType,
    type: DiagnosticType,
  ): void,
  onToolLogsClick(devtool: DevToolWithDiagnosticsType): void,
  onToolSettingsClick(devtool: DevToolWithDiagnosticsType): void,
} {
  return {
    onToolSettingsClick: (devtool: DevToolWithDiagnosticsType) => {
      dispatch(openPlanConfigurer(devtool));
    },
    onToolLogsClick: (devtool: DevToolWithDiagnosticsType) => {
      dispatch(
        openDiagnosticsTraveller(
          devtool.id,
          devtool.name,
          devtool.defaultDiagnosticsMode,
          devtool.plan,
        ),
      );
    },
    onToolDiagnosticsClick: (
      devtool: DevToolWithDiagnosticsType,
      // eslint-disable-next-line no-unused-vars
      type: DiagnosticType,
    ) => {
      dispatch(
        openDiagnosticsTraveller(
          devtool.id,
          devtool.name,
          devtool.defaultDiagnosticsMode,
          devtool.plan,
        ),
      );
    },
  };
}

export var Connecter = connect(mapStateToProps, mapDispatchToProps);

export default compose(Connecter)(DevToolsWithDiagnostics);
