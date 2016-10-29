'use babel'
// @flow

import type {DevTool} from "../../Types/types.js.flow";

export let gulp: DevTool = {
  name: 'gulp',
  iconUri: 'atom://gulp/icon.svg',
  id: '1',
};

export let npm: DevTool = {
  name: 'npm',
  iconUri: 'atom://npm/icon.svg',
  id: '2',
};

export let jest: DevTool = {
  name: 'jest',
  iconUri: 'atom://jest/icon.svg',
  id: '3',
};

export let docker: DevTool = {
  name: 'docker',
  iconUri: 'atom://docker/icon.svg',
  id: '4',
};

let devtools: Array<DevTool> = [gulp, npm, jest, docker];

export default devtools;
