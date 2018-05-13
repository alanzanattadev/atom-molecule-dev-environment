"use babel";
// @flow

import React from "react";

const StartButton = ({ onClick }: { onClick: () => void }) => (
  <span
    className="icon icon-playback-play"
    style={{ cursor: "pointer" }}
    onClick={onClick}
  />
);

export default StartButton;
