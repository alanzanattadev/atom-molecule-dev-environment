'use babel'
// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import DevToolBar from "../Layouts/DevToolBar";
import store from "../../../GlobalSystem/Store";

export var devtoolBar = document.createElement('div');
devtoolBar.style.overflowY = 'visible';
export var devtoolBarPanel = atom.workspace.addBottomPanel({
  item: devtoolBar,
  visible: false,
  priority: 80
});

export function renderDevtoolBar() {
  ReactDOM.render((
    <Provider store={store}>
      <DevToolBar/>
    </Provider>
  ), devtoolBar);
};
