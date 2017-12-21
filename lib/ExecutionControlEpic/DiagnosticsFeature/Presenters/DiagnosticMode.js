"use babel";
// @flow

import * as React from "react";
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

const DiagnosticModeIcon = styled.span`
  height: 16px;
  width: 16px;
  z-index: 2;
  cursor: pointer;
`;

const DiagnosticModeName = styled.span`
  animation: ${props =>
    props.hovered === null
      ? ""
      : `${
          props.hovered === true ? inAnimation : outAnimation
        } 0.375s forwards`};
  visibility: ${props => (props.hovered === null ? "hidden" : "visible")};
  position: absolute;
  left: 53px;
  height: 48px;
  display: flex;
  align-items: center;
  font-size: 18px;
`;

const DiagnosticModeBox = styled.div`
  position: relative;
  display: flex;
  margin: 8px 16px;
  border-radius: 50%;
  transition: background-color 0.375s;
  justify-content: center;
  align-items: center;
  padding: 16px;
  flex-shrink: 0;
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
}): React.Element<any> {
  return (
    <DiagnosticModeBox
      {...props}
      hovered={hovered}
      active={active}
      className={`mode-button ${active ? "selected" : ""}`}
    >
      <DiagnosticModeIcon className={`icon icon-${iconUri}`} />
      <DiagnosticModeName className="text-color-highlight" hovered={hovered}>
        {name}
      </DiagnosticModeName>
    </DiagnosticModeBox>
  );
}

export default compose(
  withState("hovered", "setHovered", null),
  withProps(props => ({
    onMouseEnter: () => props.setHovered(true),
    onMouseLeave: () => props.setHovered(false),
  })),
)(DiagnosticModeElement);
