"use babel";
// @flow

import path from "path";
import type { PlanConfig } from "../../PlanConfigurationFeature/Types/types.js.flow";
import type { ProvidedDevTool } from "../Types/types.js.flow";

export function requireDevtool(plan: PlanConfig): ?ProvidedDevTool {
  const toolName = plan.tool.name;
  let toolFileName;
  switch (toolName) {
    case "jest":
      toolFileName = "Jest";
      break;
    case "webpack":
      toolFileName = "Webpack";
      break;
    case "npm":
      toolFileName = "Npm";
      break;
    case "eslint":
      toolFileName = "Eslint";
      break;
    case "flow":
      toolFileName = "Flowtype";
      break;
    case "nightwatch":
      toolFileName = "Nightwatch";
      break;
    case "testcafe":
      toolFileName = "Testcafe";
      break;
    case "gulp":
      toolFileName = "Gulp";
      break;
    case "shell":
      toolFileName = "Shell";
      break;
    default:
      toolFileName = null;
  }
  if (toolFileName !== null) {
    const devtoolPath = path.join(
      __dirname,
      "..",
      "..",
      "Plugins",
      toolFileName,
    );
    const devtool = require(devtoolPath);
    return devtool;
  } else {
    return null;
  }
}
