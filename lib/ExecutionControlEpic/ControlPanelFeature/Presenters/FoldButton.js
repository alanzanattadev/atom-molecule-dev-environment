"use babel";
// @flow

import React from "react";
import styled from "styled-components";

const FoldButtonElement = styled.div`
  display: flex;
  align-items: center;
  height: 10px;
  width: 10px;
  margin: 0px 4px 4px 0px;
  cursor: pointer;
`;

export default function FoldButton({
  opened = true,
  onClick,
}: {
  opened?: boolean,
  onClick?: () => void,
}) {
  return (
    <FoldButtonElement
      className={`icon icon-${
        opened === false ? "chevron-right" : "chevron-down"
      }`}
      onClick={onClick}
    />
  );
}
