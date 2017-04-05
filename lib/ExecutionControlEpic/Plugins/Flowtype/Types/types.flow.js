"use babel";
// @flow

export type FlowLog = {
  extra?: FlowLogExtra,
  operation?: FlowLogMessage,
  kind: string,
  level: string,
  message: Array<FlowLogMessage>,
};

export type FlowLogMessage = {
  context: string,
  desc: string,
  type: string,
  loc?: FlowLogSource,
  path: string,
  line: number,
  endline: number,
  start: number,
  end: number,
};

export type FlowLogSource = {
  source: string,
  type: string,
  start: FlowLogLocation,
  end: FlowLogLocation,
};

export type FlowLogLocation = {
  line: number,
  column: number,
  offest: number,
};

export type FlowLogExtra = {
  message: Array<FlowLogMessage>,
  children?: Array<FlowLogExtra>,
};
