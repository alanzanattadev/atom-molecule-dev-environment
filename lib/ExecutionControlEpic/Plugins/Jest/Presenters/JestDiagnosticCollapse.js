"use babel";
// @flow

import React from "react";
import styled from "styled-components";
import { compose, withState } from "recompose";

const DiagnosticMessage = styled.div`
  white-space: pre-wrap;
  padding: 16px;
  margin-bottom: 8px;
`;

function content(text: string): string {
  let data = text.split("\n");
  data.splice(0, 2);
  return { __html: data.join("\n") };
}

function JestDiagnosticCollapse({
  toggleHovered,
  collapsed,
  click,
  data,
}: {
  toggleHovered(value: boolean): void,
  collapsed: boolean,
  click(): void,
  data: string,
}) {
  return (
    <span
      onMouseEnter={() => toggleHovered(true)}
      onMouseLeave={() => toggleHovered(false)}
    >
      {collapsed
        ? <span onClick={click}>
            &nbsp;&nbsp;▼ Expand
          </span>
        : <span onClick={click}>
            &nbsp;&nbsp;▼ Collapse
          </span>}
      {collapsed === false
        ? <DiagnosticMessage dangerouslySetInnerHTML={content(data)} />
        : false}
    </span>
  );
}

JestDiagnosticCollapse.defaultProps = {};

export default compose(withState("hovered", "toggleHovered", false))(
  JestDiagnosticCollapse,
);
