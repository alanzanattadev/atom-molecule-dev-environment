'use babel'
// @flow

import React from 'react';
import type {DevTool as DevToolType} from "../Types/types.js.flow";
import DevTool from "./DevTool";

export default class DevTools extends React.Component<DefaultProps, Props, State> {

  state: State;
  props: Props;
  static defaultProps: DefaultProps;

  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <ul style={{display: 'flex', flexDirection: 'row', paddingLeft: '0px', margin: '5px 5px'}}>
        {this.props.tools.map(tool => (
          <li key={tool.id} style={{listStyle: 'none', margin: '0px 5px'}}>
            <DevTool iconUri={tool.iconUri} onClick={() => this.props.onClick(tool)}/>
          </li>
        ))}
      </ul>
    )
  }
}

DevTools.propTypes = {

};

DevTools.defaultProps = {

};

type DefaultProps = {

};

type Props = {
  onClick(devtool: DevToolType): void,
  tools: Array<DevToolType>,
};

type State = {

};
