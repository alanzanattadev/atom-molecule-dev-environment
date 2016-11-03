'use babel'
// @flow

import React from 'react';
import type {DiagnosticType} from "../../DiagnosticsFeature/Types/types.js.flow";
import type {DevToolWithDiagnostics as DevToolWithDiagnosticsType} from "../Types/types.js.flow";
import DevToolWithDiagnostics from "./DevToolWithDiagnostics";

export default class DevToolsWithDiagnostics extends React.Component<DefaultProps, Props, State> {

  state: State;
  props: Props;
  static defaultProps: DefaultProps;

  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <ul style={{display: 'flex', flex: '1', flexDirection: 'row', paddingLeft: '0px', margin: '5px 0px', overflow: 'auto'}}>
        {this.props.tools.map(tool => (
          <li key={tool.id} style={{listStyle: 'none', margin: '0px 5px'}}>
            <DevToolWithDiagnostics
              iconUri={tool.iconUri}
              name={tool.name}
              errors={tool.errors}
              warnings={tool.warnings}
              successes={tool.successes}
              infos={tool.infos}
              onLogsClick={() => this.props.onToolLogsClick(tool)}
              onDiagnosticClick={type => this.props.onToolDiagnosticsClick(tool, type)}
              onSettingsClick={() => this.props.onToolSettingsClick(tool)}
            />
          </li>
        ))}
      </ul>
    )
  }
}

DevToolsWithDiagnostics.propTypes = {

};

DevToolsWithDiagnostics.defaultProps = {

};

type DefaultProps = {

};

type Props = {
  tools: Array<DevToolWithDiagnosticsType>,
  onToolDiagnosticsClick(devtool: DevToolWithDiagnosticsType, type: DiagnosticType): void,
  onToolLogsClick(devtool: DevToolWithDiagnosticsType): void,
  onToolSettingsClick(devtool: DevToolWithDiagnosticsType): void
};

type State = {

};
