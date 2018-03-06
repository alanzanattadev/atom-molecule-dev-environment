"use babel";
// @flow

import React from "react";
import PinButton from "./PinButton";

export default function UnpinButton({ ...props }: {}) {
  return <PinButton selected={true} {...props} />;
}
