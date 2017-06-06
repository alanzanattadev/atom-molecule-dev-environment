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

const ContentBox = styled.div`
  display: flex;
  align-items: stretch;
  flex: 1;
  flex-direction: column;
  padding: 16px;
`;

const ModeBox = styled.div`
  display: flex;
  align-items: stretch;
  flex-direction: column;
`;

type OrganizedModeState = $Exact<{
  mode: "organized",
  type: DiagnosticType,
  index: number,
}>;

type LogsModeState = $Exact<{
  mode: "logs",
}>;

type TravellingMode = "logs" | "organized";

type TravellingState = OrganizedModeState | LogsModeState;

const ContentState = withState(
  "contentState",
  "setContentState",
  ({ diagnostics }: { diagnostics: List<Diagnostic> }): TravellingState => ({
    mode: "organized",
    type: getHigherPriorityType(diagnostics),
    index: 0,
  }),
);

const Filter = withProps(
  ({
    diagnostics, //= List(),
    contentState,
  }: {
    diagnostics: List<Diagnostic>,
    contentState: TravellingState,
  }): List<Diagnostic> => {
    if (contentState.mode === "organized") {
      return List.of(
        selectDiagnosticN(
          selectDiagnosticsByType(diagnostics, contentState.type),
          contentState.index,
        ),
      );
    } else {
      return diagnostics;
    }
  },
);

const ContentModeAdapter = withProps(
  ({
    contentState,
    setContentState = () => {},
  }: {
    contentState: TravellingState,
    setContentState: (state: TravellingState) => void,
  }) => ({
    mode: contentState.mode,
    onModeSelection: (mode: TravellingMode): void => {
      if (mode === "organized") {
        setContentState({
          mode: "organized",
          type: "error",
          index: 0,
        });
      } else if (mode === "logs") {
        setContentState({
          mode: "logs",
        });
      } else {
        setContentState({
          mode: "logs",
        });
      }
    },
  }),
);

const DiagnosticsContentBox = styled.div`
  position: relative;
  display: flex;
  flex: 1;
  align-items: stretch;
  overflow: auto;
`;

function DiagnosticsContentPanel({
  mode,
  diagnostics,
  onJumpTo = () => {},
}: {
  mode: TravellingMode,
  diagnostics: List<Diagnostic>,
  onJumpTo: (location: DiagnosticLocation) => void,
}) {
  if (diagnostics.size === 0) return null;
  else if (mode === "organized") {
    return (
      <DiagnosticsContentBox>
        {/* // $FlowFixMe */}
        <DiagnosticDetails message={diagnostics.get(0).message} />
        {mode === "organized" &&
          diagnostics.size > 0 &&
          diagnostics.get(0).location != null
          ? <JumpToButton
              // $FlowFixMe
              onClick={() => onJumpTo(diagnostics.get(0).location)}
            />
          : null}
      </DiagnosticsContentBox>
    );
  } else if (mode === "logs") {
    return (
      <DiagnosticsContentBox>
        <DiagnosticDetailsFlow diagnostics={diagnostics} />
      </DiagnosticsContentBox>
    );
  } else {
    throw new Error(
      `Mode must be "organized", "logs" or "terminal, ${mode} isn't a valid value"`,
    );
  }
}

const DiagnosticsContent = compose(
  ContentState,
  Filter,
  lifecycle({
    componentWillReceiveProps({
      contentState,
      diagnostics,
      setContentState,
    }: {
      contentState: TravellingState,
      diagnostics: List<Diagnostic>,
      setContentState: (state: TravellingState) => void,
    }) {
      if (
        contentState.mode === "organized" &&
        contentState.index >= diagnostics.size &&
        contentState.index > 0
      )
        setContentState({
          mode: "logs",
        });
    },
  }),
  ContentModeAdapter,
)(DiagnosticsContentPanel);

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
  mode: PanelMode,
  onModeSelection: (mode: PanelMode) => void,
  onJumpTo: (location: DiagnosticLocation) => void,
  xtermInstance: any,
}) {
  return (
    <Panel>
      <ModeBox>
        <DiagnosticsModeSelector type={mode} onClick={onModeSelection} />
      </ModeBox>
      <ContentBox
        className={`diagnostic-content ${mode === "terminal" ? "terminal" : ""}`}
      >
        {mode === "terminal"
          ? <Term xtermInstance={xtermInstance} />
          : <DiagnosticsContent
              mode={mode}
              diagnostics={diagnostics}
              onJumpTo={onJumpTo}
            />}
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

function selectDiagnosticsByType(
  diagnostics: List<Diagnostic>,
  type: DiagnosticType,
) {
  return diagnostics.filter(d => d.type === type);
}

function selectDiagnosticN(diagnostics: List<Diagnostic>, n: number) {
  return diagnostics.get(n, diagnostics.get(0, null));
}

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

function getHigherPriorityType(diagnostics: List<Diagnostic>): DiagnosticType {
  if (diagnostics.some(d => d.type === "error")) return "error";
  else if (diagnostics.some(d => d.type === "warning")) return "warning";
  else if (diagnostics.some(d => d.type === "success")) return "success";
  else if (diagnostics.some(d => d.type === "info")) return "info";
  else return "error";
}

export const enhance = compose(
  withState("panelState", "setPanelState", (): PanelState => ({
    mode: "diagnostics",
  })),
  ModeAdapter,
);

export default enhance(DiagnosticsPanel);
