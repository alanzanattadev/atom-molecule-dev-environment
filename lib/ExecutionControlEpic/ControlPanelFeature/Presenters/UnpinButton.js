"use babel";
// @flow

import React from "react";
import PinButton from "./PinButton";

const UnpinButton = ({ onClick }: { onClick: () => void }) => (
  <PinButton selected={true} onClick={onClick} />
);

export default UnpinButton;
