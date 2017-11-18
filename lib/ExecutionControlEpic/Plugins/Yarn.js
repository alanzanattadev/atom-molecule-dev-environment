"use babel";
// @flow

import type { PlanConfig } from "../PlanConfigurationFeature/Types/types.js.flow";
import type { TaskAPI } from "../DevtoolLoadingFeature/Types/types.js.flow";
import moment from "moment";
import path from "path";
import { File } from "atom";
import type { HelperApi } from "../TaskExecutionFeature/Model/HelperApi";
import stripAnsi from "strip-ansi";

export default {
  infos: {
    name: "yarn",
    iconUri:
      "atom://molecule-dev-environment/.storybook/public/devtool-icon-yarn.svg",
  },
  configSchema: {
    type: "conditional",
    default: "install",
    expression: {
      type: "enum",
      label: "command",
      enum: [
        { value: "install", description: "install" },
        { value: "run", description: "run" },
        { value: "test", description: "test" },
        { value: "link", description: "link" },
        { value: "unlink", description: "unlink" },
      ],
    },
    cases: {
      link: {
        type: "object",
        schemas: {
          packages: {
            label: "package",
            type: "string",
            default: "",
            placeholder: "My_Project",
          },
        },
      },
      unlink: {
        type: "object",
        schemas: {
          packages: {
            label: "package",
            type: "string",
            default: "",
            placeholder: "My_Project",
          },
        },
      },
      run: {
        type: "object",
        schemas: {
          script: {
            label: "script",
            type: "string",
            default: "",
            placeholder: "playbook...",
          },
          environmentVariables: {
            label: "environment",
            type: "array",
            items: {
              label: "variable",
              type: "string",
              placeholder: "NAME=value",
            },
          },
        },
      },
      install: null,
      test: null,
    },
  },
  getStrategyForPlan(plan: PlanConfig) {
    let command;
    let env = process.env;

    if (plan.config.expressionValue === "run") {
      command = `yarn run ${plan.config.caseValue.script}`;
      env = plan.config.caseValue.environmentVariables.reduce(function(
        env: any,
        varDeclaration: string,
      ) {
        let split = varDeclaration.split("=");
        return { ...env, [split[0]]: split[1] };
      },
      process.env);
    } else if (plan.config.expressionValue === "link") {
      command = `yarn link ${plan.config.caseValue.packages}`;
    } else if (plan.config.expressionValue === "unlink") {
      command = `yarn unlink ${plan.config.caseValue.packages}`;
    } else if (plan.config.expressionValue === "test") {
      command = command = "yarn test";
    } else {
      command = command = "yarn";
    }

    return {
      strategy: {
        type: "terminal",
        command: command,
        cwd: path.dirname(plan.packageInfos.path),
        env: env,
      },
      controller: {
        onData(data: string, taskAPI: TaskAPI, helperAPI: HelperApi): void {
          let datatype = "";

          data = stripAnsi(data);
          if (data.indexOf("success ") !== -1) {
            datatype = "success";
          } else if (data.indexOf("warning ") !== -1) {
            datatype = "warning";
          } else if (data.indexOf("error ") !== -1) {
            datatype = "error";
          } else if (data.indexOf("info ") !== -1) {
            datatype = "info";
          }

          if (datatype !== "") {
            taskAPI.addDiagnostics([
              {
                type: datatype,
                message: data,
                date: moment().unix(),
              },
            ]);
          }
        },
        onError(err: any, taskAPI: TaskAPI, helperAPI: HelperApi): void {
          taskAPI.addDiagnostics([
            {
              type: "error",
              message: {
                data: err,
              },
              date: moment().unix(),
            },
          ]);
        },
      },
    };
  },
  isPackage: (packageName: string, dirname: string) => {
    if (path.basename(packageName) === "package.json") {
      const check = new File(
        path.join(
          packageName.slice(
            0,
            packageName.lastIndexOf(path.basename(packageName)),
          ),
          "yarn.lock",
        ),
      );
      return check.exists();
    } else {
      return false;
    }
  },
};
