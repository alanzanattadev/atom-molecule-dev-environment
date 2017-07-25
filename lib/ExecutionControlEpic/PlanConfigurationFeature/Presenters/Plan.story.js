import React from "react";
import { storiesOf } from "@kadira/storybook";
import Plan from "./Plan";

storiesOf("Plan", module)
  .add("Basic", () => <Plan iconUri="devtool-icon-docker.png" name="build" />)
  .add("Running", () =>
    <Plan iconUri="devtool-icon-docker.png" name="build" state="running" />,
  )
  .add("Stopped", () =>
    <Plan iconUri="devtool-icon-docker.png" name="build" state="stopped" />,
  )
  .add("Failed", () =>
    <Plan iconUri="devtool-icon-docker.png" name="build" state="failed" />,
  )
  .add("Crashed", () =>
    <Plan iconUri="devtool-icon-docker.png" name="build" state="crashed" />,
  )
  .add("Created", () =>
    <Plan iconUri="devtool-icon-docker.png" name="build" state="created" />,
  )
  .add("Succeed", () =>
    <Plan iconUri="devtool-icon-docker.png" name="build" state="succeed" />,
  )
  .add("Pinnable", () =>
    <Plan iconUri="devtool-icon-docker.png" name="build" pinnable />,
  );
