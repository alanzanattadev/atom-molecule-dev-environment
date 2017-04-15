"use babel";
// @flow

import { fromJS } from "immutable";
import type { ConfigSchemaPart } from "../Types/types.js.flow";

export function getDefault(config: ConfigSchemaPart): mixed {
  if (!config) return null;
  switch (config.type) {
    case "conditional":
      return {
        expressionValue: getDefault(config.expression),
        caseValue: getDefault(config.cases[getDefault(config.expression)]),
      };
    case "number":
      return config.default || 0;
    case "string":
      return config.default || "";
    case "object":
      return fromJS(config.schemas)
        .reduce(
          (red, schema, key) => red.set(key, getDefault(schema.toJS())),
          fromJS({}),
        )
        .toJS();
    case "array":
      return config.default || [];
    case "enum":
      return config.default || config.enum[0].value;
    case "boolean":
      return config.default || false;
    default:
      return null;
  }
}
