"use babel";
// @flow

import { runLocalStager } from "./LocalStager";
import { runIntegratedStager } from "./IntegratedStager";
import type { JsonRPCStreams } from "../Types/jsonrpc-stream";
import type { StagerConfig } from "../Types/stagers";
import LanguageServerConnection from "./LanguageServerConnection";
import type { PlanConfig } from "../../PlanConfigurationFeature/Types/types.js.flow";

export function runStager(config: {
  stagerConfig: StagerConfig,
  plan: PlanConfig,
}): ?{
  streams: JsonRPCStreams,
} {
  switch (config.stagerConfig.type) {
    case "integrated":
      return runIntegratedStager({ plan: config.plan });
    case "local":
      return runLocalStager({ plan: config.plan });
    default:
      console.error("Unknown stager");
      return null;
  }
}

export function runLanguageClient(config: {
  stagerConfig: StagerConfig,
  plan: PlanConfig,
}): {
  connection: ?LanguageServerConnection,
} {
  const stagerInfos = runStager(config);
  if (stagerInfos == null) {
    console.error("Error while running stager");
    return {
      connection: null,
    };
  } else {
    const connection = new LanguageServerConnection({ ...stagerInfos.streams });
    return {
      connection,
    };
  }
}
