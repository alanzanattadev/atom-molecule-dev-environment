import React from "react";
import { storiesOf, action, linkTo } from "@kadira/storybook";
import DiagnosticDetailsFlow from "./DiagnosticDetailsFlow";

let diagnostics: Array<Diagnostic> = [
  {
    type: "error",
    message: "my first"
  },
  {
    type: "warning",
    message: "my second diagnostic"
  },
  {
    type: "info",
    message: "ok"
  },
  {
    type: "success",
    message: "succeed"
  }
];

storiesOf("DiagnosticDetailsFlow", module).add("Basic", () => (
  <DiagnosticDetailsFlow diagnostics={diagnostics} />
));
