import React from "react";
import { storiesOf } from "@kadira/storybook";
import CheckboxQuestion from "./CheckboxQuestion";

storiesOf("CheckboxQuestion", module).add("Basic", () => (
  <div
    style={{
      width: "500px",
      height: "300px",
      backgroundColor: "#7900EB",
      alignItems: "stretch",
      display: "flex",
    }}
  >
    <CheckboxQuestion
      {...{
        message: "Choose tools you use",
        choices: [
          "Webpack",
          "Redux Devtools",
          "TestCafe",
          "Jest",
          "Docker",
          "Flow Type",
          "Gulp",
        ],
      }}
    />
  </div>
));
