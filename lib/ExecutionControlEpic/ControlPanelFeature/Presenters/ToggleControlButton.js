"use babel";
// @flow

import React from "react";
import styled from "styled-components";

const ToggleControlBox = styled.div`
  z-index: 2;
  display: flex;
  flex: 0 0 auto;
  align-items: stretch;
  height: inherit;
  transform: translateY(50%);
`;

const ToggleControl = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  position: absolute;
  display: flex;
  transition: all ease 500ms;
  right: ${props => (props.isActive ? "-25px" : "0")};
  flex: 0 0 auto;
  align-items: center;
  transform: translateY(-50%);
  opacity: 0.5;
  cursor: pointer;
  &:hover {
    opacity: 1;
  }
`;

const ButtonIcon = styled.span`
  width: 16px;
  height: 16px;
  position: relative;
  right: -30px;
`;

const ToggleControlButton = ({
  toggleAction,
  hasControl,
  isActive,
}: {
  toggleAction: () => void,
  hasControl: boolean,
  isActive: boolean,
}) => (
  <ToggleControlBox onClick={() => toggleAction()}>
    <ToggleControl className="tool-panel-background-color" isActive={isActive}>
      <ButtonIcon
        className={`icon icon-chevron-${hasControl ? "left" : "right"}`}
      />
    </ToggleControl>
  </ToggleControlBox>
);

export default ToggleControlButton;
