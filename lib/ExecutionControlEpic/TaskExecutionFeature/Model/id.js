"use babel";
// @flow

let lastTaskID = -1;
export function generateTaskID() {
  lastTaskID = lastTaskID + 1;
  return lastTaskID;
}
