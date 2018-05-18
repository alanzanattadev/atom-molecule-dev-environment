"use babel";
// @flow

import React from "react";
import ControlPanelIcon from "./ControlPanelIcon";

const StopButton = ({ onClick }: { onClick: () => void }) => (
  <ControlPanelIcon
    className="icon icon-primitive-square"
    onClick={onClick}
    isPointer
  />
);

export default StopButton;
