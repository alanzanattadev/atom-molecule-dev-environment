"use babel";
// @flow

import type { DiagnosticType } from "../Types/types.js.flow";

export function getColorForDiagnosticType(type: DiagnosticType) {
  switch (type) {
    case "error":
      return "diagnostic-color-error";
    case "warning":
      return "diagnostic-color-warning";
    case "info":
      return "diagnostic-color-info";
    case "success":
      return "diagnostic-color-success";
    default:
      return "text-color-highlight";
  }
}

export function getDarkColorForDiagnosticType(type: DiagnosticType) {
  switch (type) {
    case "error":
      return "diagnostic-color-error-dark";
    case "warning":
      return "diagnostic-color-warning-dark";
    case "info":
      return "diagnostic-color-info-dark";
    case "success":
      return "diagnostic-color-success-dark";
    default:
      return "text-color-highlight";
  }
}
