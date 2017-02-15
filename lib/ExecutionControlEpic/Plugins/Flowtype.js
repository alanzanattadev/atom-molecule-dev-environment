'use babel'
// @flow
import type {PlanConfig} from "../PlanConfigurationFeature/Types/types.js.flow";
import type {TaskAPI} from "../DevtoolLoadingFeature/Types/types.js";
import moment from 'moment';
import path from 'path';

export default {
  infos: {
    name: 'flow',
    iconUri: 'atom://molecule-dev-environment/.storybook/public/devtool-icon-flow.png'
  },
  configSchema: {
    type : 'object',
    schemas : {
      binary : {
        type : 'conditional',
        expression : {
          type: 'enum',
          enum: [
            {value: 'local', description: 'local'},
            {value: 'global', description: 'global'},
          ]
        },
        cases : {
          local : null,
          global : null,
        }
      },
      conf : {
        type : 'conditional',
        expression: {
          type: 'enum',
          enum: [
            {value: 'server', description: 'server'},
            {value: 'check', description: 'status (check)'},
          ]
        },
        cases : {
          server : {
            type : 'object',
            schemas : {
              serverconfig : {
                type : 'conditional',
                expression: {
                  type: 'enum',
                  enum: [
                    {value: 'start', description: 'start'},
                    {value: 'stop', description: 'stop'},
                  ]
                },
                cases : {
                  start : {
                    type : 'boolean',
                    default : true,
                    title : 'check files at server start'
                  },
                  stop : {
                  }
                }
              }
            }
          },
          check : {
            type : 'object',
            schemas : {
              allerrors : {
                type : 'boolean',
                default : false,
                title : 'show all errors (50+)'
              }
            }
          }
        }
      }
    }
  },
  getStrategyForPlan(plan: PlanConfig) {
    let binaryPath;
    let cmd;
    if (plan.config.binary.expressionValue == 'local')
      binaryPath = `${path.join(path.dirname(plan.packageInfos.path), 'node_modules', '.bin', 'flow')}`;
    else
      binaryPath = 'flow';
    if (plan.config.conf.expressionValue == 'server') {
      cmd = `${binaryPath} ${(plan.config.conf.caseValue.serverconfig.expressionValue == 'start') ?
      (plan.config.conf.caseValue.serverconfig.caseValue ? '--quiet --json --strip-root' : 'start') : 'stop'}`;
    } else {
      cmd = `${binaryPath} status ${plan.config.conf.caseValue.allerrors ? '--show-all-errors ' : ''}--no-auto-start --json --strip-root`;
    }
    return {
      strategy: {
        type: 'shell',
        command: cmd,
        cwd: path.dirname(plan.packageInfos.path),
      },
      controller: {
        onStdoutData(data: string, taskAPI: TaskAPI, helperAPI): void {
          taskAPI.cache.push(data.toString());
        },
        onStderrData(data: string, taskAPI: TaskAPI, helperAPI): void {
          taskAPI.addDiagnostics([{
            type: "info",
            message: {
              text: helperAPI.outputToHTML(data.toString()),
              html: true
            },
            date: moment().unix(),
          }]);
        },
        onExit(code: number, taskAPI: TaskAPI, helperAPI): void {
          helperAPI.json.parseAsync(taskAPI.cache.get().map(blob => blob.data).join('')).then((json) => {
            let getMessageForDiagnostic = (m) : string => {
                if (m.type == 'Blame') {
                  return `(${m.path} : line ${m.line}) \n"${m.context}" \n${m.descr}`;
                } else {
                  return ` : ${m.descr} \n`;
                }
            };
            if (json.errors) {
              taskAPI.addDiagnostics(json.errors.map(err => ({
                type : 'error',
                message : {
                  text : err.message.map(m => getMessageForDiagnostic(m)).join(''),
                  html : false
                },
                date : moment().unix(),
              })));
            }
            else if (json.warnings) {
              taskAPI.addDiagnostics(json.warnings.map(war => ({
                type : 'warning',
                message : {
                  text : war.message.map(m => getMessageForDiagnostic(m)).join(''),
                  html : false
                },
                date : moment().unix(),
              })));
            }
          }).catch(e => {
            taskAPI.addDiagnostics([{
              type: "info",
              message: e.toString(),
              date: moment().unix(),
            }]);
          });
        },
        onError(err: any, taskAPI: TaskAPI, helperAPI): void {
          taskAPI.addDiagnostics([{
            type: "error",
            message: { data : err },
            date: moment().unix(),
          }]);
        }
      }
    };
  },
  isPackage: '.flowconfig'
};
