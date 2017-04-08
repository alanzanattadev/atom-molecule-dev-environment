import React from "react";
import { storiesOf } from "@kadira/storybook";
import SelectableFilePath from "./SelectableFilePath";

storiesOf("SelectableFilePath", module).add("Basic", () => (
  <div style={{ width: "300px" }}>
    <SelectableFilePath path="./lib/myEpic/Component.js" status="modified" />
  </div>
));
