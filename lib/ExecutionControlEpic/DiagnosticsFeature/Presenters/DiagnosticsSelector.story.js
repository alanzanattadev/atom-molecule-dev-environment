import React from "react";
import { storiesOf } from "@kadira/storybook";
import DiagnosticsSelector from "./DiagnosticsSelector";

storiesOf("DiagnosticsSelector", module)
  .add("Basic", () => <DiagnosticsSelector type="warning" index={2} of={5} />)
  .add("Only 1", () => <DiagnosticsSelector type="warning" index={0} of={1} />)
  .add("Error", () => <DiagnosticsSelector type="error" index={2} of={5} />);
