"use babel";
// @flow

import React from "react";
import type { Diagnostic, DiagnosticType } from "../Types/types.js";
import DiagnosticsSelector from "./DiagnosticsSelector";

export default class DiagnosticsSelectors
  extends React.Component<DefaultProps, Props, State> {
  state: State;
  props: Props;
  static defaultProps: DefaultProps;

  constructor(props: Props) {
    super(props);
  }

  renderDiagnosticsSelectorOfType(
    type: DiagnosticType,
    currentIndex: number,
  ): React.Element<any> | false {
    let diagnosticsOfType = this.props.diagnostics.filter(d => d.type == type);
    return diagnosticsOfType.length > 0
      ? <DiagnosticsSelector
          type={type}
          index={
            type == this.props.diagnosticType ? this.props.diagnosticIndex : 0
          }
          of={diagnosticsOfType.length}
          onClick={() => this.props.onSelected(type, 0)}
          onBack={() =>
            this.props.onSelected(
              type,
              currentIndex > 0
                ? currentIndex - 1
                : diagnosticsOfType.length - 1,
            )}
          onForward={() =>
            this.props.onSelected(
              type,
              (currentIndex + 1) % diagnosticsOfType.length,
            )}
          selected={this.props.diagnosticType == type}
        />
      : false;
  }

  render() {
    return (
      <div style={{ display: "inline-flex" }}>
        {this.renderDiagnosticsSelectorOfType(
          "warning",
          this.props.diagnosticIndex,
        )}
        {this.renderDiagnosticsSelectorOfType(
          "error",
          this.props.diagnosticIndex,
        )}
        {this.renderDiagnosticsSelectorOfType(
          "success",
          this.props.diagnosticIndex,
        )}
        {this.renderDiagnosticsSelectorOfType(
          "info",
          this.props.diagnosticIndex,
        )}
      </div>
    );
  }
}

DiagnosticsSelectors.defaultProps = {};

type DefaultProps = {};

type Props = {
  diagnostics: Array<Diagnostic>,
  diagnosticType: DiagnosticType,
  diagnosticIndex: number,
  onSelected(type: DiagnosticType, index: number): void,
};

type State = {};
