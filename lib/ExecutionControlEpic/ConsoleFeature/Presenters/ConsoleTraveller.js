"use babel";
// @flow

import * as React from "react";
import styled from "styled-components";
import type { ConsoleLogsReducer } from "../Reducers/ConsoleLogs";
import LogItem from "./LogItem";

const Flow = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  flex: 1 1 0;
  align-items: stretch;
  overflow: auto;
  padding: 0px;
`;

const Detail = styled.li`
  display: flex;
  flex: 0 0 auto;
  align-items: stretch;
  flex-direction: column;
  padding: 0px;
`;

export default class ConsoleTraveller extends React.Component<Props, State> {
  state: State;
  props: Props;
  static defaultProps: DefaultProps;
  contain: HTMLElement;
  list: HTMLElement;
  isDown: boolean;

  constructor(props: Props) {
    super(props);
  }

  componentDidMount() {
    if (this.contain) this.isDown = true;
    this._scroll();
  }

  componentWillUpdate() {
    if (this.contain) this.isDown = this.isScrolledDown();
  }

  componentDidUpdate() {
    this._scroll();
  }

  isScrolledDown() {
    return (
      this.contain.scrollTop + this.contain.clientHeight ==
      this.contain.scrollHeight
    );
  }

  _scroll() {
    if (this.contain && this.isDown) {
      this.contain.scrollTop =
        this.contain.scrollHeight - this.contain.clientHeight;
    }
  }

  render() {
    return (
      <Flow
        innerRef={ref => {
          this.contain = ref;
        }}
      >
        {this.props.logs &&
          this.props.logs.toList().map((elem, i) => (
            <Detail
              key={i}
              innerRef={e => {
                i == elem.size - 1 ? (this.list = e) : null;
              }}
            >
              <LogItem
                key={`${elem.date || ""}-${elem.message || ""}`}
                log={elem}
              />
            </Detail>
          ))}
      </Flow>
    );
  }
}

ConsoleTraveller.defaultProps = {};

type DefaultProps = {};

type Props = {
  logs: ConsoleLogsReducer,
};

type State = {};
