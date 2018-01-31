"use babel";
// @flow

let lastPlanID = -1;
export function generatePlanId() {
  lastPlanID = lastPlanID + 1;
  return lastPlanID.toString();
}
