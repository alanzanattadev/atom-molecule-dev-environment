import React from "react";
import { storiesOf, action, linkTo } from "@kadira/storybook";
import DevToolName from "./DevToolName";

storiesOf("DevToolName", module).add("Basic", () => (
  <DevToolName>Docker</DevToolName>
));
