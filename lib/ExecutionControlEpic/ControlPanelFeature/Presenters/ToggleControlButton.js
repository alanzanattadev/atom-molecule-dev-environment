"use babel";
// @flow

import React from "react";
import styled from "styled-components";

const ToggleControlBox = styled.div`
  z-index: 11;
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
  right: ${props => (props.isActive ? "-16px" : "0")};
  display: flex;
  flex: 0 0 auto;
  align-items: center;
  transition: all ease 250ms;
  transform: translateY(-50%);
  opacity: 0.5;
  cursor: pointer;
  &:hover {
    opacity: 1;
    right: -25px;
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
  <ToggleControlBox>
    <ToggleControl
      className="tool-panel-background-color"
      onClick={() => toggleAction()}
      isActive={isActive}
    >
      <ButtonIcon
        className={`icon icon-chevron-${hasControl ? "left" : "right"}`}
      />
    </ToggleControl>
  </ToggleControlBox>
);

export default ToggleControlButton;
