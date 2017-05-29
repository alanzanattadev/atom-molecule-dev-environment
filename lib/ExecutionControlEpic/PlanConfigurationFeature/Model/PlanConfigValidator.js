"use babel";
// @flow

import {
  DevToolsControllerInstance as DevToolsController,
} from "../../DevtoolLoadingFeature/Model/DevToolsController";

export default function(value: any, props: any): boolean {
  if (
    value.name === undefined ||
    value.name.length === 0 ||
    value.packages === undefined
  ) {
    return false;
  }

  let validator = DevToolsController.getValidationMethodForPlugin(props.toolId);
  if (validator !== null && validator !== undefined) {
    return validator(value, props);
  } else return true;
}
