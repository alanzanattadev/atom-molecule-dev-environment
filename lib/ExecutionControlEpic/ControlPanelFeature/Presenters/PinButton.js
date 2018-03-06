"use babel";
// @flow

import React from "react";

export default function PinButton({
  selected = false,
  ...props
}: {
  selected?: boolean,
}) {
  return (
    <span
      className={`icon icon-pin ${selected ? "text-success" : ""}`}
      style={{ cursor: "pointer" }}
      {...props}
    />
  );
}
