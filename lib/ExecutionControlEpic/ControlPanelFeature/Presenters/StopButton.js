"use babel";
// @flow

import React from "react";

const StopButton = ({ onClick }: { onClick: () => void }) => (
  <span
    className="icon icon-primitive-square"
    style={{ cursor: "pointer" }}
    onClick={onClick}
  />
);

export default StopButton;
