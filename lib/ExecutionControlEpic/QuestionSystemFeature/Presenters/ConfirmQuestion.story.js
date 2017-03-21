import React from "react";
import {action, linkTo, storiesOf} from "@kadira/storybook";
import ConfirmQuestion from "./ConfirmQuestion";

storiesOf("ConfirmQuestion", module).add("Basic", () => (
  <div
    style={{
      width: "500px",
      height: "300px",
      backgroundColor: "#7900EB",
      alignItems: "stretch",
      display: "flex",
    }}
  >
    <ConfirmQuestion {...{ message: "Do you want to connect as admin ?" }} />
  </div>
));
