'use babel'
// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import store from "../Store";
import {StyleRoot} from 'radium';
import SideDock from "../Layouts/SideDock";

export var sideDock = document.createElement('div');
sideDock.style.display = 'flex';
sideDock.style.alignItems = 'stretch';
sideDock.style.flex = '1';
sideDock.style.zIndex = '3';
export var sideDockPanel = atom.workspace.addRightPanel({
  item: sideDock,
  visible: true,
  priority: 60
});

export function renderSideDock(): void {
  ReactDOM.render((
    <Provider store={store}>
      <StyleRoot style={{flex: '1', alignItems: 'stretch', display: 'flex'}}>
        <SideDock/>
      </StyleRoot>
    </Provider>
  ), sideDock);
};
