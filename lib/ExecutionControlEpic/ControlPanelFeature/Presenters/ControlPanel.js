"use babel";
// @flow

import React from "react";
import styled from "styled-components";
import Section from "./Section";
import { List } from "immutable";
import type { PackagePanel } from "../Types/types";
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
import type { DisplayParams } from "../Types/types";

const ControlPanelBox = styled.div`
  padding: 0px;
  margin: 0px;
  width: 300px;
  overflow: auto;
  display: flex;
  flex: 1 0 0;
  flex-direction: column;
  align-items: stretch;
`;

const ToolIcon = styled.img`
  height: 25px;
  width: 25px;
  display: flex;
  align-items: center;
  margin: 8px 12px 2px 0px;
  background-color: white;
  border-radius: 50%;
  padding: 4px;
`;

const ControlsBox = styled.div`
  display: flex;
  margin: 4px;
`;

function PlanControls({
  onSplit,
  onPin,
  onUnPin,
  onStart,
  onStop,
  state,
  pinned = false,
}: {
  onSplit: () => void,
  onPin: () => void,
  onUnPin: () => void,
  onStart: () => void,
  onStop: () => void,
  state: TaskState,
  pinned?: boolean,
}) {
  return (
    <ControlsBox>
      <SplitButton onClick={onSplit} />
      {pinned ? (
        <UnpinButton onClick={onUnPin} />
      ) : (
        <PinButton onClick={onPin} />
      )}
      {state === "running" ? (
        <StopButton onClick={onStop} />
      ) : (
        <StartButton onClick={onStart} />
      )}
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
  onTerminalClick = () => {},
  onDiagnosticClick = () => {},
  onSplit = () => {},
  onNewPlanClick = () => {},
  selection,
}: {
  packagePanels: List<PackagePanel>,
  onStartPlan: (plan: PlanConfig) => void,
  onStopPlan: (plan: PlanConfig) => void,
  onPinPlan: (plan: PlanConfig) => void,
  onUnPinPlan: (plan: PlanConfig) => void,
  onTerminalClick: (plan: PlanConfig) => void,
  onDiagnosticClick: (plan: PlanConfig) => void,
  onSplit: (plan: PlanConfig) => void,
  onNewPlanClick: (tool: DevTool) => void,
  selection: DisplayParams,
}) {
  return (
    <ControlPanelBox className="tool-panel-background-color">
      {packagePanels.map(packagePanel => (
        <Section
          key={packagePanel.package.path}
          title={packagePanel.package.name}
          foldable
        >
          {packagePanel.tools.toArray().map(toolPanel => (
            <Section
              key={toolPanel.tool.name}
              title={toolPanel.tool.name}
              icon={() => <ToolIcon src={toolPanel.tool.iconUri} />}
              controls={() => <ToolControls />}
              color={toolPanel.tool.dominantColor}
            >
              {toolPanel.plans.toArray().map(planPanel => (
                <Section
                  key={planPanel.plan.id}
                  title={planPanel.plan.name}
                  icon={() => (
                    <RunningStateIndicator
                      state={
                        planPanel.tasks.find(task => task.state === "running")
                          ? "running"
                          : "stopped"
                      }
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
                        onSplit={() => onSplit(planPanel.plan)}
                        state={pertinentTask ? pertinentTask.state : null}
                        pinned={planPanel.plan.pinned}
                      />
                    );
                  }}
                >
                  {planPanel.tasks.find(
                    task =>
                      task.state === "running" &&
                      task.strategy.type === "terminal",
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
                    />
                  )}
                </Section>
              ))}
              <Section
                title={
                  <span>
                    <span className="icon icon-plus" />New plan
                  </span>
                }
                onTitleClick={() => onNewPlanClick(toolPanel.tool)}
                selected={
                  selection.mode &&
                  selection.mode.type === "plan-config" &&
                  selection.mode.tool.id === toolPanel.tool.id
                }
              />
            </Section>
          ))}
        </Section>
      ))}
    </ControlPanelBox>
  );
}
