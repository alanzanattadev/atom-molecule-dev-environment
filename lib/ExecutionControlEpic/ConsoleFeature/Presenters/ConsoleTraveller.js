"use babel";
// @flow

import * as React from "react";
import styled from "styled-components";
import type { ConsoleLogsReducer } from "../Reducers/ConsoleLogs";
import LogItem from "./LogItem";

const ColumnTitle = styled.th`
  padding: 0.7em;
  font-size: 14px;

  &:nth-child(1) {
    width: 15%;
    padding-left: 2em;
  }

  &:nth-child(2) {
    width: 10%;
  }

  &:nth-child(3) {
    width: 45%;
  }

  &:nth-child(4) {
    width: 20%;
  }

  &:nth-child(5) {
    width: 10%;
  }
`;

const Table = styled.table`
  width: 100%;
  justify-content: start;
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

const Body = styled.tbody`
  display: flex;
  flex: 1 1 0;
  flex-direction: column;
  align-items: stretch;
  overflow: auto;
`;

export default class ConsoleTraveller extends React.Component<Props, State> {
  state: State;
  props: Props;
  static defaultProps: DefaultProps;

  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <Table>
        <Body>
          {this.props.logs &&
            this.props.logs
              .toList()
              .map(elem => (
                <LogItem
                  key={`${elem.date || ""}-${elem.message || ""}`}
                  log={elem}
                />
              ))}
        </Body>
      </Table>
    );
  }
}

ConsoleTraveller.defaultProps = {};

type DefaultProps = {};

type Props = {
  logs: ConsoleLogsReducer,
};

type State = {};
