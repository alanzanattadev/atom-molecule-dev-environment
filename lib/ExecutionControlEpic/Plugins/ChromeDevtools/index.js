"use babel";
// @flow
import type {
  PlanConfig
} from "../PlanConfigurationFeature/Types/types.js.flow";
import type { TaskAPI } from "../DevtoolLoadingFeature/Types/types.js.flow";
import moment from "moment";
import path from "path";

export default {
  infos: {
    name: "chrome",
    iconUri: "atom://molecule-dev-environment/.storybook/public/devtool-icon-chrome.png"
  },
  configSchema: {
    type: "object",
    schemas: {
      conf: {
        type: "conditional",
        expression: {
          type: "enum",
          enum: [
            { value: "chrome", description: "chrome" },
            { value: "console", description: "console" }
          ]
        },
        cases : {
          console : {
            type: "object",
            schemas: {
              port: {
                type: "string",
                default: '9222',
                title: 'debug port'
              }
            }
          },
          chrome : {
            type: "object",
            schemas: {
              url: {
                type: 'string',
                default: '',
                title: 'URL'
              },
              port: {
                type: "string",
                default: '9222',
                title: 'debug port'
              }
            }
          }
        }
      }
    }
  },
  getStrategyForPlan(plan: PlanConfig) {
    let strat;
    if (plan.config.conf.expressionValue == "console") {
      strat = {
        type: 'node',
        path: `${path.join(__dirname, 'ChromeConsoleScript.js')}`,
        args: [ `${plan.config.conf.caseValue.port}` ],
      };
    } else {
      strat = {
        type: 'shell',
        command: `google-chrome-stable ${plan.config.conf.caseValue.url} --remote-debugging-port=${plan.config.conf.caseValue.port}`,
      };
    }
    return {
      strategy: strat,
      controller: {
        onData(data: any, taskAPI: TaskAPI, helperAPI) : void {
          try {
            let json = JSON.parse(data);
            if (json.type == 'step') {
              taskAPI.nextStep();
            } else {
              taskAPI.addDiagnostics([{
                type: json.type,
                message: {
                  text : json.data.toString(),
                  html : true
                },
                date: moment().unix()
              }]);
            }
          } catch(e) {
            taskAPI.addDiagnostics([{
              type: 'error',
              message: e,
              date: moment().unix()
            }]);
          }
        },
        onExit(code: number, taskAPI: TaskAPI, helperAPI) : void {
        },
        onError(err: any, taskAPI: TaskAPI, helperAPI) : void {
          taskAPI.addDiagnostics([{
            type: 'error',
            message: err,
            date: moment().unix()
          }]);
        }
      }
    };
  },
  isPackage : false
};
