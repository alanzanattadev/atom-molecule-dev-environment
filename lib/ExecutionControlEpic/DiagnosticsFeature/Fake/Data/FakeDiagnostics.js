"use babel";
// @flow

import type { MoleculeDiagnostic } from "../../Types/types";

export let gulpBuild1Log1: MoleculeDiagnostic = {
  severity: 3,
  message: "a message",
  task: "gulpBuild1",
  date: 1477601049,
  range: { start: { line: 0, character: 0 }, end: { line: 0, character: 0 } },
};

export let gulpBuild1Log2: MoleculeDiagnostic = {
  severity: 3,
  message: "a message 2",
  task: "gulpBuild1",
  date: 1477601049,
  range: { start: { line: 0, character: 0 }, end: { line: 0, character: 0 } },
};

export let gulpDiagnostics: Array<MoleculeDiagnostic> = [
  gulpBuild1Log1,
  gulpBuild1Log2,
];

export let dockerWeb1Log1: MoleculeDiagnostic = {
  severity: 3,
  message: "a message",
  task: "dockerWeb1",
  date: 1477601049,
  range: { start: { line: 0, character: 0 }, end: { line: 0, character: 0 } },
};

export let dockerWeb1Error1: MoleculeDiagnostic = {
  severity: 1,
  message: "a message",
  task: "dockerWeb1",
  date: 1477601049,
  range: { start: { line: 0, character: 0 }, end: { line: 0, character: 0 } },
};

export let dockerWeb1Error2: MoleculeDiagnostic = {
  severity: 1,
  message: "a message",
  task: "dockerWeb1",
  date: 1477601049,
  range: { start: { line: 0, character: 0 }, end: { line: 0, character: 0 } },
};

export let dockerWeb1Warning1: MoleculeDiagnostic = {
  severity: 2,
  message: "a message",
  task: "dockerWeb1",
  date: 1477601049,
  range: { start: { line: 0, character: 0 }, end: { line: 0, character: 0 } },
};

export let dockerWeb2Warning1: MoleculeDiagnostic = {
  severity: 2,
  message: "a message",
  task: "dockerWeb2",
  date: 1477601049,
  range: { start: { line: 0, character: 0 }, end: { line: 0, character: 0 } },
};

export let dockerDBInfo1: MoleculeDiagnostic = {
  severity: 3,
  message: "a message",
  task: "dockerDB1",
  date: 1477601049,
  range: { start: { line: 0, character: 0 }, end: { line: 0, character: 0 } },
};

export let dockerDiagnostics: Array<MoleculeDiagnostic> = [
  dockerWeb1Log1,
  dockerWeb1Error1,
  dockerWeb1Error2,
  dockerWeb1Warning1,
  dockerWeb2Warning1,
  dockerDBInfo1,
];

let diagnostics: Array<MoleculeDiagnostic> = [
  ...gulpDiagnostics,
  ...dockerDiagnostics,
];

export default diagnostics;
