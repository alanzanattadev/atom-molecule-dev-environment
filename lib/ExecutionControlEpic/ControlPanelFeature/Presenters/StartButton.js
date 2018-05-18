"use babel";
// @flow

import React from "react";
import ControlPanelIcon from "./ControlPanelIcon";

const StartButton = ({ onClick }: { onClick: () => void }) => (
  <ControlPanelIcon
    className="icon icon-playback-play"
    onClick={onClick}
    isPointer
  />
);

export default StartButton;
