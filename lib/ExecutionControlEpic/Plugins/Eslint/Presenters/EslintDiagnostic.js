"use babel";
// @flow

import React from "react";
import Radium from "radium";

const EslintDiagnostic = ({
  path,
  message,
}: {
  path: string,
  message: object,
}) => (
  <div>
    <h3 style={{ fontSize: "12px", textDecoration: "underline" }}>
      {path}
    </h3>
    <pre
      style={{
        borderLeft: `solid 1px ${message.severity > 1 ? "red" : "yellow"}`,
      }}
    >
      <code style={{ fontSize: "11px" }}>
        {message.source.trim()}
      </code>
    </pre>
    <p style={{ marginLeft: "20px" }}>
      <span
        style={{
          fontSize: "14px",
          marginRight: "20px",
          fontStyle: "italic",
        }}
      >
        {message.ruleId}:
      </span>
      <span style={{ fontSize: "14px" }}>{message.message}</span>
    </p>
  </div>
);

EslintDiagnostic.defaultProps = {
  path: "",
  message: {},
};

export default Radium(EslintDiagnostic);
