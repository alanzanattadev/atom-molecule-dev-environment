"use babel";
// @flow

import * as React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import DevToolBar from "../Layouts/DevToolBar";
import store from "../../../GlobalSystem/Store";
import { StyleRoot } from "radium";

export var devtoolBar = document.createElement("div");
devtoolBar.style.overflowY = "visible";

export function renderDevtoolBar() {
  ReactDOM.render(
    <Provider store={store}>
      <StyleRoot>
        <DevToolBar />
      </StyleRoot>
    </Provider>,
    devtoolBar,
  );
}

export var devtoolBarPanel = global.atom.workspace.addBottomPanel({
  item: devtoolBar,
  visible: true,
  priority: 9999,
});
