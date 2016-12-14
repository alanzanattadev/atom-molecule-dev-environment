'use babel'
// @flow

import {fork} from 'child_process';;

type NodeProcessStrategy = {
  type: "node",
  path: string,
  args: Array<string>,
  cwd: string,
};

type NodeProcessController = {
  onStdoutData(data: string): void,
  onStderrData(data: string): void,
  onExit(exitCode: number): void,
  onError(err: any): void
};

export function exec(config: NodeProcessStrategy, controller: NodeProcessController): child_process$ChildProcess {
  let child = fork(config.path, config.args, {cwd: config.cwd});
  child.stdout.on('data', data => controller.onStdoutData(data));
  child.stderr.on('data', data => controller.onStderrData(data));
  child.on('close', exitCode => controller.onExit(exitCode));
  child.on('error', err => controller.onError(err));
  return child;
};
