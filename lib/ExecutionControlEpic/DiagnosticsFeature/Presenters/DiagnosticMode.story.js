import React from "react";
import { storiesOf } from "@kadira/storybook";
import DiagnosticMode from "./DiagnosticMode";

storiesOf("DiagnosticMode", module)
  .add("Basic", () => (
    <div>
      <DiagnosticMode iconUri="organized-mode-icon.svg" name="Organized" />
    </div>
  ))
  .add("Active", () => (
    <div>
      <DiagnosticMode
        iconUri="organized-mode-icon.svg"
        name="Organized"
        active
      />
    </div>
  ))
  .add("Many", () => (
    <div>
      <DiagnosticMode iconUri="logs-mode-icon.svg" name="Logs" />
      <DiagnosticMode
        iconUri="organized-mode-icon.svg"
        name="Organized"
        active
      />
      <DiagnosticMode iconUri="devtool-icon-term.png" name="Terminal" />
    </div>
  ));
