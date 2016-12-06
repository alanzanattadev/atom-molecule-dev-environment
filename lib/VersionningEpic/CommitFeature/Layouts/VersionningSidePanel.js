'use babel'
// @flow

import React from 'react';
import StashPanel from "../../StashFeature/Containers/StashPanel";
import CommitPanel from "../Containers/CommitPanel";

export default class VersionningSidePanel extends React.Component<DefaultProps, Props, State> {

  state: State;
  props: Props;
  static defaultProps: DefaultProps;

  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <div style={{display: 'flex', alignItems: 'strech', width: '350px', flexDirection: 'column'}}>
        <CommitPanel/>
        <StashPanel/>
      </div>
    )
  }
}

VersionningSidePanel.propTypes = {

};

VersionningSidePanel.defaultProps = {

};

type DefaultProps = {

};

type Props = {

};

type State = {

};
