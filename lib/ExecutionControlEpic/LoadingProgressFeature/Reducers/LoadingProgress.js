"use babel";
// @flow

export default function(
  state: LoadingProgressReducer = { ongoingPackageRefreshCount: 0 },
  action: any,
): LoadingProgressReducer {
  switch (action.type) {
    case "REFRESH_PACKAGES":
      return {
        ...state,
        ongoingPackageRefreshCount: state.ongoingPackageRefreshCount + 1,
      };
    case "PACKAGE_REFRESH_COMPLETED":
      return {
        ...state,
        ongoingPackageRefreshCount:
          state.ongoingPackageRefreshCount - action.payload.actionCount,
      };
    default:
      return state;
  }
}

export type LoadingProgressReducer = {
  ongoingPackageRefreshCount: number,
};
