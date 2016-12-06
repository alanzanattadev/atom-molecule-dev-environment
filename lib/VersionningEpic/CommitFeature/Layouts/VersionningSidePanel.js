'use babel'
// @flow

import React from 'react';
import StashPanel from "../../StashFeature/Presenters/StashPanel";
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
        <StashPanel stashs={[
          {commitId: "aab2329", commitMessage: "Adds authentication for facebook users", branchName: "dev", name: "WIP", index: 0},
          {commitId: "23ddf93", commitMessage: "merge", branchName: "master", name: "WIP", index: 1},
          {commitId: "0923d23", commitMessage: "initial commit", branchName: "master", name: "WIP", index: 2},
        ]}/>
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
