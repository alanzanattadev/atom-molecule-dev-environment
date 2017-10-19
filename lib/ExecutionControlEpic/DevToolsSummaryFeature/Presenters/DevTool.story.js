import React from "react";
import { storiesOf } from "@kadira/storybook";
import DevTool from "./DevTool";

storiesOf("DevTool", module)
  .add("Basic", () => (
    <div
      style={{
        padding: "30",
        height: "200px",
        display: "flex",
        alignItems: "flex-end",
        marginLeft: "100px",
      }}
    >
      <DevTool iconUri="devtool-icon-docker.png" />
    </div>
  ))
  .add("Succeed", () => (
    <div
      style={{
        padding: "30",
        height: "200px",
        display: "flex",
        alignItems: "flex-end",
        marginLeft: "100px",
      }}
    >
      <DevTool iconUri="devtool-icon-docker.png" state="succeed" />
    </div>
  ))
  .add("Failed", () => (
    <div
      style={{
        padding: "30",
        height: "200px",
        display: "flex",
        alignItems: "flex-end",
        marginLeft: "100px",
      }}
    >
      <DevTool iconUri="devtool-icon-docker.png" state="failed" />
    </div>
  ))
  .add("Crashed", () => (
    <div
      style={{
        padding: "30",
        height: "200px",
        display: "flex",
        alignItems: "flex-end",
        marginLeft: "100px",
      }}
    >
      <DevTool iconUri="devtool-icon-docker.png" state="crashed" />
    </div>
  ))
  .add("Running", () => (
    <div
      style={{
        padding: "30",
        height: "200px",
        display: "flex",
        alignItems: "flex-end",
        marginLeft: "100px",
      }}
    >
      <DevTool iconUri="devtool-icon-docker.png" state="running" />
    </div>
  ))
  .add("Busy", () => (
    <div
      style={{
        padding: "30",
        height: "200px",
        display: "flex",
        alignItems: "flex-end",
        marginLeft: "100px",
      }}
    >
      <DevTool iconUri="devtool-icon-docker.png" state="running" busy={true} />
    </div>
  ))
  .add("Created", () => (
    <div
      style={{
        padding: "30",
        height: "200px",
        display: "flex",
        alignItems: "flex-end",
        marginLeft: "100px",
      }}
    >
      <DevTool iconUri="devtool-icon-docker.png" state="created" />
    </div>
  ))
  .add("Stopped", () => (
    <div
      style={{
        padding: "30",
        height: "200px",
        display: "flex",
        alignItems: "flex-end",
        marginLeft: "100px",
      }}
    >
      <DevTool iconUri="devtool-icon-docker.png" state="stopped" />
    </div>
  ))
  .add("Color", () => (
    <div
      style={{
        padding: "30",
        height: "200px",
        display: "flex",
        alignItems: "flex-end",
        marginLeft: "100px",
      }}
    >
      <DevTool
        iconUri="devtool-icon-docker.png"
        state="running"
        color="#836BEB"
      />
    </div>
  ))
  .add("Show Color", () => (
    <div
      style={{
        padding: "30",
        height: "200px",
        display: "flex",
        alignItems: "flex-end",
        marginLeft: "100px",
      }}
    >
      <DevTool
        iconUri="devtool-icon-docker.png"
        state="running"
        color="#836BEB"
        showColor
        legend="Server"
      />
    </div>
  ));
