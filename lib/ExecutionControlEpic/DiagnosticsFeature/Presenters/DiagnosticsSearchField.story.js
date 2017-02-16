import React from "react";
import { storiesOf, action, linkTo } from "@kadira/storybook";
import DiagnosticsSearchField from "./DiagnosticsSearchField";

storiesOf("DiagnosticsSearchField", module).add("Basic", () => (
  <DiagnosticsSearchField />
));
