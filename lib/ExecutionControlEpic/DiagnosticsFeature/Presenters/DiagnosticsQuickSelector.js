"use babel";
// @flow

import * as React from "react";
import styled from "styled-components";
import { compose } from "recompose";
import type { DiagnosticSeverity, MoleculeDiagnostic } from "../Types/types";
import { List, Map, Set } from "immutable";

const TypeIcon = styled.span`
  height: 18px;
  width: 16px;
`;

const DiagnosticTypeBox = styled.div`
  display: flex;
  flex: 0 0 auto;
  align-items: center;
  margin: 2px;
  opacity: ${props => (props.activated ? "1" : "0.5")};
  transition: all 0.25s ease;
  cursor: ${props => (props.onClick ? "pointer" : undefined)};
  user-select: none;
  &:hover {
    opacity: ${props => (props.activated ? "0.75" : "0.75")};
  }
  &:active {
    opacity: ${props => (props.activated ? "0.5" : "1")};
  }
`;

const DiagnosticCount = styled.span`
  font-size: 12px;
  margin: 0px 0px 0px 4px;
`;

function getIconForType(severity: DiagnosticSeverity): string {
  switch (severity) {
    case 3:
      return "info";
    case 2:
      return "alert";
    case 1:
      return "issue-opened";
    case 5:
      return "check";
    default:
      return "";
  }
}

function getDiagnosticColorClassNameForType(
  severity: DiagnosticSeverity,
): string {
  switch (severity) {
    case 3:
      return "diagnostic-color-info-text";
    case 2:
      return "diagnostic-color-warning-text";
    case 1:
      return "diagnostic-color-error-text";
    case 5:
      return "diagnostic-color-success-text";
    default:
      return "";
  }
}

function DiagnosticsOfType({
  severity,
  activated,
  count = 0,
  onClick = () => {},
}: {
  severity: DiagnosticSeverity,
  activated: boolean,
  onClick: () => void,
  count: number,
}) {
  return (
    <DiagnosticTypeBox
      className="badge"
      onClick={onClick}
      activated={activated}
    >
      <TypeIcon
        className={`${getDiagnosticColorClassNameForType(
          severity,
        )} icon icon-${getIconForType(severity)}`}
      />
      {activated ? (
        <DiagnosticCount
          className={getDiagnosticColorClassNameForType(severity)}
        >
          {count}
        </DiagnosticCount>
      ) : (
        false
      )}
    </DiagnosticTypeBox>
  );
}

const DiagnosticsBox = styled.div`
  display: flex;
  flex: 0 0 auto;
  margin: 8px;
  cursor: pointer;
`;

function DiagnosticsQuickSelector({
  diagnostics = Map(),
  severities = Set(),
  onFilterClick = () => {},
}: {
  diagnostics: Map<string, Map<DiagnosticSeverity, List<MoleculeDiagnostic>>>,
  severities: Set<DiagnosticSeverity>,
  onFilterClick: (severity: number) => void,
}) {
  return (
    <DiagnosticsBox>
      <DiagnosticsOfType
        onClick={() => onFilterClick(3)}
        activated={severities.includes(3)}
        severity={3}
        count={diagnostics
          .toList()
          .reduce(
            (red, cur) => (cur.get(3) ? red.concat(cur.get(3)) : red),
            List(),
          )
          .count()}
      />
      <DiagnosticsOfType
        onClick={() => onFilterClick(5)}
        activated={severities.includes(5)}
        severity={5}
        count={diagnostics
          .toList()
          .reduce(
            (red, cur) => (cur.get(5) ? red.concat(cur.get(5)) : red),
            List(),
          )
          .count()}
      />
      <DiagnosticsOfType
        onClick={() => onFilterClick(2)}
        activated={severities.includes(2)}
        severity={2}
        count={diagnostics
          .toList()
          .reduce(
            (red, cur) => (cur.get(2) ? red.concat(cur.get(2)) : red),
            List(),
          )
          .count()}
      />
      <DiagnosticsOfType
        onClick={() => onFilterClick(1)}
        activated={severities.includes(1)}
        severity={1}
        count={diagnostics
          .toList()
          .reduce(
            (red, cur) => (cur.get(1) ? red.concat(cur.get(1)) : red),
            List(),
          )
          .count()}
      />
    </DiagnosticsBox>
  );
}

export default compose()(DiagnosticsQuickSelector);
