"use babel";
// @flow

import * as React from "react";

const EslintDiagnostic = ({
  path,
  message,
  severity,
  source,
}: {
  path: string,
  message: string,
  severity: number,
  source: string,
}) => (
  <div>
    <h3 style={{ fontSize: "12px", textDecoration: "underline" }}>{path}</h3>
    <pre
      style={{
        borderLeft: `solid 1px ${severity > 1 ? "red" : "yellow"}`,
      }}
    >
      <code style={{ fontSize: "11px" }}>{source.trim()}</code>
    </pre>
    <p style={{ marginLeft: "20px" }}>
      <span style={{ fontSize: "14px" }}>{message}</span>
    </p>
  </div>
);

EslintDiagnostic.defaultProps = {
  path: "",
  message: {},
};

export default EslintDiagnostic;
