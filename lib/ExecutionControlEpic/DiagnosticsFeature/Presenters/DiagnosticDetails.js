"use babel";
// @flow

import * as React from "react";
import path from "path";
import styled from "styled-components";
import ansiToHtml from "ansi-to-html";
import type { MoleculeDiagnostic } from "../Types/types";
import type { Range } from "../../LanguageServerProtocolFeature/Types/standard";

const getSeverityColor = (severity: number) => {
  switch (severity) {
    case 1:
      return "red";
    case 2:
      return "yellow";
    case 3:
      return "blue";
    case 5:
      return "green";
    default:
      return "blue";
  }
};

const getSeverityClasses = (severity: any): string => {
  switch (severity) {
    case 3:
      return "diagnostic-color-info-text icon icon-info";
    case 2:
      return "diagnostic-color-warning-text icon icon-alert";
    case 1:
      return "diagnostic-color-error-text icon icon-issue-opened";
    case 5:
      return "diagnostic-color-success-text icon icon-check";
    default:
      return "";
  }
};

const Box = styled.div`
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;
  border-bottom: 1px black solid;
  border-radius: 3px;
  padding: 4px;
`;

const Header = styled.div`
  margin: 0px 4px 4px 4px;
`;

const Content = styled.div`
  display: flex;
  list-style: none;
`;

const Severity = styled.div`
  background-color: ${props => getSeverityColor(props.severity)};
  border-radius: 10px;
  width: 2px;
  margin: 2px 12px 2px 12px;
`;

const Message = styled.div`
  margin-left: 4px;
`;

const Path = styled.span`
  display: inline;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const RangeIndicator = styled.span`
  display: inline;
`;

const SeverityIcon = styled.span`
  height: 16px;
  width: 16px;
`;

export default class DiagnosticDetails extends React.Component<Props, State> {
  state: State;
  props: Props;
  static defaultProps: DefaultProps;
  convert: any;
  defaultRange: any;

  constructor(props: Props) {
    super(props);
    this.convert = new ansiToHtml();
    this.defaultRange = {
      start: { line: 0, character: 0 },
      end: { line: 0, character: 0 },
    };
  }

  convertMessageToHtml(message: string) {
    return this.convert.toHtml(
      message
        .replace(/(?:\r\n|\r|\n)/g, "<br/>")
        .replace(/\t/g, "&nbsp;&nbsp;&nbsp;&nbsp;")
        .replace(/ /g, "&nbsp;"),
    );
  }

  render() {
    const Comp = this.props.view;
    return (
      <Box>
        {Comp ? (
          <Comp {...this.props.diagnostic} jumpToFile={this.props.jumpTo} />
        ) : (
          <div>
            <Header>
              <SeverityIcon
                className={getSeverityClasses(this.props.diagnostic.severity)}
              />
              <Path
                className="text-highlight"
                onClick={e =>
                  this.props.jumpTo(
                    this.props.diagnostic.path || "",
                    this.props.diagnostic.range || this.defaultRange,
                    e.detail === 1,
                  )
                }
              >
                {path.basename(this.props.diagnostic.path || "")}
              </Path>
              {this.props.diagnostic.range &&
              this.props.diagnostic.range.start.line != -1 ? (
                <RangeIndicator className="text-subtle">
                  {`${this.props.diagnostic.range.start.line}:${
                    this.props.diagnostic.range.start.character
                  }`}
                </RangeIndicator>
              ) : (
                false
              )}
            </Header>
            <Content>
              <Severity severity={this.props.diagnostic.severity} />
              <Message
                dangerouslySetInnerHTML={{
                  __html: this.convertMessageToHtml(
                    this.props.diagnostic.message,
                  ),
                }}
              />
            </Content>
          </div>
        )}
      </Box>
    );
  }
}

DiagnosticDetails.defaultProps = {};

type DefaultProps = {};

type Props = {
  view?: React.ComponentType<any>,
  diagnostic: MoleculeDiagnostic,
  jumpTo: (path: string, range: Range, pending: boolean) => void,
};

type State = {};
