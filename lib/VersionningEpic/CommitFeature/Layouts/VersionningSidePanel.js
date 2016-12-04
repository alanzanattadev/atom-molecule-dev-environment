'use babel'
// @flow

import React from 'react';
import CommitPanel from "../Presenters/CommitPanel";
import StashPanel from "../../StashFeature/Presenters/StashPanel";

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
        <CommitPanel files={[
          {path: './lib/', status: 'modified'},
          {path: '.gitignore', status: 'modified'},
          {path: './tests', status: 'added'},
          {path: '.flowconfig', status: 'added'},
          {path: 'package.json', status: 'modified'},
          {path: 'npm-debug.log', status: 'removed'},
        ]}/>
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
