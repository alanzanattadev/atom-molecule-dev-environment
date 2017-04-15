import React from "react";
import { storiesOf } from "@kadira/storybook";
import Stash from "./Stash";

storiesOf("Stash", module).add("Basic", () => (
  <Stash
    branchName="master"
    commitId="924979a"
    commitMessage="Adds file which is a little bit too long"
    index={0}
    name="WIP"
  />
));
