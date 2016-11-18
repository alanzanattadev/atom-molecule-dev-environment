'use babel'
// @flow

import type {Strategy, Controller, Process} from "../../Types/types.js.flow";
import {exec} from "../Strategies";

export default function IntegratedStagerConfigurer() {
  return function IntegratedStager(strategy: Strategy, controller: Controller): ?Process {
    return exec(strategy, controller);
  }
}
