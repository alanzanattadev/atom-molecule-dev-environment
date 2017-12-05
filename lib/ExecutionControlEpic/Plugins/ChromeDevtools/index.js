"use babel";
// @flow

import type { PlanConfig } from "../../PlanConfigurationFeature/Types/types.js.flow";
import type { TaskAPI } from "../../DevtoolLoadingFeature/Types/types.js.flow";
import moment from "moment";
import path from "path";
import type { HelperApi } from "../../TaskExecutionFeature/Model/HelperApi";

export default {
  infos: {
    name: "chrome",
    iconUri:
      "atom://molecule-dev-environment/.storybook/public/devtool-icon-chrome.png",
  },
  configSchema: {
    type: "object",
    schemas: {
      binary: {
        type: "string",
        default: "google-chrome",
        label: "binary name",
        placeholder: "ex: google-chrome",
      },
      conf: {
        type: "conditional",
        expression: {
          type: "enum",
          enum: [
            { value: "chrome", description: "chrome" },
            { value: "console", description: "console" },
          ],
        },
        cases: {
          console: {
            type: "object",
            schemas: {
              port: {
                type: "string",
                default: "9222",
                label: "debug port",
              },
            },
          },
          chrome: {
            type: "object",
            schemas: {
              url: {
                type: "string",
                default: "",
                label: "URL",
              },
              port: {
                type: "string",
                default: "9222",
                label: "debug port",
              },
            },
          },
        },
      },
    },
  },
  getStrategyForPlan(plan: PlanConfig) {
    let strat;
    const binary =
      process.env.OS == "Windows_NT"
        ? `"C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe"`
        : plan.config.binary;
    if (plan.config.conf.expressionValue == "console") {
      strat = {
        type: "node",
        path: `${path.join(__dirname, "ChromeConsoleScript.js")}`,
        args: [`${plan.config.conf.caseValue.port}`],
      };
    } else {
      strat = {
        type: "shell",
        command: `${binary} ${
          plan.config.conf.caseValue.url
        } --new-window --remote-debugging-port=${
          plan.config.conf.caseValue.port
        }`,
      };
    }
    return {
      strategy: strat,
      controller: {
        onData(data: any, taskAPI: TaskAPI, helperAPI: HelperApi): void {
          try {
            let json = JSON.parse(data);
            if (json.type == "step") {
              taskAPI.nextStep();
            } else {
              taskAPI.addDiagnostics([
                {
                  type: json.type,
                  message: {
                    text: json.data.toString(),
                    html: true,
                  },
                  date: moment().unix(),
                },
              ]);
            }
          } catch (e) {
            taskAPI.addDiagnostics([
              {
                type: "error",
                message: e,
                date: moment().unix(),
              },
            ]);
          }
        },
        onError(err: any, taskAPI: TaskAPI, helperAPI: HelperApi): void {
          taskAPI.addDiagnostics([
            {
              type: "error",
              message: err,
              date: moment().unix(),
            },
          ]);
        },
        onStderrData(
          data: string,
          taskAPI: TaskAPI,
          helperAPI: HelperApi,
        ): void {
          taskAPI.addDiagnostics([
            {
              type: "error",
              message: data.toString(),
              date: moment().unix(),
            },
          ]);
        },
        onStdoutData(
          data: string,
          taskAPI: TaskAPI,
          helperAPI: HelperApi,
        ): void {
          taskAPI.addDiagnostics([
            {
              type: "info",
              message: data.toString(),
              date: moment().unix(),
            },
          ]);
        },
      },
    };
  },
  isPackage: false,
};
