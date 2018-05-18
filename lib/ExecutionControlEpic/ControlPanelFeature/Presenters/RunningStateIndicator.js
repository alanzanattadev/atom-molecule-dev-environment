"use babel";
// @flow

import React from "react";
import type { TaskState } from "../../TaskExecutionFeature/Types/types.js.flow";
import styled, { keyframes } from "styled-components";

const RunningStateIndicatorElement = styled.span`
  border-radius: 50%;
  margin: 0px 8px 0px 2px;
  height: 10px;
  width: 10px;
  background-color: ${props => props.color};
  animation: ${props => (props.busy ? GlowingAnimation() : undefined)} linear 1s
    infinite;
`;

const GlowingAnimation = () => keyframes`
  0% { box-shadow:0 0 4px red, inset 0 0 4px red; }
  50% { box-shadow:0 0 8px red, inset 0 0 8px red; }
  100% { box-shadow:0 0 4px red, inset 0 0 4px red; }
`;

export default function RunningStateIndicator({
  state,
  busy,
}: {
  state: TaskState,
  busy: boolean,
}) {
  return (
    <RunningStateIndicatorElement
      color={state === "running" ? "#00ff00" : "#fff"}
      busy={busy}
    />
  );
}
