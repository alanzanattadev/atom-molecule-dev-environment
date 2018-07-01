"use babel";
// @flow

import * as React from "react";
import { compose, withProps, withState } from "recompose";
import styled from "styled-components";
import { List, Map, Set } from "immutable";
import DiagnosticDetailsFlow from "./DiagnosticDetailsFlow";
import type { DiagnosticSeverity, MoleculeDiagnostic } from "../Types/types";
import type { Range } from "../../LanguageServerProtocolFeature/Types/standard";
import DiagnosticsQuickSelector from "./DiagnosticsQuickSelector";

export type TravellingState = {
  diagnosticsTypes: Set<DiagnosticSeverity>,
  search: string,
};

const ContentState = withState(
  "contentState",
  "setContentState",
  (): TravellingState => ({
    diagnosticsTypes: Set.of(1, 2, 3, 4, 5),
    search: "",
  }),
);

const Filter = withProps(
  ({
    diagnostics, //= List(),
    contentState,
  }: {
    diagnostics: Map<string, Map<DiagnosticSeverity, List<MoleculeDiagnostic>>>,
    contentState: TravellingState,
  }): {
    diagnostics: Map<string, Map<DiagnosticSeverity, List<MoleculeDiagnostic>>>,
  } => {
    return {
      diagnostics: diagnostics.map(map =>
        map
          .update(1, (list = List()) =>
            list.filter(
              d =>
                contentState.search != ""
                  ? (d.path && d.path.includes(contentState.search)) ||
                    (d.message && d.message.includes(contentState.search))
                  : true,
            ),
          )
          .update(2, (list = List()) =>
            list.filter(
              d =>
                contentState.search != ""
                  ? (d.path && d.path.includes(contentState.search)) ||
                    (d.message && d.message.includes(contentState.search))
                  : true,
            ),
          )
          .update(3, (list = List()) =>
            list.filter(
              d =>
                contentState.search != ""
                  ? (d.path && d.path.includes(contentState.search)) ||
                    (d.message && d.message.includes(contentState.search))
                  : true,
            ),
          )
          .update(5, (list = List()) =>
            list.filter(
              d =>
                contentState.search != ""
                  ? (d.path && d.path.includes(contentState.search)) ||
                    (d.message && d.message.includes(contentState.search))
                  : true,
            ),
          )
          .filter(
            (v, k) => contentState.diagnosticsTypes.includes(k) && v.size > 0,
          ),
      ),
    };
  },
);

const ContentModeAdapter = withProps(
  ({
    contentState,
    setContentState = () => {},
  }: {
    contentState: TravellingState,
    setContentState: (
      state: TravellingState | ((state: TravellingState) => TravellingState),
    ) => void,
  }) => ({
    filters: contentState,
    onToggleDiagnosticType(severity: DiagnosticSeverity) {
      if (
        contentState.diagnosticsTypes.size > 1 ||
        contentState.diagnosticsTypes.includes(severity) === false
      ) {
        setContentState((state: TravellingState) => ({
          ...state,
          diagnosticsTypes: state.diagnosticsTypes.includes(severity)
            ? state.diagnosticsTypes.remove(severity)
            : state.diagnosticsTypes.add(severity),
        }));
      }
    },
    onSearchChange(newSearch: string) {
      setContentState((state: TravellingState) => ({
        ...state,
        search: newSearch,
      }));
    },
    onClearFilters() {
      setContentState({
        diagnosticsTypes: Set.of(1, 2, 3, 4, 5),
        search: "",
      });
    },
  }),
);

const DiagnosticsContentBox = styled.div`
  position: relative;
  display: flex;
  flex: 1 1 0;
  align-items: stretch;
  overflow: hidden;
  flex-direction: column;
`;

const QuickSelectorBox = styled.div`
  display: flex;
  flex: 0 0 auto;
  position: absolute;
  top: 0px;
  right: 0px;
`;

const SearchFieldBox = styled.div`
  position: relative;
  padding: 0;
  margin: 8px 8px 8px 0px;
`;

const SearchIcon = styled.div`
  position: absolute;
  left: 1em;
  top: 0.5em;
  pointer-events: none;
`;

const SearchField = styled.input`
  padding: 0;
  margin: 0;
  height: 30px;
  width: 130px;
  border: 1px solid black;
  font-size: 12px;
  text-align: start;
  text-indent: 30px;
  text-shadow: 0 1px 0 rgba(0, 0, 0, 0.4);
  &:focus {
    width: 200px;
  }
  transition: all 0.4s ease;
`;

function DiagnosticsContentPanel({
  filters,
  diagnostics,
  onToggleDiagnosticType,
  onSearchChange,
  onJumpTo = () => {},
}: {
  filters: TravellingState,
  diagnostics: Map<string, Map<DiagnosticSeverity, List<MoleculeDiagnostic>>>,
  onToggleDiagnosticType: (severity: DiagnosticSeverity) => void,
  onSearchChange: (search: string) => void,
  onJumpTo: (path: string, range: Range, pending: boolean) => void,
}) {
  return (
    <DiagnosticsContentBox>
      <DiagnosticDetailsFlow diagnostics={diagnostics} onJumpTo={onJumpTo} />
      <QuickSelectorBox>
        <DiagnosticsQuickSelector
          diagnostics={diagnostics}
          severities={filters.diagnosticsTypes}
          onFilterClick={onToggleDiagnosticType}
        />
        <SearchFieldBox>
          <SearchIcon className="icon icon-search" />
          <SearchField
            className="input-search badge native-key-bindings"
            type="search"
            placeholder="Search..."
            value={filters.search}
            onChange={e => onSearchChange(e.target.value)}
            style={{ display: "inline" }}
          />
        </SearchFieldBox>
      </QuickSelectorBox>
    </DiagnosticsContentBox>
  );
}

export const DiagnosticsContent = compose(
  ContentState,
  Filter,
  ContentModeAdapter,
)(DiagnosticsContentPanel);
