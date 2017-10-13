"use babel";
// @flow

import * as React from "react";
import Radium from "radium";

export default Radium(
  ({ height, children }: { height: string, children: any }) => (
    <div
      style={{
        display: "flex",
        height: height,
        flexShrink: "0",
        alignItems: "stretch",
      }}
    >
      {children}
    </div>
  ),
);
