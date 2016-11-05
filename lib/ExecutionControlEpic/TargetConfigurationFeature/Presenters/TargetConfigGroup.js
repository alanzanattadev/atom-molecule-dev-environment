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

    this.state = {expanded: false}
  }

  render() {
    return (
      <div style={{display: 'flex', flexDirection: 'column', backgroundColor: '#21252c', padding: '10px', alignItems: 'stretch'}}>
        <div style={{display: 'flex', padding: '10px', justifyContent: 'space-between'}} onClick={() => this.setState({expanded: !this.state.expanded})}>
          <span style={{color: '#fdfffc', fontSize: '13px'}}>config > {this.props.title}</span>
          <img src="arrow-right.svg" style={{height: '15px', width: '15px', transform: this.state.expanded ? 'rotate(90deg)' : '', transition: '0.2s transform'}}/>
        </div>
        {
          this.state.expanded ?
          <div style={{display: 'flex', flexDirection: 'column'}}>
            {Object.keys(this.props.schemas).map(key => (
              <TargetConfigPart
                // $FlowFixMe
                {...this.props.schemas[key]}
                key={key}
                onChange={value => this.props.onChange(Object.assign({}, this.props.value, {[key]: value}))}
                value={this.props.value[key]}
              />
            ))}
          </div> : false
        }
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
  title: string,
  onChange(value: any): void,
  value: any,
};

type State = {
  expanded: boolean
};
