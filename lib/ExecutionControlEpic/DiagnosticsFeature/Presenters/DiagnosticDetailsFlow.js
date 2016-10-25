'use babel'
// @flow

import React from 'react';
import type {Diagnostic} from "../Types/types.js.flow";
import DiagnosticDetails from "./DiagnosticDetails";

export default class DiagnosticDetailsFlow extends React.Component<DefaultProps, Props, State> {

  state: State;
  props: Props;
  static defaultProps: DefaultProps;

  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <ul style={{listStyle: 'none'}}>
        {this.props.diagnostics.map((diagnostic, i) => (
          <li key={i}>
            <DiagnosticDetails message={diagnostic.message}/>
          </li>
        ))}
      </ul>
    )
  }
}

DiagnosticDetailsFlow.propTypes = {

};

DiagnosticDetailsFlow.defaultProps = {

};

type DefaultProps = {

};

type Props = {
  diagnostics: Array<Diagnostic>
};

type State = {

};
