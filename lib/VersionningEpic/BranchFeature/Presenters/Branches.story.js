import React from "react";
import {action, linkTo, storiesOf} from "@kadira/storybook";
import Branches from "./Branches";

storiesOf("Branches", module).add("Basic", () => (
  <Branches
    branches={[
      { name: "master", current: false },
      { name: "dev", current: true },
      { name: "feature-a", current: false },
      { name: "feature-b", current: false },
      { name: "prerelease", current: false },
    ]}
  />
));
