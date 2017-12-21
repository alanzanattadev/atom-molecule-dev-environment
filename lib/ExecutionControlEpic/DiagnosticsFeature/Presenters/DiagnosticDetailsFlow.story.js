"use babel";
// @flow

import * as React from "react";
import { storiesOf } from "@kadira/storybook";
import DiagnosticDetailsFlow from "./DiagnosticDetailsFlow";
import type { MoleculeDiagnostic } from "../Types/types";

let diagnostics: Array<MoleculeDiagnostic> = [
  {
    severity: 1,
    message: "my first",
    range: { start: { line: 0, character: 0 }, end: { line: 0, character: 0 } },
  },
  {
    severity: 2,
    message: "my second diagnostic",
    range: { start: { line: 0, character: 0 }, end: { line: 0, character: 0 } },
  },
  {
    severity: 3,
    message: "ok",
    range: { start: { line: 0, character: 0 }, end: { line: 0, character: 0 } },
  },
  {
    severity: 5,
    message: "succeed",
    range: { start: { line: 0, character: 0 }, end: { line: 0, character: 0 } },
  },
];

storiesOf("DiagnosticDetailsFlow", module).add("Basic", () => (
  <DiagnosticDetailsFlow diagnostics={diagnostics} />
));
