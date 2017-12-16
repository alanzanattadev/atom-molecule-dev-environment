"use babel";
// @flow

import * as React from "react";
import { compose, withProps, withState } from "recompose";
import styled from "styled-components";
import DiagnosticsModeSelector from "./DiagnosticsModeSelector";
import { Map, List, Set } from "immutable";
import DiagnosticDetailsFlow from "./DiagnosticDetailsFlow";
import type {
  Diagnostic,
  DiagnosticSeverity,
  DiagnosticRange,
} from "../Types/types.js.flow";
import Term from "../../ActionSystemFeature/Presenters/Term";
import DiagnosticsQuickSelector from "./DiagnosticsQuickSelector";
import DiagnosticsFilters from "./DiagnosticsFilters";
import type { Task } from "../../TaskExecutionFeature/Types/types.js.flow";

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
    diagnostics: Map<string, Map<DiagnosticSeverity, List<Diagnostic>>>,
    contentState: TravellingState,
  }): {
    diagnostics: Map<string, Map<DiagnosticSeverity, List<Diagnostic>>>,
  } => {
    return {
      diagnostics: diagnostics.map(map =>
        map.filter((v, k) => contentState.diagnosticsTypes.includes(k)),
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
  flex: 1;
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

const FiltersBox = styled.div`
  display: flex;
  position: absolute;
  right: -350px;
  top: 0px;
  bottom: 0px;
  transition: transform 0.375s;
  transform: translate3d(${props => (props.open ? "-375px" : "0px")}, 0, 0);
`;

const FilterPanelState = withState("filtersOpen", "setFiltersOpen", false);

function DiagnosticsContentPanel({
  filters,
  diagnostics,
  filtersOpen,
  setFiltersOpen,
  onToggleDiagnosticType,
  onSearchChange,
  tasks = List(),
  onTaskClick = () => {},
  onClearFilters = () => {},
}: // onJumpTo = () => {},
{
  filters: TravellingState,
  diagnostics: Map<string, Map<DiagnosticSeverity, List<Diagnostic>>>,
  onJumpTo: (location: DiagnosticRange) => void,
  filtersOpen: boolean,
  setFiltersOpen: (v: boolean) => void,
  onToggleDiagnosticType: (severity: DiagnosticSeverity) => void,
  onSearchChange: (search: string) => void,
  tasks: List<Task>,
  onTaskClick: (task: Task) => void,
  onClearFilters: () => void,
}) {
  return (
    <DiagnosticsContentBox>
      <DiagnosticDetailsFlow diagnostics={diagnostics} />
      <QuickSelectorBox>
        <DiagnosticsQuickSelector
          diagnostics={diagnostics}
          search={filters.search}
          onClick={() => setFiltersOpen(true)}
          severities={filters.diagnosticsTypes}
        />
      </QuickSelectorBox>
      <FiltersBox open={filtersOpen}>
        <DiagnosticsFilters
          onClose={() => setFiltersOpen(false)}
          filters={filters}
          onTypeFilterClick={onToggleDiagnosticType}
          onSearchChange={onSearchChange}
          tasks={tasks}
          onTaskFilterClick={onTaskClick}
          onClear={onClearFilters}
        />
      </FiltersBox>
      {/* {diagnostics.size > 0 &&
          diagnostics.get(0).location != null
          ? <JumpToButton
              onClick={() => onJumpTo(diagnostics.get(0).location)}
            />
          : null} */}
    </DiagnosticsContentBox>
  );
}

const DiagnosticsContent = compose(
  ContentState,
  Filter,
  FilterPanelState,
  ContentModeAdapter,
)(DiagnosticsContentPanel);

// const JumpToButtonElement = styled.button`
//   position: absolute;
//   right: 16px;
//   bottom: 16px;
// `;

// function JumpToButton({ onClick }: { onClick: () => void }) {
//   return (
//     <JumpToButtonElement
//       className="btn btn-primary inline-block-tight"
//       onClick={onClick}
//     >
//       Jump to
//     </JumpToButtonElement>
//   );
// }

function DiagnosticsPanel({
  diagnostics = List(),
  mode,
  onModeSelection,
  onJumpTo,
  xtermInstance,
  tasks,
  onTaskClick,
  currentTask,
}: {
  diagnostics: Map<string, Map<DiagnosticSeverity, List<Diagnostic>>>,
  mode: PanelMode,
  onModeSelection: (mode: PanelMode) => void,
  onJumpTo: (location: DiagnosticRange) => void,
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
            tasks={tasks}
            onTaskClick={onTaskClick}
          />
        )}
      </ContentBox>
    </Panel>
  );
}

type PanelMode = "diagnostics" | "terminal";

type DiagnosticsModeState = $Exact<{
  mode: "diagnostics",
}>;

type TerminalModeState = $Exact<{
  mode: "terminal",
}>;

type PanelState = TerminalModeState | DiagnosticsModeState;

// function selectDiagnosticsByType(
//   diagnostics: List<Diagnostic>,
//   type: DiagnosticSeverity,
// ) {
//   return diagnostics.filter(d => d.type === type);
// }

// function selectDiagnosticN(diagnostics: List<Diagnostic>, n: number) {
//   return diagnostics.get(n, diagnostics.get(0, null));
// }

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

// function getHigherPriorityType(diagnostics: List<Diagnostic>): DiagnosticSeverity {
//   if (diagnostics.some(d => d.type === "error")) return "error";
//   else if (diagnostics.some(d => d.type === "warning")) return "warning";
//   else if (diagnostics.some(d => d.type === "success")) return "success";
//   else if (diagnostics.some(d => d.type === "info")) return "info";
//   else return "error";
// }

export const enhance = compose(
  withState("panelState", "setPanelState", (): PanelState => ({
    mode: "diagnostics",
  })),
  ModeAdapter,
);

export default enhance(DiagnosticsPanel);
