import React from "react";
import { storiesOf } from "@kadira/storybook";
import DiagnosticsModeSelector from "./DiagnosticsModeSelector";

storiesOf("DiagnosticsModeSelector", module)
  .add("Logs", () => <DiagnosticsModeSelector type="logs" />)
  .add("Organized", () => <DiagnosticsModeSelector type="organized" />);
