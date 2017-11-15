"use babel";
// @flow

import * as React from "react";
import styled from "styled-components";
import { compose } from "recompose";
import type { DiagnosticSeverity, Diagnostic } from "../Types/types.js.flow";
import { List, Set } from "immutable";

const TypeIcon = styled.span`
  height: 15px;
  width: 15px;
  margin: 0px 8px 0px 0px;
`;

const DiagnosticTypeBox = styled.div`
  display: flex;
  flex: 0 0 auto;
  margin: 0px 6px;
`;

const DiagnosticCount = styled.span`
  font-size: 12px;
  margin: 0px;
`;

const Search = styled.span`
  font-size: 12px;
  margin: 0px 8px;
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
  count = 0,
}: {
  severity: DiagnosticSeverity,
  count: number,
}) {
  return (
    <DiagnosticTypeBox>
      <TypeIcon
        className={`${getDiagnosticColorClassNameForType(
          severity,
        )} icon icon-${getIconForType(severity)}`}
      />
      <DiagnosticCount className={getDiagnosticColorClassNameForType(severity)}>
        {count}
      </DiagnosticCount>
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
  search = "",
  diagnostics = List(),
  onClick = () => {},
  severities = Set(),
}: {
  search: string,
  diagnostics: List<Diagnostic>,
  onClick?: () => void,
  severities: Set<DiagnosticSeverity>,
}) {
  return (
    <DiagnosticsBox onClick={onClick}>
      {severities.includes(3) && (
        <DiagnosticsOfType
          severity={3}
          count={diagnostics.count(d => d.severity === 3)}
        />
      )}
      {severities.includes(5) && (
        <DiagnosticsOfType
          severity={5}
          count={diagnostics.count(d => d.severity === 5)}
        />
      )}
      {severities.includes(2) && (
        <DiagnosticsOfType
          severity={2}
          count={diagnostics.count(d => d.severity === 2)}
        />
      )}
      {severities.includes(1) && (
        <DiagnosticsOfType
          severity={1}
          count={diagnostics.count(d => d.severity === 1)}
        />
      )}
      <Search>{search}</Search>
    </DiagnosticsBox>
  );
}

export default compose()(DiagnosticsQuickSelector);
