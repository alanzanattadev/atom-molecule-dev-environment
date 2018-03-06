"use babel";
// @flow

import React from "react";
import type { TaskState } from "../../TaskExecutionFeature/Types/types.js.flow";
import styled from "styled-components";

const RunningStateIndicatorElement = styled.span`
  border-radius: 50%;
  margin: 0px 8px 0px 0px;
  height: 10px;
  width: 10px;
  background-color: ${props => props.color};
`;

export default function RunningStateIndicator({ state }: { state: TaskState }) {
  return (
    <RunningStateIndicatorElement
      color={state === "running" ? "#00ff00" : "#fff"}
    />
  );
}
