"use babel";
// @flow

import React from "react";
import styled from "styled-components";
import { compose, withState, withHandlers, withProps } from "recompose";
import ToggleControlButton from "./ToggleControlButton";
import ControlPanel from "./ControlPanel";
import ContentPanel from "./ContentPanel";

const PanelBox = styled.div`
  display: flex;
  align-items: stretch;
  flex: 1 1 0;
`;

const ControlBox = styled.div`
  position: relative;
  display: flex;
  align-items: stretch;
  flex: 0 0 auto;
`;

const ContentBox = styled.div`
  display: flex;
  flex: 1 1 0;
  align-items: stretch;
`;

const withMouseOverPanel = compose(
  withState("mouseOverOptions", "setMouseOverOptions", {
    onPanel: false,
    onControl: false,
  }),
  withHandlers({
    setMouseOverPanel: ({ setMouseOverOptions }) => v =>
      setMouseOverOptions(options => ({ ...options, onPanel: v })),
    setMouseOverControl: ({ setMouseOverOptions }) => v =>
      setMouseOverOptions(options => ({ ...options, onControl: v })),
  }),
  withProps(({ mouseOverOptions }) => ({
    mouseOverPanel: mouseOverOptions.onPanel,
    mouseOverControl: mouseOverOptions.onControl,
  })),
);

const withToggleControl = compose(
  withState("hasControl", "setControl", true),
  withHandlers({
    toggleControl: ({ setControl }) => () => setControl(control => !control),
  }),
);

const Panel = ({
  hasControl,
  toggleControl,
  setMouseOverPanel,
  setMouseOverControl,
  mouseOverPanel,
  mouseOverControl,
  ...props
}: Object) => {
  return (
    <PanelBox
      onMouseEnter={() => setMouseOverPanel(true)}
      onMouseLeave={() => setMouseOverPanel(false)}
    >
      <ControlBox
        onMouseEnter={() => setMouseOverControl(true)}
        onMouseLeave={() => setMouseOverControl(false)}
      >
        <ControlPanel {...props} isActive={hasControl} />
        <ToggleControlButton
          toggleAction={toggleControl}
          hasControl={hasControl}
          isActive={
            (hasControl && mouseOverControl) || (!hasControl && mouseOverPanel)
          }
        />
      </ControlBox>
      <ContentBox
        className={`diagnostic-content ${
          props.selection.mode && props.selection.mode.type === "terminal"
            ? "terminal"
            : ""
        }`}
      >
        <ContentPanel {...props} />
      </ContentBox>
    </PanelBox>
  );
};

export default compose(withMouseOverPanel, withToggleControl)(Panel);
