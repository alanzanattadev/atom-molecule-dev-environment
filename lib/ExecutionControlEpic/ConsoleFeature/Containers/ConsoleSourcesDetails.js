"use babel";
// @flow

import { connect } from "react-redux";
import type { State } from "../../../GlobalSystem/types.js.flow";
import { selectConsoleSourcesReducer } from "../../../GlobalSystem/Selectors";
import SourceSelection from "../Presenters/SourceSelection";
import type { ConsoleSourcesReducer } from "../Reducers/ConsoleSources";
import { updateSourceStatus } from "../Actions/UpdateSourceStatus";
import { addConsoleSource } from "../Actions/AddConsoleSource";

export function mapStateToProps(
  state: State,
): { sources: ConsoleSourcesReducer } {
  return {
    sources: selectConsoleSourcesReducer(state),
  };
}

export function mapDispatchToProps(
  dispatch: (action: any) => any,
): {
  onIsChecked: (source: string, status: boolean) => void,
  addMoleculeSource: (source: string, status: boolean) => void,
} {
  return {
    onIsChecked: (source: string, status: boolean) => {
      dispatch(updateSourceStatus(source, status));
    },
    addMoleculeSource: (source: string, status: boolean) => {
      dispatch(addConsoleSource(source, status));
    },
  };
}

export var Connecter = connect(mapStateToProps, mapDispatchToProps);

export default Connecter(SourceSelection);
