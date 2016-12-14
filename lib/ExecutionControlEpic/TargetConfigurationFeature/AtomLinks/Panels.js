'use babel'
// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import TargetConfigPanel from "../Layouts/TargetConfigPanel";
import store from "../../../GlobalSystem/Store";
import type {DevToolInfos} from "../Types/types.js";
import PinnedTargetPanel from "../Layouts/PinnedTargetPanel";
import ToolTargetsPanel from '../Layouts/ToolTargetsPanel';
import {StyleRoot} from 'radium';

export var toolTargets = document.createElement('div');
export var toolTargetsPanel = atom.workspace.addBottomPanel({
  item: toolTargets,
  visible: false,
  priority: 50,
});

export function renderToolTargets(tool: DevToolInfos) {
  ReactDOM.render((
    <Provider store={store}>
      <StyleRoot>
        <ToolTargetsPanel toolId={tool.id} toolName={tool.name} toolIconUri={tool.iconUri} onClose={() => toolConfigurerPanel.hide()}/>
      </StyleRoot>
    </Provider>
  ), toolTargets);
};

export function renderToolConfigurer(rootElem, tool: DevToolInfos) {
  ReactDOM.render((
    <Provider store={store}>
      <StyleRoot>
        <TargetConfigPanel toolId={tool.id} toolName={tool.name} toolIconUri={tool.iconUri} onClose={() => toolConfigurerPanel.hide()}/>
      </StyleRoot>
    </Provider>
  ), rootElem);
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
      <StyleRoot>
        <PinnedTargetPanel/>
      </StyleRoot>
    </Provider>
  ), pinnedTargets);
};
