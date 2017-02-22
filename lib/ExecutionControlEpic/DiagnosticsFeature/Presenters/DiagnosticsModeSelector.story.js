import React from "react";
import { storiesOf, action, linkTo } from "@kadira/storybook";
import DiagnosticsModeSelector from "./DiagnosticsModeSelector";

storiesOf("DiagnosticsModeSelector", module)
  .add("Logs", () => <DiagnosticsModeSelector type="logs" />)
  .add("Organized", () => <DiagnosticsModeSelector type="organized" />);
