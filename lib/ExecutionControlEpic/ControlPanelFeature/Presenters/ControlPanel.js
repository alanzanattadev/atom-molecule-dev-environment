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
import CheckboxButton from "./CheckboxButton";
import type { ConsoleSourcesReducer } from "../../ConsoleFeature/Reducers/ConsoleSources";

const ControlPanelBox = styled.div`
  z-index: 3;
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
  sources,
  onStartPlan = () => {},
  onStopPlan = () => {},
  onPinPlan = () => {},
  onUnPinPlan = () => {},
  onDeletePlan = () => {},
  onSplit = () => {},
  onTerminalClick = () => {},
  onDiagnosticClick = () => {},
  onNewPlanClick = () => {},
  onConsolePanelClick = () => {},
  onUnifiedDiagnosticsClick = () => {},
  onPackageTerminalClick = () => {},
  onPackageTerminalAdd = () => {},
  onPackageTerminalRemove = () => {},
  onIsChecked = () => {},
  selection,
  isActive = true,
  isLoading = false,
}: {
  packagePanels: List<PackagePanel>,
  sources: ConsoleSourcesReducer,
  onStartPlan: (plan: PlanConfig) => void,
  onStopPlan: (plan: PlanConfig) => void,
  onPinPlan: (plan: PlanConfig) => void,
  onUnPinPlan: (plan: PlanConfig) => void,
  onDeletePlan: (plan: PlanConfig) => void,
  onSplit: (plan: PlanConfig) => void,
  onTerminalClick: (plan: PlanConfig) => void,
  onDiagnosticClick: (plan: PlanConfig) => void,
  onNewPlanClick: (tool: DevTool) => void,
  onConsolePanelClick: () => void,
  onUnifiedDiagnosticsClick: (pkg: string) => void,
  onPackageTerminalClick: (id: string) => void,
  onPackageTerminalAdd: (path: string) => void,
  onPackageTerminalRemove: (id: string) => void,
  onIsChecked: (source: string, status: boolean) => void,
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
            title="Loading packages..."
            controls={() => <span className="loading loading-spinner-tiny" />}
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
              onPackageTerminalClick,
              onPackageTerminalAdd,
              onPackageTerminalRemove,
            }}
          >
            {packagePanel.tools
              .toArray()
              .sort((elem1, elem2) => {
                return elem1.tool.id.localeCompare(elem2.tool.id);
              })
              .map((toolPanel: ToolPanel) => (
                <ToolView
                  key={toolPanel.tool.name}
                  {...{
                    toolPanel,
                    selection,
                    onNewPlanClick,
                  }}
                >
                  {toolPanel.plans
                    .toArray()
                    .sort((elem1, elem2) => {
                      return elem1.plan.name.localeCompare(elem2.plan.name);
                    })
                    .map((planPanel: PlanPanel) => (
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
      {global.atom.config.get("molecule.moleculeConsole") === true ? (
        <Section
          title="Console"
          iconClassName="icon icon-book"
          foldable
          isPackage
        >
          <Section
            title="Logs"
            onTitleClick={() => onConsolePanelClick()}
            selected={selection.mode && selection.mode.type === "console-panel"}
          />
          {sources.size > 0 &&
            sources.toList().map(elem => (
              <Section
                key={elem[0]}
                title={elem[0]}
                controls={() => (
                  <ControlsBox>
                    <CheckboxButton
                      title={elem[0]}
                      status={elem[1]}
                      onChangeClick={onIsChecked}
                    />
                  </ControlsBox>
                )}
              />
            ))}
        </Section>
      ) : (
        ""
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
  onPackageTerminalClick = () => {},
  onPackageTerminalAdd = () => {},
  onPackageTerminalRemove = () => {},
}: {
  children?: Node,
  packagePanel: PackagePanel,
  selection: DisplayParams,
  isLoading: boolean,
  onUnifiedDiagnosticsClick: (pkg: string) => void,
  onPackageTerminalClick: (id: string) => void,
  onPackageTerminalAdd: (path: string) => void,
  onPackageTerminalRemove: (id: string) => void,
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
      {global.atom.config.get("molecule.freeTerminal") === true
        ? packagePanel.terminals.map((terminalIdentifier, i) => (
            <Section
              key={terminalIdentifier.id}
              title={`Terminal ${i + 1}`}
              iconClassName="icon icon-terminal"
              tooltip={`Free Terminal in ${packagePanel.package.name}`}
              onTitleClick={() => onPackageTerminalClick(terminalIdentifier.id)}
              controls={() => (
                <ControlsBox>
                  <TipDeleteButton
                    onClick={() =>
                      onPackageTerminalRemove(terminalIdentifier.id)
                    }
                    tooltip={`Delete terminal`}
                  />
                </ControlsBox>
              )}
              selected={
                selection.mode &&
                selection.mode.type === "free-terminal" &&
                selection.mode.id === terminalIdentifier.id
              }
            />
          ))
        : ""}
      {global.atom.config.get("molecule.freeTerminal") === true ? (
        <Section
          title={`New terminal`}
          iconClassName="icon icon-terminal"
          tooltip={`Create new free terminal in ${packagePanel.package.name}`}
          onTitleClick={() => onPackageTerminalAdd(packagePanel.package.path)}
        />
      ) : (
        ""
      )}
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
        id={toolPanel.tool.name + "NewPlan"}
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
