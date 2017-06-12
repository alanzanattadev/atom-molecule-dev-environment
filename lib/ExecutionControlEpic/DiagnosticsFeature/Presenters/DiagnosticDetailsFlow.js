"use babel";
// @flow

import React from "react";
import type { Diagnostic } from "../Types/types.js.flow";
import DiagnosticDetails from "./DiagnosticDetails";
import { List } from "immutable";

export default class DiagnosticDetailsFlow
  extends React.Component<DefaultProps, Props, State> {
  state: State;
  props: Props;
  static defaultProps: DefaultProps;

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
    if (this.contain && this.isDown && this.list) {
      this.contain.scrollTop =
        this.contain.scrollHeight - this.contain.clientHeight;
    }
  }

  render() {
    return (
      <ul
        style={{ listStyle: "none", overflowY: "auto" }}
        ref={ref => {
          this.contain = ref;
        }}
      >
        {this.props.diagnostics.map((diagnostic, i) => (
          <li
            key={i}
            ref={e => {
              i ==
                (this.props.diagnostics.size || this.props.diagnostics.length) -
                  1
                ? (this.list = e)
                : null;
            }}
          >
            <DiagnosticDetails message={diagnostic.message} />
          </li>
        ))}
      </ul>
    );
  }
}

DiagnosticDetailsFlow.defaultProps = {};

type DefaultProps = {};

type Props = {
  diagnostics: Array<Diagnostic> | List<Diagnostic>,
};

type State = {};
