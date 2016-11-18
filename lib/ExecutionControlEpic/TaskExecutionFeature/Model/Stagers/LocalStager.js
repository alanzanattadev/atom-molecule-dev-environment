'use babel'
// @flow

import type {Strategy, Controller, Process} from "../../Types/types.js.flow";
import {fork} from 'child_process';

export default function LocalStagerConfigurer() {
  return function LocalStager(strategy: Strategy, controller: Controller): ?Process {
    let child = fork(__dirname + '/../../Process/LocalStagerProcess.js', [JSON.stringify(strategy)], {silent: true, env: Object.assign({}, process.env, {
      BABEL_ENV: 'process'
    })});
    child.on('message', message => {
      if (message.type == 'stdout')
      controller.onStdoutData(message.data);
      else if (message.type == 'stderr')
      controller.onStderrData(message.data);
      else if (message.type == 'error')
      controller.onError(message.data);
    })
    child.stdout.on('data', data => controller.onStdoutData(data));
    child.stderr.on('data', data => controller.onStderrData(data));
    child.on('close', exitCode => controller.onExit(exitCode));
    child.on('error', err => controller.onError(err));
    return child;
  }
}
