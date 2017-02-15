'use babel'
// @flow

import React from 'react';
import PlanConfigPart from "./PlanConfigPart";
import type {ConfigSchemaPart} from "../../../types";
import {getDefault} from "../Model/PlanConfigManipulators";

export default class PlanConfigConditionalGroup extends React.Component<DefaultProps, Props, State> {

  state: State;
  props: Props;
  static defaultProps: DefaultProps;

  constructor(props: Props) {
    super(props);
  }

  getConfigPart() {
    if (this.props.value.expressionValue == null)
      return null;
    let matchingCase = this.props.cases[this.props.value.expressionValue];
    if (matchingCase == null)
      return null;
    else
      // $FlowFixMe
      return <PlanConfigPart {...matchingCase} value={this.props.value.caseValue} onChange={value => this.props.onChange({expressionValue: this.props.value.expressionValue, caseValue: value})}/>
  }

  render() {
    return (
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'stretch', flex: '1 0'}}>
        <PlanConfigPart
          // $FlowFixMe
          {...this.props.expression}
          value={this.props.value.expressionValue}
          // $FlowFixMe
          onChange={value => this.props.onChange({expressionValue: value, caseValue: getDefault(this.props.cases[value] || {})})}/>
        {this.getConfigPart()}
      </div>
    )
  }
}

PlanConfigConditionalGroup.propTypes = {

};

PlanConfigConditionalGroup.defaultProps = {
  onChange: () => {},
  value: {expressionValue: null, caseValue: null}
};

type DefaultProps = {

};

type Props = {
  expression: ConfigSchemaPart,
  cases: {[key: mixed]: ConfigSchemaPart},
  value: {expressionValue: mixed, caseValue: mixed},
  onChange(value: {expressionValue: mixed, caseValue: mixed}): void,
};

type State = {

};
