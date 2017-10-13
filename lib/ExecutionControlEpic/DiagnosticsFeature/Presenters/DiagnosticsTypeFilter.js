"use babel";
// @flow

import * as React from "react";
import styled from "styled-components";
import type { DiagnosticType } from "../Types/types.js.flow";

const FilterBox = styled.div`
  display: flex;
  flex: 0 0 auto;
  padding: 8px 16px;
  border-radius: 25px;
  align-items: center;
  opacity: ${props => (props.activated ? "1" : "0.5")};
  transition: opacity 0.375s;
  &:hover {
    opacity: ${props => (props.activated ? "0.75" : "0.75")};
  }
  &:active {
    opacity: ${props => (props.activated ? "0.5" : "1")};
  }
  cursor: ${props => (props.onClick ? "pointer" : undefined)};
  user-select: none;
  margin: 8px;
`;

const FilterName = styled.span`
  font-size: 12px;
`;

const FilterIcon = styled.span`
  height: 15px;
  width: 15px;
  margin: 0px 5px 0px 0px;
`;

function getIconForType(type: DiagnosticType): string {
  switch (type) {
    case "info":
      return "info";
    case "warning":
      return "alert";
    case "error":
      return "issue-opened";
    case "success":
      return "check";
    default:
      return "";
  }
}

function getDiagnosticColorClassNameForType(type: DiagnosticType): string {
  switch (type) {
    case "info":
      return "diagnostic-color-info";
    case "warning":
      return "diagnostic-color-warning";
    case "error":
      return "diagnostic-color-error";
    case "success":
      return "diagnostic-color-success";
    default:
      return "";
  }
}

export default function DiagnosticsTypeFilter({
  type,
  activated = false,
  onClick,
}: {
  type: DiagnosticType,
  activated: boolean,
  onClick: () => void,
}) {
  return (
    <FilterBox
      className={`${getDiagnosticColorClassNameForType(type)}`}
      activated={activated}
      onClick={onClick}
    >
      <FilterIcon
        className={`color-text-white icon icon-${getIconForType(type)}`}
      />
      <FilterName className="color-text-white">{type}</FilterName>
    </FilterBox>
  );
}
