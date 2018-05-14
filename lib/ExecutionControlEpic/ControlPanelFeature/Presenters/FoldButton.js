"use babel";
// @flow

import React from "react";
import styled from "styled-components";

const FoldButtonElement = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-bottom: 4px;
  padding-left: ${props => (props.isTopLevel ? undefined : "12px")};
`;

export default function FoldButton({
  opened = true,
  onClick,
  isTopLevel = false,
}: {
  opened?: boolean,
  onClick?: () => void,
  isTopLevel?: boolean,
}) {
  return (
    <FoldButtonElement
      className={`icon icon-${
        opened === false ? "chevron-right" : "chevron-down"
      }`}
      onClick={onClick}
      isTopLevel={isTopLevel}
    />
  );
}
