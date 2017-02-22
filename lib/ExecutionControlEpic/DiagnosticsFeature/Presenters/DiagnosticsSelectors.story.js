import React from "react";
import { storiesOf, action, linkTo } from "@kadira/storybook";
import DiagnosticsSelectors from "./DiagnosticsSelectors";

storiesOf("DiagnosticsSelectors", module).add("Basic", () => (
  <DiagnosticsSelectors
    diagnostics={[
      {
        type: "warning"
      },
      {
        type: "error"
      },
      {
        type: "warning"
      },
      {
        type: "error"
      },
      {
        type: "success"
      },
      {
        type: "info"
      },
      {
        type: "info"
      },
      {
        type: "error"
      }
    ]}
  />
));
