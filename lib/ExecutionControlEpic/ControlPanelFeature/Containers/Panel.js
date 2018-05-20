"use babel";
// @flow

import { Map } from "immutable";
import { connect } from "react-redux";
import { compose, withState, withProps, lifecycle } from "recompose";
import { splitControlPanel } from "../Actions/SplitControlPanel";
import Panel from "../Presenters/Panel";
import { getPackagePanelsFromState } from "../Model/Factory";
import type { DisplayParams } from "../Types/types";
import {
  selectDiagnosticsReducer,
  selectTasksReducer,
  selectPlansReducer,
} from "../../../GlobalSystem/Selectors";
import type { State } from "../../../GlobalSystem/types.js.flow";
import { runTask } from "../../TaskExecutionFeature/Actions/RunTask";
import { killTask } from "../../TaskExecutionFeature/Actions/KillTask";
import {
  selectPertinentTaskID,
  selectTasksOfPlan,
} from "../../TaskExecutionFeature/Selectors/Tasks";
import type { Task } from "../../TaskExecutionFeature/Types/types";
import { unpinPlanConfig } from "../../PlanConfigurationFeature/Actions/UnpinPlanConfig";
import { pinPlanConfig } from "../../PlanConfigurationFeature/Actions/PinPlanConfig";
import { removePlanConfig } from "../../PlanConfigurationFeature/Actions/RemovePlanConfig";
import { openPlanConfigurer } from "../../PlanConfigurationFeature/Actions/OpenPlanConfigurer";
import { selectAllPlans } from "../../PlanConfigurationFeature/Selectors/PlanConfigs";
import type { PlanConfig } from "../../PlanConfigurationFeature/Types/types.js.flow";
import ExecutionsController from "../../LanguageServerProtocolFeature/Model/ExecutionsController";
import type { Range } from "../../LanguageServerProtocolFeature/Types/standard";
import { jumpTo } from "../../DiagnosticsFeature/Actions/JumpTo";
import { selectDiagnosticsOfTask } from "../../DiagnosticsFeature/Selectors/Diagnostics";
import type { DevTool } from "../../DevToolsSummaryFeature/Types/types.js.flow";

const selectPertinentTaskIDForPanel = (
  state,
  toolId: string,
  plan: PlanConfig,
) => {
  if (plan === undefined) return "";
  return selectPertinentTaskID(
    selectTasksOfPlan(selectTasksReducer(state), plan),
  );
};

const TaskState = withState(
  "selectedTaskId",
  "setSelectedTaskId",
  ({
    state,
    toolId,
    plan,
  }: {
    state: State,
    toolId: string,
    plan: PlanConfig,
  }) =>
    selectPertinentTaskIDForPanel(state, plan ? plan.tool.id : toolId, plan),
);

const PertinentTaskSelector = lifecycle({
  componentWillReceiveProps(nextProps) {
    let prevPertinentTaskID = selectPertinentTaskIDForPanel(
      this.props.state,
      this.props.toolId,
      this.props.plan,
    );
    let nextPertinentTaskID = selectPertinentTaskIDForPanel(
      nextProps.state,
      nextProps.toolId,
      nextProps.plan,
    );
    if (prevPertinentTaskID != nextPertinentTaskID) {
      this.props.setSelectedTaskId(nextPertinentTaskID);
    }
  },
});

const DiagnosticsSelector = withProps(
  ({ state, selectedTaskId, selection }) => {
    return {
      diagnostics:
        selection.mode && selection.mode.type === "unified-diagnostics"
          ? selectAllPlans(selectPlansReducer(state)).reduce(
              (acc, cur) =>
                cur.packageInfo.path.startsWith(selection.mode.pkg)
                  ? acc.mergeDeep(
                      selectTasksOfPlan(selectTasksReducer(state), cur).reduce(
                        (map, task) =>
                          map.mergeDeep(
                            selectDiagnosticsOfTask(
                              selectDiagnosticsReducer(state),
                              task.id,
                            ),
                          ),
                        Map(),
                      ),
                    )
                  : acc,
              Map(),
            )
          : selectDiagnosticsOfTask(
              selectDiagnosticsReducer(state),
              selectedTaskId,
            ),
    };
  },
);

const ExecutionSelector = withProps(({ getExecution, selectedTaskId }) => {
  const execution = getExecution(selectedTaskId);
  return {
    xtermInstance:
      execution != null && execution.task.strategy.type === "terminal"
        ? execution.terminal
        : undefined,
  };
});

const TaskChangeHandler = withProps(({ setSelectedTaskId }) => ({
  onTaskClick: (task: Task) => setSelectedTaskId(task.id),
}));

export default compose(
  withState("selection", "setSelection", (): DisplayParams => ({
    plan: null,
    mode: null,
  })),
  lifecycle({
    componentDidMount() {
      if (this.props.defaultPlan) {
        this.props.setSelection({
          mode: { type: "diagnostics" },
          plan: this.props.defaultPlan,
        });
      }
    },
  }),
  withProps(({ selection }) => ({
    plan: selection.plan,
    getExecution: selectedTask =>
      ExecutionsController.getExecution(selectedTask),
  })),
  connect(
    (state: State) => ({
      packagePanels: getPackagePanelsFromState(state),
      isLoading: state.loadingProgress.ongoingPackageRefreshCount !== 0,
      state,
    }),
    dispatch => ({
      onStartPlan: (plan: PlanConfig) => {
        dispatch(runTask(plan, { type: "local" }));
      },
      onStopPlan: (plan: PlanConfig) => {
        dispatch(killTask(plan));
      },
      onPinPlan: (plan: PlanConfig) => {
        dispatch(pinPlanConfig(plan));
      },
      onUnPinPlan: (plan: PlanConfig) => {
        dispatch(unpinPlanConfig(plan));
      },
      onDeletePlan: (plan: PlanConfig) => {
        dispatch(removePlanConfig(plan));
      },
      onSplit: (plan: PlanConfig) => {
        dispatch(splitControlPanel(plan));
      },
      onNewPlan: devtool => {
        dispatch(openPlanConfigurer(devtool));
      },
      onJumpTo: (path: string, range: Range, pending: boolean) => {
        dispatch(jumpTo(path, range, pending));
      },
    }),
  ),
  TaskState,
  PertinentTaskSelector,
  ExecutionSelector,
  DiagnosticsSelector,
  TaskChangeHandler,
  withProps(
    ({ xtermInstance, diagnostics, tasks, setSelection, selection }) => ({
      onTerminalClick: (plan: PlanConfig) => {
        setSelection({
          plan,
          mode: {
            type: "terminal",
          },
        });
      },
      onDiagnosticClick: (plan: PlanConfig) => {
        setSelection({
          plan,
          mode: {
            type: "diagnostics",
          },
        });
      },
      onNewPlanClick: (devtool: DevTool) => {
        setSelection({
          plan: null,
          mode: {
            type: "plan-config",
            tool: devtool,
          },
        });
      },
      onUnifiedDiagnosticsClick: (pkg: string) => {
        setSelection({
          plan: null,
          mode: { type: "unified-diagnostics", pkg },
        });
      },
      selection: {
        ...selection,
        mode: {
          ...selection.mode,
          xtermInstance,
          diagnostics,
          tasks,
        },
      },
    }),
  ),
)(Panel);
