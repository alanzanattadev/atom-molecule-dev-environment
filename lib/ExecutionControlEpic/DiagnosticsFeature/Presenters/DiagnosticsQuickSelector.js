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

function getIconForType(type: DiagnosticSeverity): string {
  switch (type) {
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

function getDiagnosticColorClassNameForType(type: DiagnosticSeverity): string {
  switch (type) {
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
  type,
  count = 0,
}: {
  type: DiagnosticSeverity,
  count: number,
}) {
  return (
    <DiagnosticTypeBox>
      <TypeIcon
        className={`${getDiagnosticColorClassNameForType(
          type,
        )} icon icon-${getIconForType(type)}`}
      />
      <DiagnosticCount className={getDiagnosticColorClassNameForType(type)}>
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
  types = Set(),
}: {
  search: string,
  diagnostics: List<Diagnostic>,
  onClick?: () => void,
  types: Set<DiagnosticSeverity>,
}) {
  return (
    <DiagnosticsBox onClick={onClick}>
      {types.includes(3) && (
        <DiagnosticsOfType
          type={3}
          count={diagnostics.count(d => d.severity === 3)}
        />
      )}
      {types.includes(5) && (
        <DiagnosticsOfType
          type={5}
          count={diagnostics.count(d => d.severity === 5)}
        />
      )}
      {types.includes(2) && (
        <DiagnosticsOfType
          type={2}
          count={diagnostics.count(d => d.severity === 2)}
        />
      )}
      {types.includes(1) && (
        <DiagnosticsOfType
          type={1}
          count={diagnostics.count(d => d.severity === 1)}
        />
      )}
      <Search>{search}</Search>
    </DiagnosticsBox>
  );
}

export default compose()(DiagnosticsQuickSelector);
