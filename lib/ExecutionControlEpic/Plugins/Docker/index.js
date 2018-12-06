"use babel";
// @flow

import type {
  GeneratedPlanObject,
  PlanConfig,
} from "../../PlanConfigurationFeature/Types/types";
import type { PackageTesterResult } from "../../../ProjectSystemEpic/PackageFeature/Types/types";
import type { Plugin } from "../../DevtoolLoadingFeature/Types/types";
import path from "path";
import yaml from "js-yaml";
import fs from "fs";
import moment from "moment";

const plugin: Plugin = {
  info: {
    name: "docker",
    dominantColor: "#339fee",
    iconUri: "atom://molecule/images/plugins/docker.svg",
  },

  configSchema: {
    type: "object",
    schemas: {
      command: {
        type: "enum",
        label: "command",
        default: "start",
        enum: [
          { value: "build", description: "build" },
          { value: "up", description: "up" },
          { value: "push", description: "push" },
        ],
      },
      serviceName: {
        type: "string",
        label: "service name",
        placeholder: "database,web... empty for all",
        default: "",
      },
      bin: {
        type: "string",
        label: "binary path",
        placeholder: "docker-compose",
        default: "docker-compose",
      },
    },
  },

  getStrategyForPlan(plan: PlanConfig) {
    if (plan.config.command === "up") {
      return {
        strategy: {
          type: "node",
          path: path.join(__dirname, "lsp"),
          cwd: path.dirname(plan.packageInfo.path),
          lsp: true,
          env: {
            COMPOSE_COMMAND: JSON.stringify({
              bin: plan.config.bin,
              command: plan.config.command,
              service: plan.config.serviceName,
              configFile: plan.packageInfo.path,
            }),
          },
        },
      };
    } else {
      const command = `${plan.config.bin} -f ${plan.packageInfo.path} ${
        plan.config.command
      } ${plan.config.serviceName}`;
      return {
        strategy: {
          type: "terminal",
          cwd: path.dirname(plan.packageInfo.path),
          command: command,
          env: process.env,
        },
        controller: {
          onData(data: string, taskAPI: TaskAPI, helperAPI: HelperAPI) {},
          onError(err: any, taskAPI: TaskAPI, helperAPI: HelperAPI) {
            taskAPI.diagnostics.setForWorkspace({
              uri: "docker-compose",
              diagnostics: [
                {
                  range: {
                    start: { line: -1, character: -1 },
                    end: { line: -1, character: -1 },
                  },
                  severity: helperAPI.severity.error,
                  message: `Error: ${err.code | 1}`.toString(),
                  date: moment().unix(),
                },
              ],
            });
          },
        },
      };
    }
  },

  async isPackage(packagePath: string): PackageTesterResult {
    if (!packagePath.endsWith(".yaml")) {
      return false;
    }

    const rawData = await new Promise((resolve, reject) => {
      fs.readFile(packagePath, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
    const fileConfig = yaml.safeLoad(rawData);
    return "version" in fileConfig && "services" in fileConfig;
  },

  async generatePlansForPackage(
    packagePath: string,
  ): Promise<Array<GeneratedPlanObject>> {
    const rawData = await new Promise((resolve, reject) => {
      fs.readFile(packagePath, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
    const fileConfig = yaml.safeLoad(rawData);

    return Promise.resolve([
      {
        name: `up`,
        value: {
          command: "up",
          serviceName: "",
          bin: "docker-compose",
        },
        autorun: false,
        ownSource: true,
      },
      {
        name: `build`,
        value: {
          command: "build",
          serviceName: "",
          bin: "docker-compose",
        },
        autorun: false,
      },
      {
        name: `push`,
        value: {
          command: "push",
          serviceName: "",
          bin: "docker-compose",
        },
        autorun: false,
      },
      ...Object.keys(fileConfig.services || {})
        .map(serviceName => [
          {
            name: `up ${serviceName}`,
            value: {
              command: "up",
              serviceName: serviceName,
              bin: "docker-compose",
            },
            autorun: false,
            ownSource: true,
          },
          {
            name: `${
              fileConfig.services[serviceName].image ? "pull" : "build"
            } ${serviceName}`,
            value: {
              command: `${
                fileConfig.services[serviceName].image ? "pull" : "build"
              }`,
              serviceName: serviceName,
              bin: "docker-compose",
            },
            autorun: false,
          },
          {
            name: `push ${serviceName}`,
            value: {
              command: "push",
              serviceName: serviceName,
              bin: "docker-compose",
            },
            autorun: false,
          },
        ])
        .reduce((red, arr) => [...red, ...arr], []),
    ]);
  },
};

export default plugin;
