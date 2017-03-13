"use babel";
// @flow

import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "../../../GlobalSystem/Store";
import { StyleRoot } from "radium";
import VersionningSidePanel from "../Layouts/VersionningSidePanel";

export function renderVersionningPanel(rootElem): void {
  ReactDOM.render(
    <Provider store={store}>
      <StyleRoot style={{ flex: "1", alignItems: "stretch", display: "flex" }}>
        <VersionningSidePanel />
      </StyleRoot>
    </Provider>,
    rootElem
  );
}
