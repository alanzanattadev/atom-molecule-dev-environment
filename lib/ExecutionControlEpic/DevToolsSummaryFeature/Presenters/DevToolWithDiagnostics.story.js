import React from "react";
import { storiesOf } from "@kadira/storybook";
import DevToolWithDiagnostics from "./DevToolWithDiagnostics";

storiesOf("DevToolWithDiagnostics", module)
  .addDecorator(story => (
    <div style={{ padding: "40px" }}>
      {story()}
    </div>
  ))
  .add("Basic", () => (
    <DevToolWithDiagnostics
      name="nightwatch"
      iconUri="devtool-icon-nightwatch.png"
    />
  ))
  .add("Errors", () => (
    <DevToolWithDiagnostics
      name="nightwatch"
      iconUri="devtool-icon-nightwatch.png"
      errors={2}
    />
  ))
  .add("Warnings", () => (
    <DevToolWithDiagnostics
      name="nightwatch"
      iconUri="devtool-icon-nightwatch.png"
      warnings={2}
    />
  ))
  .add("Errors and Successes", () => (
    <DevToolWithDiagnostics
      name="nightwatch"
      iconUri="devtool-icon-nightwatch.png"
      errors={3}
      successes={5}
    />
  ))
  .add("Warnings, Errors and Infos", () => (
    <DevToolWithDiagnostics
      name="nightwatch"
      iconUri="devtool-icon-nightwatch.png"
      warnings={2}
      errors={5}
      infos={1}
    />
  ))
  .add("Everything", () => (
    <DevToolWithDiagnostics
      name="nightwatch"
      iconUri="devtool-icon-nightwatch.png"
      warnings={2}
      errors={5}
      infos={2}
      successes={6}
    />
  ))
  .add("Overflow", () => (
    <DevToolWithDiagnostics
      name="nightwatch"
      iconUri="devtool-icon-nightwatch.png"
      warnings={2231}
      errors={51}
      infos={2}
      successes={610231}
    />
  ))
  .add("Color", () => (
    <DevToolWithDiagnostics
      name="nightwatch"
      iconUri="devtool-icon-nightwatch.png"
      warnings={10}
      errors={51}
      infos={2}
      successes={3}
      state="running"
      planColor="#836BEB"
    />
  ))
  .add("Show Color", () => (
    <DevToolWithDiagnostics
      name="nightwatch"
      iconUri="devtool-icon-nightwatch.png"
      warnings={10}
      errors={51}
      infos={2}
      successes={3}
      state="running"
      planColor="#836BEB"
      showColor
    />
  ))
  .add("Many", () => (
    <div style={{ display: "flex" }}>
      <DevToolWithDiagnostics
        name="nightwatch"
        iconUri="devtool-icon-nightwatch.png"
        warnings={2}
        errors={5}
        infos={2}
        successes={6}
      />
      <DevToolWithDiagnostics
        name="gulp"
        iconUri="devtool-icon-gulp.svg"
        warnings={2}
        errors={5}
        infos={2}
        successes={6}
      />
      <DevToolWithDiagnostics
        name="chrome"
        iconUri="devtool-icon-chrome.png"
        warnings={2}
        errors={5}
        successes={6}
        state="running"
      />
      <DevToolWithDiagnostics name="redux" iconUri="devtool-icon-redux.png" />
      <DevToolWithDiagnostics
        name="npm"
        iconUri="devtool-icon-npm.svg"
        errors={5}
        successes={6}
        state="running"
      />
      <DevToolWithDiagnostics
        name="jest"
        iconUri="devtool-icon-jest.png"
        warnings={2}
        errors={5}
        infos={2}
      />
      <DevToolWithDiagnostics
        name="webpack"
        iconUri="devtool-icon-webpack.png"
        infos={2}
      />
      <DevToolWithDiagnostics
        name="docker"
        iconUri="devtool-icon-docker.png"
        warnings={2}
        errors={5}
        infos={2}
        successes={6}
      />
    </div>
  ));
