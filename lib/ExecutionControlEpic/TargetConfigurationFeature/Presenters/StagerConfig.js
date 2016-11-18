'use babel'
// @flow

import React from 'react';
import TargetConfigPart from "./TargetConfigPart";
import {SSHConfigSchema, HostConfigSchema} from "../Model/StagerConfigs";

export default class StagerConfig extends React.Component<DefaultProps, Props, State> {

  state: State;
  props: Props;
  static defaultProps: DefaultProps;

  constructor(props: Props) {
    super(props);
  }

  render() {
    let config = {
      type: 'conditional',
      expression: {
        type: 'enum',
        default: 'integrated',
        enum: [
          {value: 'integrated', description: 'integrated'},
          {value: 'local', description: 'local'},
          {value: 'remote', description: 'remote'},
        ]
      },
      cases: {
        integrated: null,
        local: null,
        remote: {
          type: 'object',
          title: 'connection',
          schemas: {
            host: {
              type: 'object',
              title: 'host',
              schemas: {
                host: {
                  type: 'string',
                  default: '127.0.0.1',
                  title: 'host',
                },
                port: {
                  type: 'number',
                  default: 22,
                  title: 'port'
                }
              }
            },
            method: {
              type: 'conditional',
              expression: {
                type: 'enum',
                default: 'ssh',
                enum: [
                  {value: 'ssh', description: 'ssh'},
                ]
              },
              cases: {
                ssh: SSHConfigSchema,
              },
            },
          },
        },
      }
    };

    return (
      <div>
        <TargetConfigPart {...config} onChange={this.props.onChange} value={this.props.value}/>
      </div>
    )
  }
}

StagerConfig.propTypes = {

};

StagerConfig.defaultProps = {

};

type DefaultProps = {

};

type Props = {
  value: any,
  onChange(v: any): void,
};

type State = {

};
