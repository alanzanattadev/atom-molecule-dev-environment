"use babel";
// @flow

import React from "react";
import ControlPanelIcon from "./ControlPanelIcon";

const PinButton = ({
  selected = false,
  onClick,
}: {
  selected?: boolean,
  onClick: () => void,
}) => (
  <ControlPanelIcon
    className={`icon icon-pin ${selected ? "text-success" : ""}`}
    onClick={onClick}
    isPointer
  />
);

export default PinButton;
