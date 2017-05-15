"use babel";
// @flow

import React, { PropTypes } from "react";
import Radium from "radium";

const EslintDiagnostic = ({ path, message }) => (
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

EslintDiagnostic.propTypes = {
  path: PropTypes.string,
  message: PropTypes.object,
};

export default Radium(EslintDiagnostic);
