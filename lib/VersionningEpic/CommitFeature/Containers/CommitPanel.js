'use babel'
// @flow

import { connect } from "react-redux";
import {commit} from "../Actions/Commit";
import type {File} from "../Types/types.js.flow";
import type {State} from "../../../GlobalSystem/types.js.flow";
import CommitPanelContainer from "../Presenters/CommitPanelContainer";
import {getStatus} from "../Actions/GetStatus";


export function mapStateToProps(state: State): {} {
  return {
    files: state.gitIndex,
  };
};

export function mapDispatchToProps(dispatch: (action: any) => any): {} {
  return {
    onCommit(message: string, files: Array<File>) {
      dispatch(commit(message, files));
    },
    onStatus(): void {
      dispatch(getStatus());
    },
  };
};

export var Connecter = connect(mapStateToProps, mapDispatchToProps);

export default Connecter(CommitPanelContainer);
