"use babel";
// @flow

import * as React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import Panel from "../Containers/Panel";
import store from "../../../GlobalSystem/Store";

export function renderControlPanel(): void {
  const mountingPoint = document.createElement("div");
  mountingPoint.style.alignItems = "stretch";
  mountingPoint.style.flex = "1 1 0";
  mountingPoint.style.height = "100%";
  mountingPoint.className = "flex";
  mountingPoint.style.flexDirection = "column";
  ReactDOM.render(
    <Provider store={store}>
      <Panel />
    </Provider>,
    mountingPoint,
  );

  const paneItem = {
    element: mountingPoint,
    getTitle() {
      return `Control Panel`;
    },
    getDefaultLocation() {
      return "bottom";
    },
    getURI() {
      return "control-panel";
    },
  };

  global.atom.workspace.open(paneItem);
}
