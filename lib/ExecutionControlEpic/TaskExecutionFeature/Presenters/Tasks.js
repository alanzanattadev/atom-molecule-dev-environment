'use babel'
// @flow

import React from 'react';
import Task from "./Task";

export default class Tasks extends React.Component<DefaultProps, Props, State> {

  state: State;
  props: Props;
  static defaultProps: DefaultProps;

  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <div style={{overflow: 'auto', flex: '1', display: 'inline-flex'}}>
        <ul style={{padding: '0px'}}>
          {this.props.tasks.slice(0, this.props.limited ? 5 : undefined).map(task => (
            <li style={{listStyle: 'none', borderBottom: '1px solid #000'}}>
              <Task {...task}/>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

Tasks.propTypes = {

};

Tasks.defaultProps = {
  limited: false,
};

type DefaultProps = {
  limited: boolean,
};

type Props = {
  limited: boolean
};

type State = {

};
