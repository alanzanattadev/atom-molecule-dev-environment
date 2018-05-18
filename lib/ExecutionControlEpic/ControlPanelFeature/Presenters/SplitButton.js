"use babel";
// @flow

import React from "react";
import ControlPanelIcon from "./ControlPanelIcon";

const SplitButton = ({ onClick }: { onClick: () => void }) => (
  <ControlPanelIcon
    className="icon icon-versions"
    onClick={onClick}
    isPointer
  />
);

export default SplitButton;
