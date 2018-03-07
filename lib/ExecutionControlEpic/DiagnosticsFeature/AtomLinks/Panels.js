"use babel";
// @flow

import * as React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "../../../GlobalSystem/Store";
import { StyleRoot } from "radium";
import ToolDiagnosticsTraveller from "../Containers/ToolDiagnosticsTraveller";
import type { DiagnosticMode } from "../Types/types";
import type { PlanConfig } from "../../PlanConfigurationFeature/Types/types";

let panes = {};

function getDiagnosticPanelURI(toolId: string, planName?: string): string {
  return `atom://diagnostics-${toolId}${
    planName !== undefined ? `-${planName}` : ""
  }`;
}

export function renderDiagnosticsPanel(
  toolId: string,
  toolName: string,
  defaultDiagnosticsMode: DiagnosticMode,
  plan: PlanConfig,
): void {
  const mountingPoint = document.createElement("div");
  mountingPoint.style.alignItems = "stretch";
  mountingPoint.style.flex = "1";
  mountingPoint.style.height = "100%";
  mountingPoint.className = "flex";
  ReactDOM.render(
    <Provider store={store}>
      <StyleRoot style={{ display: "flex", alignItems: "stretch", flex: "1" }}>
        <ToolDiagnosticsTraveller
          toolId={toolId}
          toolName={toolName}
          diagnosticsMode={defaultDiagnosticsMode}
          plan={plan}
        />
      </StyleRoot>
    </Provider>,
    mountingPoint,
  );
  const planName = typeof plan !== "undefined" ? plan.name : undefined;
  if (panes[getDiagnosticPanelURI(toolId, planName)] == null) {
    const paneItem = {
      element: mountingPoint,
      getTitle() {
        return `Diagnostics: ${toolName}${
          planName !== undefined ? ` - ${planName}` : ""
        }`;
      },
      getDefaultLocation() {
        return "bottom";
      },
      getURI() {
        return getDiagnosticPanelURI(toolId, planName);
      },
    };
    panes[getDiagnosticPanelURI(toolId, planName)] = paneItem;
    global.atom.workspace.open(paneItem);
  } else {
    global.atom.workspace.open(panes[getDiagnosticPanelURI(toolId, planName)]);
  }
}
