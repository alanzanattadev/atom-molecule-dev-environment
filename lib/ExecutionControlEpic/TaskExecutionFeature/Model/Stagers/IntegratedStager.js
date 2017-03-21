"use babel";
// @flow

import type {Controller, Process, Strategy} from "../../Types/types.js.flow";
import {exec} from "../Strategies";

export default function IntegratedStagerConfigurer() {
  return function IntegratedStager(
    strategy: Strategy,
    controller: Controller,
  ): ?Process {
    console.log(strategy);
    return exec(strategy, controller);
  };
}
