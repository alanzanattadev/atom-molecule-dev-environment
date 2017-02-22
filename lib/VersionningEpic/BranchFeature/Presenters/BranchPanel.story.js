import React from "react";
import { storiesOf, action, linkTo } from "@kadira/storybook";
import BranchPanel from "./BranchPanel";

storiesOf("BranchPanel", module).add("Basic", () => (
  <div
    style={{
      width: "300px",
      display: "flex",
      flexDirection: "column",
      alignItems: "stretch"
    }}
  >
    <BranchPanel
      branches={[
        { name: "master", current: false },
        { name: "dev", current: true },
        { name: "feature-a", current: false },
        { name: "feature-b", current: false },
        { name: "prerelease", current: false }
      ]}
      remotes={[{ name: "origin" }, { name: "github" }, { name: "backup" }]}
      onRebase={action("rebase")}
      onMerge={action("merge")}
      onCheckout={action("checkout")}
      onPush={action("push")}
      onPull={action("pull")}
      onRemoveBranch={action("remove branch")}
      onRemoveRemote={action("remove remote")}
      onCreateBranch={action("create branch")}
    />
  </div>
));
