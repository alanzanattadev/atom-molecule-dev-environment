'use babel'
// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import DiagnosticsPanel from "../Layouts/DiagnosticsPanel";
import store from "../../../GlobalSystem/Store";

export var diagnosticsPanel = document.createElement('div');
export var diagnosticsPanelPanel = atom.workspace.addBottomPanel({
  item: diagnosticsPanel,
  visible: false,
  priority: 60
});

export function renderDiagnosticsPanel(toolId: string, toolName: string): void {
  ReactDOM.render((
    <Provider store={store}>
      <DiagnosticsPanel onClose={() => diagnosticsPanelPanel.hide()} toolId={toolId} toolName={toolName}/>
    </Provider>
  ), diagnosticsPanel);
};
