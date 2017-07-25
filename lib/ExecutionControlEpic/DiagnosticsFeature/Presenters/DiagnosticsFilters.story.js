"use babel";

import React from "react";
import { storiesOf } from "@kadira/storybook";
import DiagnosticsFilters from "./DiagnosticsFilters";
import tasks from "../../TaskExecutionFeature/Fake/Data/Task";

storiesOf("DiagnosticsFilters", module)
  .addDecorator(story =>
    <div
      style={{
        display: "flex",
        padding: "16px",
        flex: "1 1 0",
        alignItems: "stretch",
      }}
    >
      {story()}
    </div>,
  )
  .add("Basic", () => <DiagnosticsFilters tasks={tasks} />);
