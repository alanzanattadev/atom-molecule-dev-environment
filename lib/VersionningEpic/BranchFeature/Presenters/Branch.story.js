import React from "react";
import { storiesOf } from "@kadira/storybook";
import Branch from "./Branch";

storiesOf("Branch", module)
  .add("Basic", () => <Branch name="master" />)
  .add("Current", () => <Branch name="dev" current />);
