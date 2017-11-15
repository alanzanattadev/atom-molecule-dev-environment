"use babel";
// @flow

import * as React from "react";
import { storiesOf } from "@kadira/storybook";
import DiagnosticDetailsFlow from "./DiagnosticDetailsFlow";
import type { Diagnostic } from "../Types/types";

let diagnostics: Array<Diagnostic> = [
  {
    severity: 1,
    message: "my first",
    step: 1,
  },
  {
    severity: 2,
    message: "my second diagnostic",
    step: 1,
  },
  {
    severity: 3,
    message: "ok",
    step: 1,
  },
  {
    severity: 5,
    message: "succeed",
    step: 1,
  },
];

storiesOf("DiagnosticDetailsFlow", module).add("Basic", () => (
  <DiagnosticDetailsFlow diagnostics={diagnostics} />
));
