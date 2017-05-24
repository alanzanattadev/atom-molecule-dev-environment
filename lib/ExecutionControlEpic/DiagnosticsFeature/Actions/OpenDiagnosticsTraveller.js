"use babel";
// @flow

export type OpenDiagnosticsTravellerAction = () => void;
import { renderDiagnosticsPanel } from "../AtomLinks/Panels";
import type { DiagnosticMode } from "../Types/types.js.flow";

export function openDiagnosticsTraveller(
  toolId: string,
  toolName: string,
  defaultDiagnosticsMode: DiagnosticMode,
): OpenDiagnosticsTravellerAction {
  return () => {
    renderDiagnosticsPanel(toolId, toolName, defaultDiagnosticsMode);
  };
}
