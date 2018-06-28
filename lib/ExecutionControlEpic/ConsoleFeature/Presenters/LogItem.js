"use babel";
// @flow

import * as React from "react";
import styled from "styled-components";
import type { ConsoleLog } from "../../LanguageServerProtocolFeature/Types/standard";

const Box = styled.div`
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;
  border-bottom: 1px black solid;
  border-radius: 3px;
  padding: 4px;
  align-items: stretch;
`;

const Header = styled.div`
  margin: 0px 4px 4px 4px;
  display: flex;
  flex: 0 0 auto;
`;

const MessageBox = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 0 0;
  align-items: stretch;
`;

const Message = styled.span`
  display: inline;
  cursor: default;
`;

const Content = styled.div`
  display: flex;
  list-style: none;
  flex: 0 0 auto;
  align-items: stretch;
  flex-direction: row;
`;

const Source = styled.div`
  border-radius: 10px;
  width: 2px;
  margin: 2px 12px 2px 12px;
`;

const SeverityIcon = styled.span`
  height: 16px;
  width: 16px;
  cursor: default;
`;

export default class LogItem extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  severity_class() {
    switch (this.props.log.severity) {
      case 1:
        return "diagnostic-color-error-text icon icon-issue-opened";
      case 2:
        return "diagnostic-color-warning-text icon icon-alert";
      case 3:
        return "diagnostic-color-info-text icon icon-info";
      case 5:
        return "diagnostic-color-success-text icon icon-check";
      default:
        return "";
    }
  }

  render() {
    return (
      <Box>
        <Header>
          <Message
            style={{
              fontWeight: "bold",
            }}
          >
            <SeverityIcon className={this.severity_class()} />
            {`${this.props.log.source}`}
          </Message>
        </Header>
        <Content>
          <Source
            style={{
              backgroundColor: this.props.log.color,
            }}
          />
          <MessageBox>
            <Message className="text-highlight">
              {this.props.log.message}
            </Message>
            <Message className="text-smaller">{`(at ${this.props.log.date ||
              ""}, on v${this.props.log.version})`}</Message>
          </MessageBox>
        </Content>
      </Box>
    );
  }
}

type Props = {
  log: ConsoleLog,
};

type State = {};
