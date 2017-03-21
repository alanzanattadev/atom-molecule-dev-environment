import React from "react";
import {action, linkTo, storiesOf} from "@kadira/storybook";
import DiagnosticsTraveller from "./DiagnosticsTraveller";

storiesOf("DiagnosticsTraveller", module).add("Basic", () => (
  <DiagnosticsTraveller
    diagnostics={[
      { type: "error", message: "my error" },
      { type: "error", message: "my error 2" },
      { type: "warning", message: "my warning" },
      { type: "error", message: "my error 3" },
      { type: "warning", message: "my warning 2" },
      { type: "info", message: "my info" },
      { type: "success", message: "my success" },
      { type: "success", message: "my success 2" },
      { type: "error", message: "my error 4" },
      { type: "error", message: "my error 5" },
      { type: "error", message: "my error 6" },
      { type: "warning", message: "my warning 3" },
      { type: "error", message: "my error 7" },
    ]}
  />
));
