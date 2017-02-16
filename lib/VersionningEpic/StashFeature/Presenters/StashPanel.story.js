import React from "react";
import { storiesOf, action, linkTo } from "@kadira/storybook";
import StashPanel from "./StashPanel";

storiesOf("StashPanel", module).add("Basic", () => (
  <StashPanel
    stashs={[
      {
        commitId: "aab2329",
        commitMessage: "Adds authentication for facebook users",
        branchName: "dev",
        name: "WIP",
        index: 0
      },
      {
        commitId: "23ddf93",
        commitMessage: "merge",
        branchName: "master",
        name: "WIP",
        index: 1
      },
      {
        commitId: "0923d23",
        commitMessage: "initial commit",
        branchName: "master",
        name: "WIP",
        index: 2
      }
    ]}
  />
));
