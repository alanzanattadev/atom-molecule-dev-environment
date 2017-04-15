"use babel";
// @flow

import type {
  PlanConfig,
} from "../PlanConfigurationFeature/Types/types.js.flow";
import type { TaskAPI } from "../DevtoolLoadingFeature/Types/types.js.flow";
import path from "path";
import moment from "moment";
import type { HelperApi } from "../TaskExecutionFeature/Model/HelperApi";

export default {
  infos: {
    name: "eslint",
    iconUri: "atom://molecule-dev-environment/.storybook/public/devtool-icon-eslint.svg",
  },
  configSchema: {
    type: "object",
    schemas: {
      binary: {
        type: "conditional",
        expression: {
          type: "enum",
          enum: [
            { value: "local", description: "local" },
            { value: "global", description: "global" },
          ],
        },
        cases: {
          local: null,
          global: null,
        },
      },
      sources: {
        type: "object",
        title: "sources files",
        schemas: {
          source: {
            type: "string",
            title: "source",
            placeholder: "lib/",
            default: "lib/",
          },
          sourceArray: {
            type: "array",
            title: "aditional files",
            items: {
              type: "string",
              title: "source",
              placeholder: "lib/",
            },
          },
        },
      },
    },
  },
  getStrategyForPlan(plan: PlanConfig) {
    let binaryPath;
    const sources = `${plan.config.sources.source} ${plan.config.sources.sourceArray.join(
      " ",
    )}`;
    if (plan.config.binary.expressionValue === "local") {
      binaryPath = `${path.join(
        path.dirname(plan.packageInfos.path),
        "node_modules",
        ".bin",
        "eslint",
      )}`;
    } else
      binaryPath = "eslint";
    const cmd = `${binaryPath} ${sources} -f codeframe`;
    return {
      strategy: {
        type: "shell",
        command: cmd,
        cwd: path.dirname(plan.packageInfos.path),
      },
      controller: {
        onStdoutData(
          data: string,
          taskAPI: TaskAPI,
          helperAPI: HelperApi,
        ): void {
          taskAPI.cache.push(data.toString());
        },
        onStderrData(
          data: string,
          taskAPI: TaskAPI,
          helperAPI: HelperApi,
        ): void {
          taskAPI.addDiagnostics([
            {
              type: "error",
              message: {
                text: helperAPI.outputToHTML(data.toString()),
                html: true,
              },
              date: moment().unix(),
            },
          ]);
        },
        onExit(code: number, taskAPI: TaskAPI, helperAPI: HelperApi): void {
          taskAPI.cache.get().map(blob => {
            taskAPI.addDiagnostics(
              blob.data.split("\n\n\n").map(diagnostic => {
                let type;
                if (diagnostic.indexOf("warning") == 0) {
                  type = "warning";
                } else if (diagnostic.indexOf("error") == 0) {
                  type = "error";
                } else {
                  type = "info";
                }
                let jumpTo;
                if (type != "info") {
                  // eslint-disable-next-line prettier/prettier
                  jumpTo = diagnostic.split("\n")[0].split(" ").pop().split(":");
                } else {
                  jumpTo = false;
                }
                return {
                  type: type,
                  message: {
                    text: helperAPI.outputToHTML(diagnostic),
                    html: true,
                  },
                  date: moment().unix(),
                  location: (
                    jumpTo != false
                      ? {
                          path: jumpTo[0],
                          line: parseInt(jumpTo[1]) - 1,
                          column: parseInt(jumpTo[2]) - 1,
                        }
                      : false
                  ),
                };
              }),
            );
          });
        },
        onError(err: any, taskAPI: TaskAPI, helperAPI: HelperApi): void {
          taskAPI.addDiagnostics([
            {
              type: "error",
              message: { data: err },
              date: moment().unix(),
            },
          ]);
        },
      },
    };
  },
  isPackage: (packageName: string, dirname: string) =>
    path.basename(packageName).indexOf("eslintrc") !== -1,
};
