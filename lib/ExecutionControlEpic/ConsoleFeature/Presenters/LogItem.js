"use babel";
// @flow

import * as React from "react";
import styled from "styled-components";
import type { ConsoleLog } from "../../LanguageServerProtocolFeature/Types/standard";

const LogCell = styled.td`
  padding: 0.5em;

  &:nth-child(1) {
    padding-left: 2em;
  }
`;

const LogType = styled.span`
  font-weight: bold;
  padding: 0.3em;
  border-radius: 0.2em;
`;

export default class LogItem extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  severity_flag() {
    switch (this.props.log.severity) {
      case 1:
        return <LogType className="background-error">Error</LogType>;
      case 2:
        return <LogType className="background-warning">Warning</LogType>;
      case 3:
        return <LogType className="custom-branch-color">Infos</LogType>;
      case 4:
        return <LogType className="background-highlight">Hint</LogType>;
      case 5:
        return <LogType className="background-success">Success</LogType>;
      default:
        return "";
    }
  }

  render() {
    return (
      <tr className="log-line">
        <LogCell>{`[${this.props.log.source}]`}</LogCell>
        <LogCell>{this.severity_flag()}</LogCell>
        <LogCell className="text-highlight">{this.props.log.message}</LogCell>
        <LogCell className="text-smaller">{`(at ${this.props.log.date ||
          ""}, on v${this.props.log.version})`}</LogCell>
      </tr>
    );
  }
}

type Props = {
  log: ConsoleLog,
};

type State = {};
