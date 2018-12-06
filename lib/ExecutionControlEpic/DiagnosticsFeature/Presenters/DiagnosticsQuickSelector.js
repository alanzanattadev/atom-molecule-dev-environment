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
  const flattenDiagnostics = (
    severity: DiagnosticSeverity,
  ): List<MoleculeDiagnostic> =>
    diagnostics
      .filter(diagnosticGroup => diagnosticGroup.get(severity))
      .reduce(
        (acc, serverityMap) =>
          serverityMap ? acc.concat(...serverityMap.values()) : acc,
        List(),
      );

  return (
    <DiagnosticsBox>
      {[3, 5, 2, 1].map((severity: DiagnosticSeverity) => (
        <DiagnosticsOfType
          onClick={() => onFilterClick(severity)}
          activated={severities.includes(severity)}
          key={severity}
          severity={severity}
          count={flattenDiagnostics(severity).count()}
        />
      ))}
    </DiagnosticsBox>
  );
}

export default compose()(DiagnosticsQuickSelector);
