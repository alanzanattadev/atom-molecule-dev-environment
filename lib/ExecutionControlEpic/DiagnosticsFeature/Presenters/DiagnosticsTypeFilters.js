"use babel";
// @flow

import React from "react";
import DiagnosticsTypeFilter from "./DiagnosticsTypeFilter";
import styled from "styled-components";
import { Set } from "immutable";
import type { DiagnosticType } from "../Types/types.js.flow";

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
  onFilterClick: (type: string) => void,
  types: Set<DiagnosticType>,
}) {
  return (
    <FiltersBox>
      <DiagnosticsTypeFilter
        type="error"
        activated={types.includes("error")}
        onClick={() => onFilterClick("error")}
      />
      <DiagnosticsTypeFilter
        type="warning"
        activated={types.includes("warning")}
        onClick={() => onFilterClick("warning")}
      />
      <DiagnosticsTypeFilter
        type="info"
        activated={types.includes("info")}
        onClick={() => onFilterClick("info")}
      />
      <DiagnosticsTypeFilter
        type="success"
        activated={types.includes("success")}
        onClick={() => onFilterClick("success")}
      />
    </FiltersBox>
  );
}
