"use babel";
// @flow

import { connect } from "react-redux";
import { commit } from "../Actions/Commit";
import type { File } from "../Types/types.js.flow";
import type { State } from "../../../GlobalSystem/types.js.flow";
import CommitPanelContainer from "../Presenters/CommitPanelContainer";
import { getStatus } from "../Actions/GetStatus";
import type {
  PackageInfos
} from "../../../ProjectSystemEpic/PackageFeature/Types/types.js.flow";

export function mapStateToProps(state: State): {} {
  return {
    files: state.gitIndex
  };
}

export function mapDispatchToProps(
  dispatch: (action: any) => any,
  ownProps: { currentPackage: PackageInfos }
): {} {
  return {
    onCommit(message: string, files: Array<File>) {
      dispatch(commit(message, files, ownProps.currentPackage));
    },
    onStatus(): void {
      if (ownProps.currentPackage) {
        console.log(ownProps.currentPackage);
        dispatch(getStatus(ownProps.currentPackage));
      }
    }
  };
}

export var Connecter = connect(mapStateToProps, mapDispatchToProps);

export default Connecter(CommitPanelContainer);
