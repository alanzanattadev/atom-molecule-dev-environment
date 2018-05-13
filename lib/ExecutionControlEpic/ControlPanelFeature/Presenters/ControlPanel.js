"use babel";
// @flow

import React from "react";
import type { Node } from "react";
import styled from "styled-components";
import path from "path";
import Section, { withTooltip } from "./Section";
import { List } from "immutable";
import type { PackagePanel, PlanPanel, ToolPanel } from "../Types/types";
import PinButton from "./PinButton";
import RunningStateIndicator from "./RunningStateIndicator";
import SplitButton from "./SplitButton";
import StartButton from "./StartButton";
import type { PlanConfig } from "../../PlanConfigurationFeature/Types/types.js.flow";
import { selectPertinentTask } from "../../TaskExecutionFeature/Selectors/Tasks";
import type { DevTool } from "../../DevToolsSummaryFeature/Types/types.js.flow";
import StopButton from "./StopButton";
import type { TaskState } from "../../TaskExecutionFeature/Types/types.js.flow";
import UnpinButton from "./UnpinButton";
import DeleteButton from "./DeleteButton";
import type { DisplayParams } from "../Types/types";

const ControlPanelBox = styled.div`
  z-index: 12;
  padding: 0px;
  margin: 0px;
  width: ${props => (props.isActive ? "300px" : "0px")};
  overflow: auto;
  display: flex;
  flex: 1 0 0;
  flex-direction: column;
  align-items: stretch;
  font-family: system-ui;
  transition: all ease 250ms;
`;

const ToolIcon = styled.img`
  height: 16px;
  width: 16px;
  display: flex;
  align-items: center;
  margin: 2px 6px 2px 0px;
  background-color: white;
  border-radius: 50%;
  padding: 1px;
`;

const ControlsBox = styled.div`
  display: flex;
`;

const TipSplitButton = withTooltip(SplitButton);
const TipPinButton = withTooltip(PinButton);
const TipUnpinButton = withTooltip(UnpinButton);
const TipStartButton = withTooltip(StartButton);
const TipStopButton = withTooltip(StopButton);
const TipDeleteButton = withTooltip(DeleteButton);

function PlanControls({
  onSplit,
  onPin,
  onUnPin,
  onStart,
  onStop,
  onDelete,
  state,
  pinned = false,
  planName,
}: {
  onSplit: () => void,
  onPin: () => void,
  onUnPin: () => void,
  onStart: () => void,
  onStop: () => void,
  onDelete: () => void,
  state: TaskState,
  pinned?: boolean,
  planName: string,
}) {
  return (
    <ControlsBox>
      <TipSplitButton
        onClick={onSplit}
        tooltip={`Split ${planName} in new window`}
      />
      {pinned ? (
        <TipUnpinButton
          onClick={onUnPin}
          tooltip={`Unpin ${planName} from the dock`}
        />
      ) : (
        <TipPinButton onClick={onPin} tooltip={`Pin ${planName} on the dock`} />
      )}
      {state === "running" ? (
        <TipStopButton onClick={onStop} tooltip={`Stop ${planName}`} />
      ) : (
        <TipStartButton onClick={onStart} tooltip={`Run ${planName}`} />
      )}
      <TipDeleteButton
        onClick={onDelete}
        tooltip={`Delete ${planName}`}
        isActive={!(state === "running")}
      />
    </ControlsBox>
  );
}

function ToolControls() {
  return <ControlsBox />;
}

export default function ControlPanel({
  packagePanels = List(),
  onStartPlan = () => {},
  onStopPlan = () => {},
  onPinPlan = () => {},
  onUnPinPlan = () => {},
  onDeletePlan = () => {},
  onSplit = () => {},
  onTerminalClick = () => {},
  onDiagnosticClick = () => {},
  onNewPlanClick = () => {},
  onUnifiedDiagnosticsClick = () => {},
  selection,
  isActive = true,
  isLoading = false,
}: {
  packagePanels: List<PackagePanel>,
  onStartPlan: (plan: PlanConfig) => void,
  onStopPlan: (plan: PlanConfig) => void,
  onPinPlan: (plan: PlanConfig) => void,
  onUnPinPlan: (plan: PlanConfig) => void,
  onDeletePlan: (plan: PlanConfig) => void,
  onSplit: (plan: PlanConfig) => void,
  onTerminalClick: (plan: PlanConfig) => void,
  onDiagnosticClick: (plan: PlanConfig) => void,
  onNewPlanClick: (tool: DevTool) => void,
  onUnifiedDiagnosticsClick: (pkg: string) => void,
  selection: DisplayParams,
  isActive: boolean,
  isLoading: boolean,
}) {
  return (
    <ControlPanelBox
      className="tool-panel-background-color"
      isActive={isActive}
    >
      {packagePanels.isEmpty() ? (
        isLoading ? (
          <Section
            iconClassName="loading loading-spinner-tiny"
            title="Loading packages..."
          />
        ) : (
          <Section title="No package found in this project" />
        )
      ) : (
        packagePanels.map((packagePanel: PackagePanel) => (
          <PackageView
            key={packagePanel.package.path}
            {...{
              packagePanel,
              selection,
              isLoading,
              onUnifiedDiagnosticsClick,
            }}
          >
            {packagePanel.tools.toArray().map((toolPanel: ToolPanel) => (
              <ToolView
                key={toolPanel.tool.name}
                {...{
                  toolPanel,
                  selection,
                  onNewPlanClick,
                }}
              >
                {toolPanel.plans.toArray().map((planPanel: PlanPanel) => (
                  <PlanView
                    key={planPanel.plan.id}
                    {...{
                      planPanel,
                      selection,
                      onStartPlan,
                      onStopPlan,
                      onPinPlan,
                      onUnPinPlan,
                      onDeletePlan,
                      onSplit,
                      onTerminalClick,
                      onDiagnosticClick,
                    }}
                  />
                ))}
              </ToolView>
            ))}
          </PackageView>
        ))
      )}
    </ControlPanelBox>
  );
}

