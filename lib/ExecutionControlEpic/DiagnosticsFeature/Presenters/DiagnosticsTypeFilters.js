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
  types = Set(),
}: {
  onFilterClick: (type: DiagnosticSeverity) => void,
  types: Set<DiagnosticSeverity>,
}) {
  return (
    <FiltersBox>
      <DiagnosticsTypeFilter
        type={1}
        activated={types.includes(1)}
        onClick={() => onFilterClick(1)}
      />
      <DiagnosticsTypeFilter
        type={2}
        activated={types.includes(2)}
        onClick={() => onFilterClick(2)}
      />
      <DiagnosticsTypeFilter
        type={3}
        activated={types.includes(3)}
        onClick={() => onFilterClick(3)}
      />
      <DiagnosticsTypeFilter
        type={5}
        activated={types.includes(5)}
        onClick={() => onFilterClick(5)}
      />
    </FiltersBox>
  );
}
