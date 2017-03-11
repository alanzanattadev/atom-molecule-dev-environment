"use babel";
// @flow

import type { Diagnostic } from "../../Types/types.js.flow";

export let gulpBuild1Log1: Diagnostic = {
  type: "info",
  message: "a message",
  task: "gulpBuild1",
  date: 1477601049,
  step: 1,
};

export let gulpBuild1Log2: Diagnostic = {
  type: "info",
  message: "a message 2",
  task: "gulpBuild1",
  date: 1477601049,
  step: 1,
};

export let gulpDiagnostics: Array<Diagnostic> = [
  gulpBuild1Log1,
  gulpBuild1Log2
];

export let dockerWeb1Log1: Diagnostic = {
  type: "info",
  message: "a message",
  task: "dockerWeb1",
  date: 1477601049,
  step: 1,
};

export let dockerWeb1Error1: Diagnostic = {
  type: "error",
  message: "a message",
  task: "dockerWeb1",
  date: 1477601049,
  step: 1,
};

export let dockerWeb1Error2: Diagnostic = {
  type: "error",
  message: "a message",
  task: "dockerWeb1",
  date: 1477601049,
  step: 1,
};

export let dockerWeb1Warning1: Diagnostic = {
  type: "warning",
  message: "a message",
  task: "dockerWeb1",
  date: 1477601049,
  step: 1,
};

export let dockerWeb2Warning1: Diagnostic = {
  type: "warning",
  message: "a message",
  task: "dockerWeb2",
  date: 1477601049,
  step: 1,
};

export let dockerDBInfo1: Diagnostic = {
  type: "info",
  message: "a message",
  task: "dockerDB1",
  date: 1477601049,
  step: 1,
};

export let dockerDiagnostics: Array<Diagnostic> = [
  dockerWeb1Log1,
  dockerWeb1Error1,
  dockerWeb1Error2,
  dockerWeb1Warning1,
  dockerWeb2Warning1,
  dockerDBInfo1
];

let diagnostics: Array<Diagnostic> = [...gulpDiagnostics, ...dockerDiagnostics];

export default diagnostics;