function PackageView({
  children,
  packagePanel,
  selection,
  isLoading,
  onUnifiedDiagnosticsClick = () => {},
}: {
  children?: Node,
  packagePanel: PackagePanel,
  selection: DisplayParams,
  isLoading: boolean,
  onUnifiedDiagnosticsClick: (pkg: string) => void,
}) {
  return (
    <Section
      key={packagePanel.package.path}
      title={packagePanel.package.name}
      iconClassName={`icon icon-${
        path.extname(packagePanel.package.name).length > 0
          ? "file"
          : "file-directory"
      }`}
      controls={() =>
        isLoading ? <span className="loading loading-spinner-tiny" /> : null
      }
      foldable
      isPackage
    >
      <Section
        key={`${packagePanel.package.path}u-d`}
        title={"Unified Diagnostics"}
        iconClassName="icon icon-info"
        tooltip={`Diagnostics view of ${packagePanel.package.name}`}
        onTitleClick={() =>
          onUnifiedDiagnosticsClick(packagePanel.package.path)
        }
        selected={
          selection.mode &&
          selection.mode.type === "unified-diagnostics" &&
          selection.mode.pkg === packagePanel.package.path
        }
      />
      {children}
    </Section>
  );
}

function ToolView({
  children,
  toolPanel,
  selection,
  onNewPlanClick = () => {},
}: {
  children?: Node,
  toolPanel: ToolPanel,
  selection: DisplayParams,
  onNewPlanClick: (tool: DevTool) => void,
}) {
  return (
    <Section
      key={toolPanel.tool.name}
      title={toolPanel.tool.name}
      icon={() => <ToolIcon src={toolPanel.tool.iconUri} />}
      controls={() => <ToolControls />}
      color={toolPanel.tool.dominantColor}
      foldable
    >
      {children}
      <Section
        title="New plan"
        iconClassName="icon icon-plus"
        onTitleClick={() => onNewPlanClick(toolPanel.tool)}
        selected={
          selection.mode &&
          selection.mode.type === "plan-config" &&
          selection.mode.tool.id === toolPanel.tool.id
        }
        tooltip={`Create a new ${toolPanel.tool.name} plan`}
      />
    </Section>
  );
}

function PlanView({
  planPanel,
  selection,
  onStartPlan = () => {},
  onStopPlan = () => {},
  onPinPlan = () => {},
  onUnPinPlan = () => {},
  onDeletePlan = () => {},
  onSplit = () => {},
  onTerminalClick = () => {},
  onDiagnosticClick = () => {},
}: {
  planPanel: PlanPanel,
  selection: DisplayParams,
  onStartPlan: (plan: PlanConfig) => void,
  onStopPlan: (plan: PlanConfig) => void,
  onPinPlan: (plan: PlanConfig) => void,
  onUnPinPlan: (plan: PlanConfig) => void,
  onDeletePlan: (plan: PlanConfig) => void,
  onSplit: (plan: PlanConfig) => void,
  onTerminalClick: (plan: PlanConfig) => void,
  onDiagnosticClick: (plan: PlanConfig) => void,
}) {
  return (
    <Section
      key={planPanel.plan.id}
      title={planPanel.plan.name}
      onTitleClick={
        planPanel.tasks.find(task => task.state === "running")
          ? () => onDiagnosticClick(planPanel.plan)
          : () => onStartPlan(planPanel.plan)
      }
      tooltip={`Run/Diagnostics view of ${planPanel.plan.name}`}
      icon={() => (
        <RunningStateIndicator
          state={
            planPanel.tasks.find(task => task.state === "running")
              ? "running"
              : "stopped"
          }
          busy={planPanel.tasks.find(task => task.busy) ? true : false}
        />
      )}
      controls={() => {
        const pertinentTask = selectPertinentTask(planPanel.tasks);
        return (
          <PlanControls
            onStart={() => onStartPlan(planPanel.plan)}
            onStop={() => onStopPlan(planPanel.plan)}
            onPin={() => onPinPlan(planPanel.plan)}
            onUnPin={() => onUnPinPlan(planPanel.plan)}
            onDelete={() => onDeletePlan(planPanel.plan)}
            onSplit={() => onSplit(planPanel.plan)}
            state={pertinentTask ? pertinentTask.state : null}
            pinned={planPanel.plan.pinned}
            planName={planPanel.plan.name}
          />
        );
      }}
    >
      {planPanel.tasks.find(
        task => task.state === "running" && task.strategy.type === "terminal",
      ) && (
        <Section
          title="Terminal"
          iconClassName="icon icon-terminal"
          onTitleClick={() => onTerminalClick(planPanel.plan)}
          selected={
            selection.plan === planPanel.plan &&
            selection.mode &&
            selection.mode.type === "terminal"
          }
          tooltip={`Terminal view of ${planPanel.plan.name}`}
        />
      )}
      {planPanel.tasks.size > 0 && (
        <Section
          title="Diagnostics"
          iconClassName="icon icon-stop"
          onTitleClick={() => onDiagnosticClick(planPanel.plan)}
          selected={
            selection.plan === planPanel.plan &&
            selection.mode &&
            selection.mode.type === "diagnostics"
          }
          tooltip={`Diagnostics view of ${planPanel.plan.name}`}
        />
      )}
    </Section>
  );
}
