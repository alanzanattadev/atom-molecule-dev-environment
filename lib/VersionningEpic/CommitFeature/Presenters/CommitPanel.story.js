import React from "react";
import { storiesOf } from "@kadira/storybook";
import CommitPanel from "./CommitPanel";

storiesOf("CommitPanel", module).add("Basic", () => (
  <CommitPanel
    files={[
      { path: "./lib/", status: "modified" },
      { path: ".gitignore", status: "modified" },
      { path: "./tests", status: "added" },
      { path: ".flowconfig", status: "added" },
      { path: "package.json", status: "modified" },
      { path: "npm-debug.log", status: "removed" },
    ]}
  />
));
