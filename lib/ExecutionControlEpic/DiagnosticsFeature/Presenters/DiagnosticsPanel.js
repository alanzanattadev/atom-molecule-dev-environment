"use babel";
// @flow

import React from "react";
import { compose, withProps, withState, lifecycle } from "recompose";
import styled from "styled-components";
import DiagnosticsModeSelector from "./DiagnosticsModeSelector";
import { List } from "immutable";
import DiagnosticDetailsFlow from "./DiagnosticDetailsFlow";
import type {
  Diagnostic,
  DiagnosticType,
  DiagnosticLocation,
} from "../Types/types.js.flow";
import Term from "../../ActionSystemFeature/Presenters/Term";
import DiagnosticDetails from "./DiagnosticDetails";

const Panel = styled.div`
  display: flex;
  flex-direction: row;
  align-items: stretch;
  flex: 1;
`;

const DiagnosticsContentBox = styled.div`
  display: flex;
  align-items: stretch;
  flex: 1;
  overflow: auto;
  flex-direction: column;
`;

const TravellerConfigBox = styled.div`
  display: flex;
  align-items: stretch;
  flex-direction: column;
`;

function DiagnosticsContent({
  mode,
  diagnostics,
}: {
  mode: Mode,
  diagnostics: List<Diagnostic>,
}) {
  if (diagnostics.size === 0) return null;
  else if (mode === "organized") {
    // $FlowFixMe
    return <DiagnosticDetails message={diagnostics.get(0).message} />;
  } else if (mode === "logs") {
    // $FlowFixMe
    return <DiagnosticDetailsFlow diagnostics={diagnostics} />;
  } else {
    throw new Error(
      `Mode must be "organized", "logs" or "terminal, ${mode} isn't a valid value"`,
    );
  }
}

const JumpToButtonElement = styled.button`
  position: absolute;
  right: 16px;
  bottom: 16px;
`;

function JumpToButton({ onClick }: { onClick: () => void }) {
  return (
    <JumpToButtonElement
      className="btn btn-primary inline-block-tight"
      onClick={onClick}
    >
      Jump to
    </JumpToButtonElement>
  );
}

function DiagnosticsPanel({
  diagnostics = List(),
  mode,
  onModeSelection,
  onJumpTo,
  xtermInstance,
}: {
  diagnostics: List<Diagnostic>,
  mode: Mode,
  onModeSelection: (mode: Mode) => void,
  onJumpTo: (location: DiagnosticLocation) => void,
  xtermInstance: any,
}) {
  return (
    <Panel>
      <TravellerConfigBox>
        <DiagnosticsModeSelector type={mode} onClick={onModeSelection} />
      </TravellerConfigBox>
      <DiagnosticsContentBox className="diagnostic-content">
        {mode === "terminal"
          ? <Term xtermInstance={xtermInstance} />
          : <DiagnosticsContent mode={mode} diagnostics={diagnostics} />}
        {mode === "organized" &&
          diagnostics.size > 0 &&
          diagnostics.get(0).location != null
          ? <JumpToButton
              // $FlowFixMe
              onClick={() => onJumpTo(diagnostics.get(0).location)}
            />
          : null}
      </DiagnosticsContentBox>
    </Panel>
  );
}

type Mode = "organized" | "logs" | "terminal";

type OrganizedModeState = $Exact<{
  mode: "organized",
  type: DiagnosticType,
  index: number,
}>;

type LogsModeState = $Exact<{
  mode: "logs",
}>;

type TerminalModeState = $Exact<{
  mode: "terminal",
}>;

type TravellingState = OrganizedModeState | LogsModeState | TerminalModeState;

function selectDiagnosticsByType(
  diagnostics: List<Diagnostic>,
  type: DiagnosticType,
) {
  return diagnostics.filter(d => d.type === type);
}

function selectDiagnosticN(diagnostics: List<Diagnostic>, n: number) {
  return diagnostics.get(n, diagnostics.get(0, null));
}

const Filter = withProps(
  ({
    diagnostics, //= List(),
    travellingState,
  }: {
    diagnostics: List<Diagnostic>,
    travellingState: TravellingState,
  }): List<Diagnostic> => {
    if (travellingState.mode === "organized") {
      return List.of(
        selectDiagnosticN(
          selectDiagnosticsByType(diagnostics, travellingState.type),
          travellingState.index,
        ),
      );
    } else {
      return diagnostics;
    }
  },
);

const ModeAdapter = withProps(
  ({
    travellingState,
    setTravellingState = () => {},
  }: {
    travellingState: TravellingState,
    setTravellingState: (state: TravellingState) => void,
  }) => ({
    mode: travellingState.mode,
    onModeSelection: (mode: Mode): void => {
      if (mode === "organized") {
        setTravellingState({
          mode: "organized",
          type: "error",
          index: 0,
        });
      } else if (mode === "logs") {
        setTravellingState({
          mode: "logs",
        });
      } else if (mode === "terminal") {
        setTravellingState({
          mode: "terminal",
        });
      } else {
        setTravellingState({
          mode: "logs",
        });
      }
    },
  }),
);

function getHigherPriorityType(diagnostics: List<Diagnostic>): DiagnosticType {
  if (diagnostics.some(d => d.type === "error")) return "error";
  else if (diagnostics.some(d => d.type === "warning")) return "warning";
  else if (diagnostics.some(d => d.type === "success")) return "success";
  else if (diagnostics.some(d => d.type === "info")) return "info";
  else return "error";
}

export const enhance = compose(
  withState(
    "travellingState",
    "setTravellingState",
    ({ diagnostics = List() }: { diagnostics: List<Diagnostic> }) => ({
      mode: "organized",
      type: getHigherPriorityType(diagnostics),
      index: 0,
    }),
  ),
  Filter,
  lifecycle({
    componentWillReceiveProps({
      travellingState,
      diagnostics,
      setTravellingState,
    }: {
      travellingState: TravellingState,
      diagnostics: List<Diagnostic>,
      setTravellingState: (state: TravellingState) => void,
    }) {
      if (
        travellingState.mode === "organized" &&
        travellingState.index >= diagnostics.size &&
        travellingState.index > 0
      )
        setTravellingState({
          index: 0,
          mode: "organized",
          type: getHigherPriorityType(diagnostics),
        });
    },
  }),
  ModeAdapter,
);

export default enhance(DiagnosticsPanel);
