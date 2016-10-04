'use babel'
// @flow

import React from 'react';
import type {ConfigSchemaPart} from '../../../types';
import TargetConfigPart from './TargetConfigPart';

export default class TargetConfigGroup extends React.Component<DefaultProps, Props, State> {

  props: Props;
  state: State;
  static defaultProps: DefaultProps;

  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <div>
        {Object.keys(this.props.schemas).map(key => (
          <TargetConfigPart
            {...this.props.schemas[key]}
            key={key}
            onChange={value => this.props.onChange(Object.assign({}, this.props.value, {[key]: value}))}
            value={this.props.value[key]}
          />
        ))}
      </div>
    )
  }
}

TargetConfigGroup.propTypes = {

};

TargetConfigGroup.defaultProps = {

};

type DefaultProps = {

};

type Props = {
  schemas: {[key: string]: ConfigSchemaPart},
  onChange(value: any): void,
  value: any,
};

type State = {

};
