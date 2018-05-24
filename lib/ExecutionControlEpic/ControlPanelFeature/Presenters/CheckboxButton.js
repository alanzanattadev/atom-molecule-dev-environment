"use babel";
// @flow

import React from "react";
import styled from "styled-components";

const ControlPanelCheckbox = styled.input`
  cursor: ${props => (props.isPointer ? "pointer" : undefined)};
  &::before {
    font-size: 12px;
    width: 12px;
    height: 12px;
  }
`;

const CheckboxButton = ({
  title,
  status,
  onChangeClick,
}: {
  title: string,
  status: boolean,
  onChangeClick: (any, any) => void,
}) => (
  <ControlPanelCheckbox
    type="checkbox"
    className="console-log-checkbox"
    defaultChecked={status}
    onChange={event => onChangeClick(title, event.target.checked)}
    isPointer
  />
);

export default CheckboxButton;
