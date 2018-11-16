"use babel";
// @flow

import * as React from "react";
import styled from "styled-components";
import type { DiagnosticSeverity, MoleculeDiagnostic } from "../Types/types";
import DiagnosticDetails from "../Containers/DiagnosticDetails";
import { List, Map } from "immutable";
import type { Range } from "../../LanguageServerProtocolFeature/Types/standard";
import Message from "../../PlanConfigurationFeature/Presenters/Message";

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

export default class DiagnosticDetailsFlow extends React.Component<
  Props,
  State,
> {
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

  UNSAFE_componentWillUpdate() {
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
    const diagnostics = this.props.diagnostics.reduce(
      (acc, severityMap) =>
        acc.concat(
          severityMap.reduce(
            (acc2, diagnosticsList) => acc2.concat(diagnosticsList),
            List(),
          ),
        ),
      List(),
    );
    if (diagnostics.size === 0) {
      return (
        <Message>
          No diagnostics available, run a tool to get diagnostics
        </Message>
      );
    } else {
      return (
        <Flow
          innerRef={ref => {
            this.contain = ref;
          }}
        >
          {diagnostics.map((diagnostic, i) => (
            <Detail
              key={i}
              innerRef={e => {
                i == diagnostics.size - 1 ? (this.list = e) : null;
              }}
            >
              <DiagnosticDetails
                diagnostic={diagnostic}
                jumpTo={this.props.onJumpTo}
              />
            </Detail>
          ))}
        </Flow>
      );
    }
  }
}

DiagnosticDetailsFlow.defaultProps = {};

type DefaultProps = {};

type Props = {
  diagnostics: Map<string, Map<DiagnosticSeverity, List<MoleculeDiagnostic>>>,
  onJumpTo: (path: string, range: Range, pending: boolean) => void,
};

type State = {};
