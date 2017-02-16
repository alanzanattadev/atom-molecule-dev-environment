import React from "react";
import { storiesOf, action, linkTo } from "@kadira/storybook";
import Branch from "./Branch";

storiesOf("Branch", module)
  .add("Basic", () => <Branch name="master" />)
  .add("Current", () => <Branch name="dev" current />);
