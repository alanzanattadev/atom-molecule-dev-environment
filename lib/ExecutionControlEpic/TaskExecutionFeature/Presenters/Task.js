'use babel'
// @flow

import React from 'react';
import type {TaskState} from "../Types/types.js.flow";
import {getStateColor} from "../../TargetConfigurationFeature/Presenters/Target";
import moment from 'moment';

export default class Task extends React.Component<DefaultProps, Props, State> {

  state: State;
  props: Props;
  static defaultProps: DefaultProps;

  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <div style={{backgroundColor: '#21252C', padding: '10px 15px', display: 'flex', border: '1px solid #000', cursor: this.props.onClick ? 'pointer' : undefined}} onClick={this.props.onClick}>
        <div style={{display: 'inline-flex', justifyContent: 'center', alignItems: 'center'}}>
          <span style={{borderRadius: '50%', height: '30px', width: '30px', backgroundColor: getStateColor(this.props.state)}}/>
        </div>
        <div style={{display: 'flex', marginLeft: '15px', flexDirection: 'column', alignItems: 'stretch', justifyContent: 'center'}}>
          {
            this.props.end ? (
              <div>
                <span style={{fontSize: '16px', color: 'white', whitespace: 'no-wrap'}}>{moment.unix(this.props.end).fromNow()}</span>
                <hr style={{backgroundColor: 'black', height: '1px', margin: '5px 0px'}}/>
              </div>
            ) : false
          }
          <div>
            <span style={{fontSize: '16px', color: 'white', whiteSpace: 'nowrap'}}>{moment.unix(this.props.debut).fromNow()}</span>
          </div>
        </div>
      </div>
    )
  }
}

Task.propTypes = {

};

Task.defaultProps = {

};

type DefaultProps = {

};

type Props = {
  state: TaskState,
  debut: number,
  end: number,
  onClick(): void,
};

type State = {
};
