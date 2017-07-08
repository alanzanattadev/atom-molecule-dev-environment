"use babel";
// @flow

import React from "react";
import type { TaskState } from "../Types/types.js.flow";
import moment from "moment";
import styled from "styled-components";

const RoundedBox = styled.div`
  display: flex;
  flex: 0 0 auto;
  padding: ${props => (props.end ? "4px 8px" : "8px 8px")};
  border-radius: 25px;
  cursor: ${props => (props.onClick !== undefined ? "pointer" : undefined)};
  margin: 8px;
  transition: background-color 0.375s;
  user-select: none;
  flex-direction: column;
  align-items: flex-end;
`;

const Name = styled.span`
  color: white;
  margin: 0px 8px;
  font-size: ${props => (props.little ? "8px" : "12px")};
`;

function getStateClassName(state: TaskState) {
  switch (state) {
    case "crashed":
      return "task-crashed";
    case "created":
      return "task-created";
    case "failed":
      return "task-failed";
    case "running":
      return "task-running";
    case "stopped":
      return "task-stopped";
    case "succeed":
      return "task-succeed";
    default:
      return "task-default";
  }
}

type Props = {
  state: TaskState,
  debut: number,
  end: number,
  onClick(): void,
  selected?: boolean,
};

export default function Task({
  onClick,
  debut,
  end,
  state,
  selected = false,
}: Props) {
  return (
    <RoundedBox
      onClick={onClick}
      end={end}
      className={`${getStateClassName(state)} ${selected ? "selected" : ""}`}
    >
      {end &&
        <Name className="color-text-white">
          {moment.unix(end).fromNow()}
        </Name>}
      <Name className="color-text-white" little={end}>
        {end
          ? `last ${moment
              .duration(moment.unix(end).diff(moment.unix(debut)))
              .humanize()}`
          : moment.unix(debut).fromNow()}
      </Name>
    </RoundedBox>
  );
}
