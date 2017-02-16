"use babel";
// @flow

import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import PlanConfigPanel from "../Layouts/PlanConfigPanel";
import store from "../../../GlobalSystem/Store";
import type { DevToolInfos } from "../Types/types.js";
import PinnedPlanPanel from "../Layouts/PinnedPlanPanel";
import ToolPlansPanel from "../Layouts/ToolPlansPanel";
import { StyleRoot } from "radium";
import { sidePanelPanel } from "../../../GlobalSystem/AtomLinks/Panels";

export var toolPlans = document.createElement("div");
export var toolPlansPanel = atom.workspace.addBottomPanel({
  item: toolPlans,
  visible: false,
  priority: 50
});

export function renderToolPlans(tool: DevToolInfos) {
  ReactDOM.render(
    <Provider store={store}>
      <StyleRoot>
        <ToolPlansPanel
          toolId={tool.id}
          toolName={tool.name}
          toolIconUri={tool.iconUri}
          onClose={() => toolPlansPanel.hide()}
          onPinned={() => pinnedPlansPanel.show()}
        />
      </StyleRoot>
    </Provider>,
    toolPlans
  );
}

export function renderToolConfigurer(rootElem, tool: DevToolInfos) {
  ReactDOM.render(
    <Provider store={store}>
      <StyleRoot>
        <PlanConfigPanel
          toolId={tool.id}
          toolName={tool.name}
          toolIconUri={tool.iconUri}
          onClose={() => sidePanelPanel.hide()}
        />
      </StyleRoot>
    </Provider>,
    rootElem
  );
}

export var pinnedPlans = document.createElement("div");
export var pinnedPlansPanel = atom.workspace.addTopPanel({
  item: pinnedPlans,
  visible: false,
  priority: 200
});

export function renderPinnedPlans() {
  ReactDOM.render(
    <Provider store={store}>
      <StyleRoot>
        <PinnedPlanPanel />
      </StyleRoot>
    </Provider>,
    pinnedPlans
  );
}
