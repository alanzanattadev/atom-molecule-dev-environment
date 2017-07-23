"use babel";
// @flow

import React from "react";
import JestDiagnosticCollapse from "./JestDiagnosticCollapse";
import stripAnsi from "strip-ansi";
import styled from "styled-components";
import { compose, withState } from "recompose";

const DiagnosticContent = styled.div`
  font-size: 12px;
`;

function JestDiagnostic({
  collapsed,
  toggleCollapse,
  suite,
}: {
  collapsed: boolean,
  toggleCollapse(value: boolean): void,
  suite: {
    name: string,
    message: string,
    status: string,
  },
}): React$Element<any> {
  return (
    <DiagnosticContent>
      <span
        className={suite.status == "passed" ? "text-success" : "text-danger"}
      >
        {suite.status}
      </span>
      :
      {" "}
      {suite.name}
      {suite.message.length !== 0
        ? <JestDiagnosticCollapse
            click={() => toggleCollapse(!collapsed)}
            collapsed={collapsed}
            data={stripAnsi(suite.message)}
          />
        : ""}
    </DiagnosticContent>
  );
}

export default compose(withState("collapsed", "toggleCollapse", true))(
  JestDiagnostic,
);
