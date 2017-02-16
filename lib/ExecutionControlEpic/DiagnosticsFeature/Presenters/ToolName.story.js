import React from "react";
import { storiesOf, action, linkTo } from "@kadira/storybook";
import ToolName from "./ToolName";

storiesOf("ToolName", module)
  .add("Gulp", () => <ToolName>Gulp</ToolName>)
  .add("Nightwatch", () => <ToolName>Nightwatch</ToolName>);
