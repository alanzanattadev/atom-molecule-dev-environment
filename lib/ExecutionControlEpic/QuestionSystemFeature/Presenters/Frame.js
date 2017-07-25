"use babel";
// @flow

import React from "react";
import Radium from "radium";

export default Radium(({ height, children, onBlur }: {}) =>
  <div
    style={{
      display: "flex",
      height: height,
      flex: "1",
      position: "relative",
    }}
    onBlur={onBlur}
    onClick={e => {
      e.stopPropagation();
      e.nativeEvent.stopPropagation();
    }}
  >
    {children}
  </div>,
);
