import React from "react";
import { storiesOf } from "@kadira/storybook";
import Task from "./Task";
import moment from "moment";

storiesOf("Task", module)
  .addDecorator(story => (
    <div style={{ display: "flex", padding: "10px" }}>{story()}</div>
  ))
  .add("Running", () => <Task state="running" debut={moment().unix()} />)
  .add("Stopped", () => (
    <Task
      state="stopped"
      debut={moment()
        .subtract("2", "minutes")
        .unix()}
      end={moment()
        .subtract(1, "s")
        .unix()}
    />
  ))
  .add("Crashed", () => (
    <Task
      state="crashed"
      debut={moment()
        .subtract("2", "minutes")
        .unix()}
      end={moment()
        .subtract(1, "s")
        .unix()}
    />
  ));
