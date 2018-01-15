"use babel";
// @flow

import type { DiagnosticSeverity } from "../Types/types.js.flow";

export function getColorForDiagnosticType(type: DiagnosticSeverity) {
  switch (type) {
    case 1:
      return "diagnostic-color-error";
    case 2:
      return "diagnostic-color-warning";
    case 3:
      return "diagnostic-color-info";
    case 5:
      return "diagnostic-color-success";
    default:
      return "text-color-highlight";
  }
}

export function getDarkColorForDiagnosticType(type: DiagnosticSeverity) {
  switch (type) {
    case 1:
      return "diagnostic-color-error-dark";
    case 2:
      return "diagnostic-color-warning-dark";
    case 3:
      return "diagnostic-color-info-dark";
    case 5:
      return "diagnostic-color-success-dark";
    default:
      return "text-color-highlight";
  }
}
