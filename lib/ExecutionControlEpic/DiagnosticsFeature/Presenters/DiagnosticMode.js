"use babel";
// @flow

import React from "react";
import styled, { keyframes } from "styled-components";
import { withState, withProps, compose } from "recompose";

const inAnimation = keyframes`
  from {
    opacity: 0;
    transform: translate3d(-30px, 0px, 0px);
  }

  to {
    opacity: 1;
    transform: translate3d(0px, 0px, 0px);
  }
`;

const outAnimation = keyframes`
  from {
    opacity: 1;
    transform: translate3d(0px, 0px, 0px);
  }

  to {
    opacity: 0;
    transform: translate3d(-30px, 0px, 0px);
  }
`;

const DiagnosticModeIcon = styled.img`
  height: 32px;
  width: 32px;
  z-index: 2;
  cursor: pointer;
`;

const DiagnosticModeName = styled.span`
  animation: ${props => `${props.hovered === true ? inAnimation : outAnimation} 0.375s forwards`};
  position: absolute;
  left: 53px;
  height: 48px;
  display: flex;
  align-items: center;
  font-size: 18px;
`;

const DiagnosticModeBox = styled.div`
  height: 48px;
  width: 48px;
  position: relative;
  display: flex;
  margin: 8px 16px;
  background-color: ${props => {
    if (props.active) {
      return "rgba(255, 255, 255, 0.4)";
    } else if (props.hovered) {
      return "rgba(255, 255, 255, 0.1)";
    } else {
      return undefined;
    }
  }};
  border-radius: 50%;
  transition: background-color 0.375s;
  justify-content: center;
  align-items: center;
  padding: 8px;
`;

function DiagnosticModeElement({
  hovered,
  active,
  name,
  iconUri,
  ...props
}: {
  hovered: boolean,
  active: boolean,
  name: string,
  iconUri: string,
}): React$Element<*> {
  return (
    <DiagnosticModeBox hovered={hovered} active={active}>
      <DiagnosticModeIcon src={iconUri} {...props} />
      <DiagnosticModeName className="default-color" hovered={hovered}>
        {name}
      </DiagnosticModeName>
    </DiagnosticModeBox>
  );
}

export default compose(
  withState("hovered", "setHovered", false),
  withProps(props => ({
    onMouseEnter: () => props.setHovered(true),
    onMouseLeave: () => props.setHovered(false),
  })),
)(DiagnosticModeElement);
