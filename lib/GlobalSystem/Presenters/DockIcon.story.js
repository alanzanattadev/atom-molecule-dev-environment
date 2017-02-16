import React from "react";
import { storiesOf, action, linkTo } from "@kadira/storybook";
import DockIcon from "./DockIcon";

storiesOf("DockIcon", module).add("Basic", () => (
  <div
    style={{
      width: "400px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "400px"
    }}
  >
    <DockIcon iconUri="devtool-icon-docker.png" name="docker" />
  </div>
));
