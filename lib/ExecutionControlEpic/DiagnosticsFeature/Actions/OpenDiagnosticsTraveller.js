'use babel'
// @flow

export type OpenDiagnosticsTravellerAction = () => void;
import {renderDiagnosticsPanel, diagnosticsPanelPanel} from "../AtomLinks/Panels";

export function openDiagnosticsTraveller(toolId: string, toolName: string): OpenDiagnosticsTravellerAction {
  return () => {
    renderDiagnosticsPanel(toolId, toolName);
    diagnosticsPanelPanel.show();
  };
};
