"use babel";
// @flow

import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import DiagnosticsPanel from "../Layouts/DiagnosticsPanel";
import store from "../../../GlobalSystem/Store";
import { StyleRoot } from "radium";
import type { DiagnosticMode } from "../Types/types.js.flow";

let panes = {};

function getDiagnosticPanelURI(toolId: string): string {
  return `atom://diagnostics-${toolId}`;
}

export function renderDiagnosticsPanel(
  toolId: string,
  toolName: string,
  defaultDiagnosticsMode: DiagnosticMode,
): void {
  const mountingPoint = document.createElement("div");
  mountingPoint.style.alignItems = "stretch";
  mountingPoint.style.flex = "1";
  mountingPoint.style.height = "100%";
  mountingPoint.className = "flex";
  ReactDOM.render(
    <Provider store={store}>
      <StyleRoot style={{ display: "flex", alignItems: "stretch", flex: "1" }}>
        <DiagnosticsPanel
          toolId={toolId}
          toolName={toolName}
          diagnosticsMode={defaultDiagnosticsMode}
        />
      </StyleRoot>
    </Provider>,
    mountingPoint,
  );
  if (panes[getDiagnosticPanelURI(toolId)] == null) {
    const paneItem = {
      element: mountingPoint,
      getTitle() {
        return `Diagnostics: ${toolName}`;
      },
      getDefaultLocation() {
        return "bottom";
      },
      getURI() {
        return getDiagnosticPanelURI(toolId);
      },
    };
    panes[getDiagnosticPanelURI(toolId)] = paneItem;
    global.atom.workspace.open(paneItem);
  } else {
    global.atom.workspace.open(panes[getDiagnosticPanelURI(toolId)]);
  }
}
