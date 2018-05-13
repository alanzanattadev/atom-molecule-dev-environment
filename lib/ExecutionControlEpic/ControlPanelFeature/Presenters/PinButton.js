"use babel";
// @flow

import React from "react";

const PinButton = ({
  selected = false,
  onClick,
}: {
  selected?: boolean,
  onClick: () => void,
}) => (
  <span
    className={`icon icon-pin ${selected ? "text-success" : ""}`}
    style={{ cursor: "pointer" }}
    onClick={onClick}
  />
);

export default PinButton;
