"use babel";
// @flow

import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import DevToolBar from "../Layouts/DevToolBar";
import store from "../../../GlobalSystem/Store";
import { StyleRoot } from 'radium';

export var devtoolBar = document.createElement("div");
devtoolBar.style.overflowY = "visible";
export var devtoolBarPanel = atom.workspace.addBottomPanel({
  item: devtoolBar,
  visible: true,
  priority: 80,
});

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

renderDevtoolBar();
