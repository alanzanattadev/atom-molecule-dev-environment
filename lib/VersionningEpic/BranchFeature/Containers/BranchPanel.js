"use babel";
// @flow

import { connect } from "react-redux";
import type { State as ReduxState } from "../../../GlobalSystem/types.js.flow";
import BranchPanel from "../Presenters/BranchPanel";
import { mergeBranch } from "../Actions/MergeBranch";
import { checkoutBranch } from "../Actions/CheckoutBranch";
import { pushBranch } from "../Actions/PushBranch";
import { pullBranch } from "../Actions/PullBranch";
import { removeBranch } from "../Actions/RemoveBranch";
import { rebaseBranch } from "../Actions/RebaseBranch";
import { removeRemote } from "../Actions/RemoveRemote";
import type {
  PackageInfos,
} from "../../../ProjectSystemEpic/PackageFeature/Types/types.js.flow";
import React from "react";
import { refreshBranches } from "../Actions/RefreshBranches";
import { refreshRemotes } from "../Actions/RefreshRemotes";

export class Container extends React.Component<DefaultProps, Props, State> {
  state: State;
  props: Props;
  static defaultProps: DefaultProps;

  constructor(props: Props) {
    super(props);
  }

  componentDidMount() {
    this.interval = setInterval(
      () => {
        if (this.props.currentPackage) {
          this.props.dispatch(refreshBranches(this.props.currentPackage));
          this.props.dispatch(refreshRemotes(this.props.currentPackage));
        }
      },
      5000,
    );
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return <BranchPanel {...this.props} />;
  }
}

Container.defaultProps = {};

type DefaultProps = {};

type Props = {};

type State = {};

export function mapStateToProps(state: ReduxState): {} {
  return {
    branches: state.branches,
    remotes: state.remotes,
  };
}

export function mapDispatchToProps(
  dispatch: (action: any) => any,
  ownProps: { currentPackage: PackageInfos },
): {} {
  return {
    dispatch,
    onRebase(branch: string): void {
      dispatch(rebaseBranch(branch, ownProps.currentPackage));
    },
    onMerge(branch: string): void {
      dispatch(mergeBranch(branch, ownProps.currentPackage));
    },
    onCheckout(branch: string): void {
      dispatch(checkoutBranch(branch, false, ownProps.currentPackage));
    },
    onPush(remote: string, branch: string): void {
      dispatch(pushBranch(remote, branch, ownProps.currentPackage));
    },
    onPull(remote: string, branch: string): void {
      dispatch(pullBranch(remote, branch, ownProps.currentPackage));
    },
    onRemoveBranch(branch: string): void {
      dispatch(removeBranch(branch, ownProps.currentPackage));
    },
    onRemoveRemote(remote: string): void {
      dispatch(removeRemote(remote, ownProps.currentPackage));
    },
    onCreateBranch(branch: string): void {
      dispatch(checkoutBranch(branch, true, ownProps.currentPackage));
    },
  };
}

export var Connecter = connect(mapStateToProps, mapDispatchToProps);
export default Connecter(Container);
