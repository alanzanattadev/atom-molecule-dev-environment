import React from "react";
import { storiesOf } from "@kadira/storybook";
import DevToolsWithDiagnostics from "./DevToolsWithDiagnostics";

storiesOf("DevToolsWithDiagnostics", module)
  .add("Basic", () => (
    <div style={{ height: "300px", display: "flex", alignItems: "center" }}>
      <DevToolsWithDiagnostics
        tools={[
          {
            errors: 1,
            warnings: 2,
            name: "webpack",
            iconUri: "devtool-icon-webpack.png",
            planColor: "#EB7BCF",
            legend: "build",
          },
          {
            infos: 9,
            name: "npm",
            iconUri: "devtool-icon-npm.svg",
            planColor: "#4B9E9E",
            legend: "build",
          },
          {
            successes: 1,
            errors: 5,
            name: "jest",
            iconUri: "devtool-icon-jest.png",
            planColor: "#95EB6B",
            legend: "build",
          },
          {
            errors: 0,
            successes: 0,
            warnings: 0,
            infos: 0,
            name: "redux",
            iconUri: "devtool-icon-redux.png",
            state: "running",
            planColor: "#BAA3EB",
            legend: "build",
          },
          {
            errors: 2,
            successes: 0,
            warnings: 1,
            infos: 7,
            name: "flow",
            iconUri: "devtool-icon-flow.png",
            planColor: "#BAA3EB",
            legend: "build",
          },
          {
            errors: 2,
            successes: 5,
            warnings: 1,
            infos: 7,
            name: "chrome",
            iconUri: "devtool-icon-chrome.png",
            planColor: "#4B9E9E",
            legend: "build",
          },
        ]}
      />
    </div>
  ))
  .add("Show Color", () => (
    <div style={{ height: "300px", display: "flex", alignItems: "center" }}>
      <DevToolsWithDiagnostics
        showColor
        tools={[
          {
            errors: 1,
            warnings: 2,
            name: "webpack",
            iconUri: "devtool-icon-webpack.png",
            planColor: "#EB7BCF",
            legend: "build",
          },
          {
            infos: 9,
            name: "npm",
            iconUri: "devtool-icon-npm.svg",
            planColor: "#4B9E9E",
            legend: "serve",
          },
          {
            successes: 1,
            errors: 5,
            name: "jest",
            iconUri: "devtool-icon-jest.png",
            planColor: "#95EB6B",
            legend: "test",
          },
          {
            errors: 0,
            successes: 0,
            warnings: 0,
            infos: 0,
            name: "redux",
            iconUri: "devtool-icon-redux.png",
            state: "running",
            planColor: "#BAA3EB",
            legend: "redux",
          },
          {
            errors: 2,
            successes: 0,
            warnings: 1,
            infos: 7,
            name: "flow",
            iconUri: "devtool-icon-flow.png",
            planColor: "#BAA3EB",
          },
          {
            errors: 2,
            successes: 5,
            warnings: 1,
            infos: 7,
            name: "chrome",
            iconUri: "devtool-icon-chrome.png",
            planColor: "#4B9E9E",
          },
        ]}
      />
    </div>
  ));
