'use babel'
// @flow

import type {DiagnosticType} from "../Types/types.js";

export function getColorForDiagnosticType(type: DiagnosticType) {
  switch (type) {
    case "error": return "#e71d36";
    case "warning": return "#ffbe23";
    case "info": return "#005cbd";
    case "success": return "#42CC56";
    default: return 'white';
  }
};

export function getDarkColorForDiagnosticType(type: DiagnosticType) {
  switch (type) {
    case "error": return "#bc1a2e";
    case "warning": return "#dba21e";
    case "info": return "#0050A3";
    case "success": return "#42CC56";
    default: return 'white';
  }
};
