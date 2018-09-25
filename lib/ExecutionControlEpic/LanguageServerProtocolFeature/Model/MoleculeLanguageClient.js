"use babel";
// @flow

import { runLocalStager } from "./LocalStager";
import { runIntegratedStager } from "./IntegratedStager";
import type { StagerConfig } from "../Types/stagers";
import LanguageServerConnection from "./LanguageServerConnection";
import Stager from "./Stager";
import type { PlanConfig } from "../../PlanConfigurationFeature/Types/types";

export function runStager(config: {
  stagerConfig: StagerConfig,
  plan: PlanConfig,
}): ?Stager {
  switch (config.stagerConfig.type) {
    case "integrated":
      return runIntegratedStager({ plan: config.plan });
    case "local":
      return runLocalStager({ plan: config.plan });
    default:
      throw new Error("Unknown stager type");
  }
}

export function runLanguageClient(config: {
  stagerConfig: StagerConfig,
  plan: PlanConfig,
}): {
  connection: ?LanguageServerConnection,
  stager: ?Stager,
} {
  const stager = runStager(config);
  const connection = new LanguageServerConnection({ ...stager.streams });
  return {
    connection,
    stager,
  };
}
