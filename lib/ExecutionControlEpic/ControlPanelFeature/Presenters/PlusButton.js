"use babel";
// @flow

import React from "react";
import ControlPanelIcon from "./ControlPanelIcon";

const PlusButton = ({
  selected = false,
  onClick,
}: {
  selected?: boolean,
  onClick: () => void,
}) => (
  <ControlPanelIcon
    className={`icon icon-plus ${selected ? "text-success" : ""}`}
    onClick={onClick}
    isPointer
  />
);

export default PlusButton;
