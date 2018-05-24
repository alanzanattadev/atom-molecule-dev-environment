"use babel";
// @flow

import { connect } from "react-redux";
import DevToolsWithDiagnostics from "../Presenters/DevToolsWithDiagnostics";
import type { DevToolWithDiagnostics as DevToolWithDiagnosticsType } from "../Types/types";
import {
  selectDevtoolsReducer,
  selectDiagnosticsReducer,
  selectPackagesReducer,
  selectPlansReducer,
  selectTasksReducer,
} from "../../../GlobalSystem/Selectors";
import { selectDevtools } from "../Selectors/DevToolsInfo";
import type { State } from "../../../GlobalSystem/types";
import { openPlanConfigurer } from "../../PlanConfigurationFeature/Actions/OpenPlanConfigurer";
import {
  selectPertinentTaskID,
  selectStateOfPlan,
  selectStateOfTool,
  selectTaskOfID,
  selectTasksOfPlan,
  selectTasksOfTool,
} from "../../TaskExecutionFeature/Selectors/Tasks";
import { List, Map } from "immutable";
import { selectPlansOfTool } from "../../PlanConfigurationFeature/Selectors/PlanConfigs";
import { selectDiagnosticsOfTask } from "../../DiagnosticsFeature/Selectors/Diagnostics";
import type { DiagnosticSeverity } from "../../DiagnosticsFeature/Types/types";
import { openDiagnosticsTraveller } from "../../DiagnosticsFeature/Actions/OpenDiagnosticsTraveller";
import { selectPackagesOfTool } from "../../../ProjectSystemEpic/PackageFeature/Selectors/Packages";
import ColorHash from "color-hash";
import ExecutionsController from "../../LanguageServerProtocolFeature/Model/ExecutionsController";
import { compose } from "recompose";

export function mapStateToProps(
  state: State,
): { tools: Map<string, DevToolWithDiagnosticsType> } {
  const tools = selectDevtools(selectDevtoolsReducer(state)).filter(devtool => {
    const hasPackages = selectPackagesOfTool(
      selectPackagesReducer(state),
      devtool.id,
    );
    return hasPackages.size > 0;
  });
  const toolsWithDiagnostics = tools
    .map((devtool, devtoolIndex) => {
      const plans = selectPlansOfTool(
        selectPlansReducer(state),
        devtool.id,
      ).filter(plan => {
        return selectTasksOfPlan(selectTasksReducer(state), plan).size > 0;
      });

      if (plans.size > 1) {
        return plans.map((plan, planIndex) => {
          const taskID = selectPertinentTaskID(
            selectTasksOfPlan(selectTasksReducer(state), plan),
          );

          const diagnostics = taskID
            ? selectDiagnosticsOfTask(selectDiagnosticsReducer(state), taskID)
            : Map();

          const execution = taskID && ExecutionsController.getExecution(taskID);
          const notifier = execution ? execution.broker : null;

          return {
            ...devtool,
            state: selectStateOfPlan(selectTasksReducer(state), plan),
            info: diagnostics
              .toList()
              .reduce(
                (red, cur) =>
                  cur.get(3) ? red.concat(cur.get(3).toList()) : red,
                List(),
              )
              .count(),
            warnings: diagnostics
              .toList()
              .reduce(
                (red, cur) =>
                  cur.get(2) ? red.concat(cur.get(2).toList()) : red,
                List(),
              )
              .count(),
            errors: diagnostics
              .toList()
              .reduce(
                (red, cur) =>
                  cur.get(1) ? red.concat(cur.get(1).toList()) : red,
                List(),
              )
              .count(),
            successes: diagnostics
              .toList()
              .reduce(
                (red, cur) =>
                  cur.get(5) ? red.concat(cur.get(5).toList()) : red,
                List(),
              )
              .count(),
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
          ? selectDiagnosticsOfTask(selectDiagnosticsReducer(state), taskID)
          : Map();

        const execution = taskID && ExecutionsController.getExecution(taskID);
        const notifier = execution ? execution.broker : null;
        return [
          {
            ...devtool,
            state: selectStateOfTool(selectTasksReducer(state), devtool.id),
            info: diagnostics
              .toList()
              .reduce(
                (red, cur) =>
                  cur.get(3) ? red.concat(cur.get(3).toList()) : red,
                List(),
              )
              .count(),
            warnings: diagnostics
              .toList()
              .reduce(
                (red, cur) =>
                  cur.get(2) ? red.concat(cur.get(2).toList()) : red,
                List(),
              )
              .count(),
            errors: diagnostics
              .toList()
              .reduce(
                (red, cur) =>
                  cur.get(1) ? red.concat(cur.get(1).toList()) : red,
                List(),
              )
              .count(),
            successes: diagnostics
              .toList()
              .reduce(
                (red, cur) =>
                  cur.get(5) ? red.concat(cur.get(5).toList()) : red,
                List(),
              )
              .count(),
            busy: task && task.busy,
            plan: plans.get(0),
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
    severity: DiagnosticSeverity,
  ): void,
  onToolLogsClick(devtool: DevToolWithDiagnosticsType): void,
  onToolSettingsClick(devtool: DevToolWithDiagnosticsType): void,
  //onToolConsoleClick(): void,
} {
  return {
    onToolSettingsClick: (devtool: DevToolWithDiagnosticsType) => {
      dispatch(openPlanConfigurer(devtool));
    },
    onToolLogsClick: (devtool: DevToolWithDiagnosticsType) => {
      devtool.plan != null
        ? dispatch(
            openDiagnosticsTraveller(
              devtool.id,
              devtool.name,
              devtool.defaultDiagnosticsMode,
              devtool.plan,
            ),
          )
        : dispatch(openPlanConfigurer(devtool));
    },
    onToolDiagnosticsClick: (
      devtool: DevToolWithDiagnosticsType,
      // eslint-disable-next-line no-unused-vars
      severity: DiagnosticSeverity,
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
