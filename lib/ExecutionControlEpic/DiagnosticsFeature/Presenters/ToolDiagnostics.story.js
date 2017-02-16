import React from "react";
import { storiesOf, action, linkTo } from "@kadira/storybook";
import ToolDiagnostics from "./ToolDiagnostics";

storiesOf("ToolDiagnostics", module).add("Basic", () => (
  <ToolDiagnostics
    diagnostics={[{ type: "warning", message: "salut" }]}
    toolName="Gulp"
  />
));
