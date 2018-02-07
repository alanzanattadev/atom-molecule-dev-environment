"use babel";
// @flow

import * as React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import PlanConfigPanel from "../Layouts/PlanConfigPanel";
import store from "../../../GlobalSystem/Store";
import type { DevToolInfo } from "../Types/types.js.flow";
import PinnedPlanPanel from "../Layouts/PinnedPlanPanel";
import ToolPlansPanel from "../Layouts/ToolPlansPanel";
import { StyleRoot } from "radium";
declare var atom: any;

export var pinnedPlans = document.createElement("div");
export var pinnedPlansPanel = atom.workspace.addTopPanel({
  item: pinnedPlans,
  visible: false,
  priority: 200,
});

export function renderPinnedPlans() {
  ReactDOM.render(
    <Provider store={store}>
      <StyleRoot>
        <PinnedPlanPanel hidePinnedPanel={() => pinnedPlansPanel.hide()} />
      </StyleRoot>
    </Provider>,
    pinnedPlans,
  );
}

export var toolPlans = document.createElement("div");
export var toolPlansPanel = atom.workspace.addBottomPanel({
  item: toolPlans,
  visible: false,
  priority: 50,
});

export function renderToolPlans(tool: DevToolInfo) {
  ReactDOM.render(
    <Provider store={store}>
      <StyleRoot>
        <ToolPlansPanel
          toolId={tool.id}
          toolName={tool.name}
          toolIconUri={tool.iconUri}
          onClose={() => toolPlansPanel.hide()}
          onPinned={() => pinnedPlansPanel.show()}
          hidePinnedPanel={() => pinnedPlansPanel.hide()}
        />
      </StyleRoot>
    </Provider>,
    toolPlans,
  );
}

const mountingPoint = document.createElement("div");
mountingPoint.style.alignItems = "stretch";
mountingPoint.style.flex = "1";
mountingPoint.style.height = "100%";
mountingPoint.className = "flex";

const paneItemURI = "plan-config-panel";

const paneItem = {
  element: mountingPoint,
  getTitle() {
    return `Plan configuration`;
  },
  getDefaultLocation() {
    return "right";
  },
  getURI() {
    return paneItemURI;
  },
};

export function renderToolConfigurer(
  rootElem: HTMLDivElement,
  tool: DevToolInfo,
) {
  ReactDOM.render(
    <Provider store={store}>
      <StyleRoot style={{ display: "flex", alignItems: "stretch", flex: "1" }}>
        <PlanConfigPanel
          toolId={tool.id}
          toolName={tool.name}
          toolIconUri={tool.iconUri}
          toolDominantColor={tool.dominantColor}
          toolUri={tool.uri}
        />
      </StyleRoot>
    </Provider>,
    mountingPoint,
  );
  global.atom.workspace.open(paneItem);
  global.atom.workspace.onDidDestroyPaneItem(event => {
    if (event.item.getURI() === paneItemURI) {
      ReactDOM.unmountComponentAtNode(mountingPoint);
    }
  });
}
