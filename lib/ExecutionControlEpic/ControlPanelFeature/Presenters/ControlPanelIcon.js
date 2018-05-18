"use babel";
// @flow

import styled from "styled-components";

const ControlPanelIcon = styled.div`
  cursor: ${props => (props.isPointer ? "pointer" : undefined)};
  &::before {
    font-size: 12px;
    width: 12px;
    height: 12px;
  }
`;

export default ControlPanelIcon;
