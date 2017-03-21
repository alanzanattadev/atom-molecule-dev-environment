"use babel";
// @flow

import React from "react";
import DiagnosticsTraveller from "./DiagnosticsTraveller";
import ToolName from "./ToolName";
import type { Diagnostic, DiagnosticMode, DiagnosticLocation } from "../Types/types.js.flow";
import CloseButton from "./CloseButton";
import type { Task } from "../../TaskExecutionFeature/Types/types.js.flow";
import PlansWithTasks
  from "../../TaskExecutionFeature/Presenters/PlansWithTasks";
import type {
  PlanConfig
} from "../../PlanConfigurationFeature/Types/types.js.flow";

export default class ToolDiagnostics
  extends React.Component<DefaultProps, Props, State> {
  state: State;
  props: Props;
  static defaultProps: DefaultProps;

  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <div
        style={{
          position: "relative",
          minHeight: "300px",
          display: "flex",
          alignitems: "stretch",
          flex: "1"
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            zIndex: "2"
          }}
        >
          <CloseButton onClick={this.props.onClose} />
        </div>
        <div style={{ position: "absolute", left: "100px", zIndex: "2" }}>
          <ToolName>{this.props.toolName}</ToolName>
        </div>
        <div
          style={{
            marginTop: "20px",
            display: "flex",
            flexDirection: "column",
            alignitems: "center",
            flex: "1"
          }}
        >
          <PlansWithTasks
            onPlanClick={this.props.onPlanClick}
            onTaskClick={this.props.onTaskClick}
            plansWithTasks={this.props.plansWithTasks}
          />
          <DiagnosticsTraveller diagnostics={this.props.diagnostics} mode={this.props.diagnosticsMode} onJumpTo={this.props.onJumpTo} />
        </div>
      </div>
    );
  }
}

ToolDiagnostics.propTypes = {};

ToolDiagnostics.defaultProps = {
  diagnostics: [],
  plansWithTasks: [],
  onJumpTo: () => {},
};

type DefaultProps = {};

type Props = {
  diagnostics: Array<Diagnostic>,
  toolName: string,
  diagnosticsMode?: DiagnosticMode,
  onClose(): void,
  onPlanClick(plan: PlanConfig): void,
  onTaskClick(task: Task): void,
  onJumpTo(location: DiagnosticLocation): void,
  plansWithTasks: Array<{ plan: PlanConfig, tasks: Array<Task> }>
};

type State = {};
