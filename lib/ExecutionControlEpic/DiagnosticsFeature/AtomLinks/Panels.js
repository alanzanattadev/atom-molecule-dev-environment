'use babel';
// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import DiagnosticsPanel from '../Layouts/DiagnosticsPanel';
import store from '../../../GlobalSystem/Store';
import { StyleRoot } from 'radium';
import type {DiagnosticMode} from '../Types/types.js.flow'

export var diagnosticsPanel = document.createElement('div');
export var diagnosticsPanelPanel = atom.workspace.addBottomPanel({
  item: diagnosticsPanel,
  visible: false,
  priority: 60,
});

export function renderDiagnosticsPanel(toolId: string, toolName: string, defaultDiagnosticsMode: DiagnosticMode): void {
  ReactDOM.render(
    <Provider store={store}>
      <StyleRoot>
        <DiagnosticsPanel
          onClose={() => diagnosticsPanelPanel.hide()}
          toolId={toolId}
          toolName={toolName}
          diagnosticsMode={defaultDiagnosticsMode}
        />
      </StyleRoot>
    </Provider>,
    diagnosticsPanel,
  );
}
