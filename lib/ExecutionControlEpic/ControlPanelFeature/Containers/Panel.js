"use babel";
// @flow

import { connect } from "react-redux";
import { compose, withState, withProps, lifecycle } from "recompose";
import type { State } from "../../../GlobalSystem/types.js.flow";
import Panel from "../Presenters/Panel";
import type { DisplayParams } from "../Types/types";
import { runTask } from "../../TaskExecutionFeature/Actions/RunTask";
import type { PlanConfig } from "../../PlanConfigurationFeature/Types/types.js.flow";
import { unpinPlanConfig } from "../../PlanConfigurationFeature/Actions/UnpinPlanConfig";
import { pinPlanConfig } from "../../PlanConfigurationFeature/Actions/PinPlanConfig";
import { removePlanConfig } from "../../PlanConfigurationFeature/Actions/RemovePlanConfig";
import { openPlanConfigurer } from "../../PlanConfigurationFeature/Actions/OpenPlanConfigurer";
import { getPackagePanelsFromState } from "../Model/Factory";
import type { Range } from "../../LanguageServerProtocolFeature/Types/standard";
import {
  ExecutionSelector,
  DiagnosticsSelector,
  TaskChangeHandler,
  PertinentTaskSelector,
  TaskState,
} from "../../DiagnosticsFeature/Containers/ToolDiagnosticsTraveller";
import { jumpTo } from "../../DiagnosticsFeature/Actions/JumpTo";
import { killTask } from "../../TaskExecutionFeature/Actions/KillTask";
import ExecutionsController from "../../LanguageServerProtocolFeature/Model/ExecutionsController";
import { splitControlPanel } from "../Actions/SplitControlPanel";
import type { DevTool } from "../../DevToolsSummaryFeature/Types/types.js.flow";

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
