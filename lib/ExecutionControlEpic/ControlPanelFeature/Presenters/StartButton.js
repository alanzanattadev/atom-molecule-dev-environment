"use babel";
// @flow

import React from "react";

export default function StartButton({ ...props }: {}) {
  return (
    <span
      className="icon icon-playback-play"
      style={{ cursor: "pointer" }}
      {...props}
    />
  );
}
