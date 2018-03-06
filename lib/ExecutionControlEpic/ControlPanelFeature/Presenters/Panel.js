"use babel";
// @flow

import React from "react";
import styled from "styled-components";
import ControlPanel from "./ControlPanel";
import ContentPanel from "./ContentPanel";

const PanelBox = styled.div`
  display: flex;
  align-items: stretch;
  flex: 1 1 0;
`;

const ControlBox = styled.div`
  display: flex;
  align-items: stretch;
  flex: 0 0 auto;
`;

const ContentBox = styled.div`
  display: flex;
  flex: 1 1 0;
  align-items: stretch;
`;

export default function Panel({ ...props }: Object) {
  return (
    <PanelBox>
      <ControlBox>
        <ControlPanel {...props} />
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
}
