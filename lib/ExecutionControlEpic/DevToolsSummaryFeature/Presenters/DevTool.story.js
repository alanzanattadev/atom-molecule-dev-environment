import React from "react";
import { storiesOf, action, linkTo } from "@kadira/storybook";
import DevTool from "./DevTool";

storiesOf("DevTool", module)
  .add("Basic", () => (
    <div style={{ padding: "30" }}>
      <DevTool iconUri="devtool-icon-docker.png" />
    </div>
  ))
  .add("Succeed", () => (
    <div style={{ padding: "30" }}>
      <DevTool iconUri="devtool-icon-docker.png" state="succeed" />
    </div>
  ))
  .add("Failed", () => (
    <div style={{ padding: "30" }}>
      <DevTool iconUri="devtool-icon-docker.png" state="failed" />
    </div>
  ))
  .add("Crashed", () => (
    <div style={{ padding: "30" }}>
      <DevTool iconUri="devtool-icon-docker.png" state="crashed" />
    </div>
  ))
  .add("Running", () => (
    <div style={{ padding: "30" }}>
      <DevTool iconUri="devtool-icon-docker.png" state="running" />
    </div>
  ))
  .add("Created", () => (
    <div style={{ padding: "30" }}>
      <DevTool iconUri="devtool-icon-docker.png" state="created" />
    </div>
  ))
  .add("Stopped", () => (
    <div style={{ padding: "30" }}>
      <DevTool iconUri="devtool-icon-docker.png" state="stopped" />
    </div>
  ));
