"use babel";
// @flow

import React from "react";
import ControlPanelIcon from "./ControlPanelIcon";

const DeleteButton = ({
  isActive = true,
  onClick,
}: {
  isActive?: boolean,
  onClick: () => void,
}) => (
  <ControlPanelIcon
    className={`icon icon-remove-close ${isActive ? "" : "status-removed"}`}
    onClick={isActive ? onClick : () => {}}
    isPointer
  />
);

export default DeleteButton;
