'use babel'
// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import TargetConfigPanel from "../Layouts/TargetConfigPanel";
import store from "../../../GlobalSystem/Store";
import type {DevToolInfos} from "../Types/types.js";
import PinnedTargetPanel from "../Layouts/PinnedTargetPanel";

export var toolConfigurer = document.createElement('div');
export var toolConfigurerPanel = atom.workspace.addBottomPanel({
  item: toolConfigurer,
  visible: false
});

export function renderToolConfigurer(tool: DevToolInfos) {
  ReactDOM.render((
    <Provider store={store}>
      <TargetConfigPanel toolId={tool.id} toolName={tool.name} toolIconUri={tool.iconUri}/>
    </Provider>
  ), toolConfigurer);
};

export var pinnedTargets = document.createElement('div');
export var pinnedTargetsPanel = atom.workspace.addTopPanel({
  item: pinnedTargets,
  visible: false,
  priority: 200
});

export function renderPinnedTargets() {
  ReactDOM.render((
    <Provider store={store}>
      <PinnedTargetPanel/>
    </Provider>
  ), pinnedTargets);
};
