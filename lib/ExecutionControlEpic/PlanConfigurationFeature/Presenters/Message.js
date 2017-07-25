"use babel";
// @flow

import React from "react";
import Radium from "radium";

export default Radium(({ children }: {}) =>
  <div
    className="text-color-highlight"
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "16px",
      flex: "1",
    }}
  >
    {children}
  </div>,
);
