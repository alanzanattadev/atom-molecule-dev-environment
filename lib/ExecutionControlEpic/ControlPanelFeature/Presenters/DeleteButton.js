"use babel";
// @flow

import React from "react";

const DeleteButton = ({
  isActive = false,
  onClick,
}: {
  isActive?: boolean,
  onClick: () => void,
}) => (
  <span
    className={`icon icon-remove-close ${isActive ? "" : "status-removed"}`}
    style={{ cursor: "pointer" }}
    onClick={isActive ? onClick : () => {}}
  />
);

export default DeleteButton;
