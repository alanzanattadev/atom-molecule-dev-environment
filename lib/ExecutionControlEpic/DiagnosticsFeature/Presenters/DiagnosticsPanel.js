"use babel";
// @flow

import * as React from "react";
import { compose, withProps, withState } from "recompose";
import styled from "styled-components";
import DiagnosticsModeSelector from "./DiagnosticsModeSelector";
import { List, Map, Set } from "immutable";
import DiagnosticDetailsFlow from "./DiagnosticDetailsFlow";
import type { DiagnosticSeverity, MoleculeDiagnostic } from "../Types/types";
import type { Range } from "../../LanguageServerProtocolFeature/Types/standard";
import Term from "../../ActionSystemFeature/Presenters/Term";
import DiagnosticsQuickSelector from "./DiagnosticsQuickSelector";
import DiagnosticsFilters from "./DiagnosticsFilters";
import type { Task } from "../../TaskExecutionFeature/Types/types";

const Panel = styled.div`
  display: flex;
  flex-direction: row;
  align-items: stretch;
  flex: 1;
`;

const ContentBox = styled.div`
  display: flex;
  align-items: stretch;
  flex: 1;
  flex-direction: column;
  padding: 8px 0px 8px 8px;
`;

const ModeBox = styled.div`
  display: flex;
  align-items: stretch;
  flex-direction: column;
`;

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

const SearchIcon = styled.span`
  position: relative;
  left: 28px;
  top: 14px;
  pointer-events: none;
`;

const SearchField = styled.input`
  padding: 0;
  font-size: 12px;
  margin: 8px 8px 8px 0px;
  border: 1px solid black;
  height: 30px;
  width: 30px;
  text-indent: 30px;
  text-shadow: 0 1px 0 rgba(0, 0, 0, 0.4);
  transition: all 0.4s ease;
  &:focus {
    width: 200px;
  }
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
        <SearchIcon className="icon icon-search" />
        <SearchField
          className="input-search badge native-key-bindings"
          type="search"
          placeholder="Search.."
          value={filters.search}
          onChange={e => onSearchChange(e.target.value)}
          style={{ display: "inline" }}
        />
      </QuickSelectorBox>
    </DiagnosticsContentBox>
  );
}

export const DiagnosticsContent = compose(
  ContentState,
  Filter,
  ContentModeAdapter,
)(DiagnosticsContentPanel);

function DiagnosticsPanel({
  diagnostics = Map(),
  mode,
  onModeSelection,
  onJumpTo,
  xtermInstance,
  currentTask,
}: {
  diagnostics: Map<string, Map<DiagnosticSeverity, List<MoleculeDiagnostic>>>,
  mode: PanelMode,
  onModeSelection: (mode: PanelMode) => void,
  onJumpTo: (path: string, range: Range, pending: boolean) => void,
  xtermInstance: any,
  tasks: List<Task>,
  onTaskClick: (task: Task) => void,
  currentTask: Task,
}) {
  return (
    <Panel>
      <ModeBox>
        <DiagnosticsModeSelector
          type={mode}
          onClick={onModeSelection}
          terminal={
            currentTask.terminal !== false &&
            currentTask.strategy != null &&
            currentTask.strategy.type === "terminal"
          }
        />
      </ModeBox>
      <ContentBox
        className={`diagnostic-content ${
          mode === "terminal" ? "terminal" : ""
        }`}
      >
        {mode === "terminal" ? (
          <Term xtermInstance={xtermInstance} />
        ) : (
          <DiagnosticsContent
            mode={mode}
            diagnostics={diagnostics}
            onJumpTo={onJumpTo}
          />
        )}
      </ContentBox>
    </Panel>
  );
}

type PanelMode = "diagnostics" | "terminal";

type DiagnosticsModeState = {
  mode: "diagnostics",
};

type TerminalModeState = {
  mode: "terminal",
};

type PanelState = TerminalModeState | DiagnosticsModeState;

const ModeAdapter = withProps(
  ({
    panelState,
    setPanelState = () => {},
  }: {
    panelState: PanelState,
    setPanelState: (state: PanelState) => void,
  }) => ({
    mode: panelState.mode,
    onModeSelection: (mode: PanelMode): void => {
      if (mode === "terminal") {
        setPanelState({
          mode: "terminal",
        });
      } else if (mode === "diagnostics") {
        setPanelState({
          mode: "diagnostics",
        });
      } else {
        setPanelState({
          mode: "diagnostics",
        });
      }
    },
  }),
);

export const enhance = compose(
  withState(
    "panelState",
    "setPanelState",
    ({ currentTask }: { currentTask: Task }): PanelState => {
      let mode: PanelState;

      if (
        currentTask.terminal !== false &&
        currentTask.strategy != null &&
        currentTask.strategy.type === "terminal"
      ) {
        mode = { mode: "terminal" };
      } else {
        mode = { mode: "diagnostics" };
      }

      return mode;
    },
  ),
  ModeAdapter,
);

export default enhance(DiagnosticsPanel);
