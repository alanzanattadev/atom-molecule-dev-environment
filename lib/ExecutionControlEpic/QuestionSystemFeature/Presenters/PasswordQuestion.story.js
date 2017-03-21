import React from "react";
import {action, linkTo, storiesOf} from "@kadira/storybook";
import PasswordQuestion from "./PasswordQuestion";

storiesOf("PasswordQuestion", module).add("Basic", () => (
  <div
    style={{
      width: "500px",
      height: "300px",
      backgroundColor: "#7900EB",
      alignItems: "stretch",
      display: "flex",
    }}
  >
    <PasswordQuestion
      {...{ message: "What's your password ?", default: "Alan" }}
    />
  </div>
));
