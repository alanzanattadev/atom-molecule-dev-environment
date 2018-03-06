"use babel";
// @flow

import React from "react";

export default function StopButton({ ...props }: {}) {
  return (
    <span
      className="icon icon-primitive-square"
      style={{ cursor: "pointer" }}
      {...props}
    />
  );
}
