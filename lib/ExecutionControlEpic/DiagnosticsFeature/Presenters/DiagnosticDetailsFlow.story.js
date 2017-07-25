"use babel";
// @flow

import React from "react";
import { storiesOf } from "@kadira/storybook";
import DiagnosticDetailsFlow from "./DiagnosticDetailsFlow";
import type { Diagnostic } from "../Types/types";

let diagnostics: Array<Diagnostic> = [
  {
    type: "error",
    message: "my first",
  },
  {
    type: "warning",
    message: "my second diagnostic",
  },
  {
    type: "info",
    message: "ok",
  },
  {
    type: "success",
    message: "succeed",
  },
];

storiesOf("DiagnosticDetailsFlow", module).add("Basic", () =>
  <DiagnosticDetailsFlow diagnostics={diagnostics} />,
);
