"use babel";
// @flow

import * as React from "react";
import DiagnosticsTypeFilter from "./DiagnosticsTypeFilter";
import styled from "styled-components";
import { Set } from "immutable";
import type { DiagnosticSeverity } from "../Types/types.js.flow";

const FiltersBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 8px;
  flex: 0 0 auto;
  justify-content: center;
`;

export default function DiagnosticsTypeFilters({
  onFilterClick = () => {},
  severities = Set(),
}: {
  onFilterClick: (severity: DiagnosticSeverity) => void,
  severities: Set<DiagnosticSeverity>,
}) {
  return (
    <FiltersBox>
      <DiagnosticsTypeFilter
        severity={1}
        activated={severities.includes(1)}
        onClick={() => onFilterClick(1)}
      />
      <DiagnosticsTypeFilter
        severity={2}
        activated={severities.includes(2)}
        onClick={() => onFilterClick(2)}
      />
      <DiagnosticsTypeFilter
        severity={3}
        activated={severities.includes(3)}
        onClick={() => onFilterClick(3)}
      />
      <DiagnosticsTypeFilter
        severity={5}
        activated={severities.includes(5)}
        onClick={() => onFilterClick(5)}
      />
    </FiltersBox>
  );
}
