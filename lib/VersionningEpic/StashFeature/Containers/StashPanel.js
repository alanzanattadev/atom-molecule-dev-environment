'use babel'
// @flow

import { connect } from "react-redux";
import StashPanelContainer from "../Presenters/StashPanelContainer";
import type {State} from "../../../GlobalSystem/types.js";
import {stashPop} from "../Actions/StashPop";
import {stashList} from "../Actions/StashList";
import type {PackageInfos} from '../../../ProjectSystemEpic/PackageFeature/Types/types.js.flow';
import {stash} from "../Actions/Stash";

export function mapStateToProps(state: State): {} {
  return {
    stashes: state.stashes
  };
};

export function mapDispatchToProps(dispatch: (action: any) => any, ownProps: {currentPackage: PackageInfos}): {} {
  return {
    onStash() {
      dispatch(stash(ownProps.currentPackage));
    },
    onStashPop() {
      dispatch(stashPop(ownProps.currentPackage));
    },
    onStashList() {
      if (ownProps.currentPackage)
        dispatch(stashList(ownProps.currentPackage));
    }
  };
};

export var Connecter = connect(mapStateToProps, mapDispatchToProps);

export default Connecter(StashPanelContainer);
