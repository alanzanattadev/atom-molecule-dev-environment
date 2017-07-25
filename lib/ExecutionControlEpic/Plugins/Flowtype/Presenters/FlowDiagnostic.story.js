"use babel";
// @flow

import React from "react";
import FlowDiagnostic from "./FlowDiagnostic";
import FlowLogData from "../Fake/Data/FlowLogData";
import { storiesOf } from "@kadira/storybook";

storiesOf("FlowDiagnostic", module).add("Basic", () =>
  <div style={{ overflow: "auto", maxHeight: "690px" }}>
    <FlowDiagnostic
      log={{
        kind: "infer",
        level: "error",
        message: [
          {
            context: 'describe("AssociatedFiles", () => {',
            descr: "identifier `describe`",
            type: "Blame",
            loc: {
              source:
                "lib/EditorContextEpic/TabsManagmentFeature/Model/AssociatedFiles.test.js",
              type: "SourceFile",
              start: {
                line: 10,
                column: 1,
                offset: 113,
              },
              end: {
                line: 10,
                column: 8,
                offset: 121,
              },
            },
            path:
              "lib/EditorContextEpic/TabsManagmentFeature/Model/AssociatedFiles.test.js",
            line: 10,
            endline: 10,
            start: 1,
            end: 8,
          },
          {
            context: null,
            descr: "Could not resolve name",
            type: "Comment",
            path: "",
            line: 0,
            endline: 0,
            start: 1,
            end: 0,
          },
        ],
      }}
    />
  </div>,
);

storiesOf("FlowDiagnostic", module).add("Full", () =>
  <div style={{ overflow: "auto", maxHeight: "690px" }}>
    <FlowDiagnostic log={FlowLogData} />
  </div>,
);
