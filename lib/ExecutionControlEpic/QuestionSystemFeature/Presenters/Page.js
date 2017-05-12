"use babel";
// @flow

import React from "react";
import Radium from "radium";

export default Radium(
  ({
    children,
    index,
    frameHeight,
  }: {
    children: any,
    index: number,
    frameHeight: number,
  }) => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        flexGrow: "1",
        flexShrink: "0",
        justifyContent: "flex-start",
        alignItems: "stretch",
        transform: `translate3d(0, -${index * parseInt(frameHeight)}px, 0)`,
        transition: `0.2s transform cubic-bezier(0.4, 0.0, 0.2, 1)`,
      }}
    >
      {children}
    </div>
  ),
);
