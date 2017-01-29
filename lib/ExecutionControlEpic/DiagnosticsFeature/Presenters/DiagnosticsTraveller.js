'use babel'
// @flow

import React from 'react';
import DiagnosticDetails from "./DiagnosticDetails";
import DiagnosticDetailsFlow from "./DiagnosticDetailsFlow";
import DiagnosticsSearchField from "./DiagnosticsSearchField";
import DiagnosticsSelectors from "./DiagnosticsSelectors";
import DiagnosticsModeSelector from "./DiagnosticsModeSelector";
import { fromJS } from "immutable";
import type {Diagnostic, DiagnosticType} from "../Types/types.js.flow";

export default class DiagnosticsTraveller extends React.Component<DefaultProps, Props, State> {

  state: State;
  props: Props;
  static defaultProps: DefaultProps;

  constructor(props: Props) {
    super(props);
    this.state = {
      mode: "organized",
      search: '',
      traveller: {
        index: 0,
        type: props.diagnostics.length > 0 ? props.diagnostics[0].type : 'error'
      },
    };
  }

  toggleMode() {
    this.setState(fromJS(this.state).set('mode', this.state.mode == 'organized' ? 'logs' : 'organized').toJS());
  }

  changeSearch(value: string) {
    this.setState(fromJS(this.state).set('search', value).set(['traveller', 'index'], 0).toJS());
  }

  selectDiagnostic(type: DiagnosticType, index: number) {
    this.setState(fromJS(this.state).set('traveller', {
      index,
      type
    }).toJS());
  }

  getSearchedDiagnostics(diagnostics: Array<Diagnostic>, search: string): Array<Diagnostic> {
    return this.state.search == '' ? diagnostics : diagnostics.filter(diagnostic => diagnostic.message.indexOf(search) != -1);
  }

  getSelectedDiagnostics(diagnostics: Array<Diagnostic>, type: DiagnosticType): Array<Diagnostic> {
    return this.props.diagnostics.filter(diagnostic => diagnostic.type == type);
  }

  getFilteredDiagnostics(diagnostics: Array<Diagnostic>, type: DiagnosticType, search: string): Array<Diagnostic> {
    return this.getSelectedDiagnostics(this.getSearchedDiagnostics(diagnostics, search), type);
  }

  getSelectedDiagnostic() {
    let diagnostics = this.getFilteredDiagnostics(this.props.diagnostics, this.state.traveller.type, this.state.search);
    if (diagnostics.length > 0)
      return diagnostics[this.state.traveller.index];
    else
      return {};
  }

  render() {
    return (
      <div style={{display: 'flex', alignItems: 'center', flexDirection: 'column', height: '405px'}}>
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '10px'}}>
          {
            this.state.mode == "organized" ?
              <DiagnosticsSelectors
                diagnostics={this.getSearchedDiagnostics(this.props.diagnostics, this.state.search)}
                onSelected={this.selectDiagnostic.bind(this)}
                diagnosticType={this.state.traveller.type}
                diagnosticIndex={this.state.traveller.index}
              /> :
              false
          }
          <DiagnosticsModeSelector onClick={() => this.toggleMode()} type={this.state.mode}/>
          <DiagnosticsSearchField value={this.state.search} onChange={value => this.changeSearch(value)}/>
        </div>
        <div style={{display: 'flex', overflow: 'auto', alignItems: 'center', margin: '10px', flexDirection: 'column'}}>
          {
            this.state.mode == "organized" ?
            <DiagnosticDetails message={this.getSelectedDiagnostic().message}/> :
            <DiagnosticDetailsFlow diagnostics={this.getSearchedDiagnostics(this.props.diagnostics, this.state.search)}/>
          }
        </div>
      </div>
    )
  }
}

DiagnosticsTraveller.propTypes = {

};

DiagnosticsTraveller.defaultProps = {
  diagnostics: []
};

type DefaultProps = {

};

type Props = {
  diagnostics: Array<Diagnostic>
};

type State = {
  mode: "organized",
  search: string,
  traveller: {
    index: number,
    type: DiagnosticType
  }
} | {
  mode: 'logs',
  search: string,
};
