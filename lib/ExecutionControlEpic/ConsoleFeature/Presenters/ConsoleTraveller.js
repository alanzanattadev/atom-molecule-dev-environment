"use babel";
// @flow

import * as React from "react";
import styled from "styled-components";
import type { ConsoleLogsReducer } from "../Reducers/ConsoleLogs";
import LogItem from "./LogItem";

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
