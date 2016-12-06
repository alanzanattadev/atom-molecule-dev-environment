'use babel'
// @flow

import { connect } from "react-redux";
import StashPanelContainer from "../Presenters/StashPanelContainer";
import type {State} from "../../../GlobalSystem/types.js";
import {stashPop} from "../Actions/StashPop";
import {stashList} from "../Actions/StashList";
import {stash} from "../Actions/Stash";

export function mapStateToProps(state: State): {} {
  return {
    stashes: state.stashes
  };
};

export function mapDispatchToProps(dispatch: (action: any) => any): {} {
  return {
    onStash() {
      dispatch(stash());
    },
    onStashPop() {
      dispatch(stashPop());
    },
    onStashList() {
      dispatch(stashList());
    }
  };
};

export var Connecter = connect(mapStateToProps, mapDispatchToProps);

export default Connecter(StashPanelContainer);
