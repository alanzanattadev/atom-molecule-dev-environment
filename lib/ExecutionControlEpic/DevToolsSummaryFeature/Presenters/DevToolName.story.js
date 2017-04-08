import React from "react";
import { storiesOf } from "@kadira/storybook";
import DevToolName from "./DevToolName";

storiesOf("DevToolName", module).add("Basic", () => (
  <DevToolName>Docker</DevToolName>
));
