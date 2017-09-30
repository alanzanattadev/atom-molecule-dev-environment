import React from "react";
import { storiesOf } from "@kadira/storybook";
import DiagnosticsTypeFilter from "./DiagnosticsTypeFilter";

storiesOf("DiagnosticsTypeFilter", module)
  .addDecorator(story => (
    <div style={{ padding: "10px", display: "flex" }}>{story()}</div>
  ))
  .add("Info", () => <DiagnosticsTypeFilter activated type="info" />)
  .add("Warning", () => <DiagnosticsTypeFilter activated type="warning" />)
  .add("Error", () => <DiagnosticsTypeFilter activated type="error" />)
  .add("Success", () => <DiagnosticsTypeFilter activated type="success" />)
  .add("Success Disabled", () => <DiagnosticsTypeFilter type="success" />);
