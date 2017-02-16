import React from "react";
import { storiesOf, action, linkTo } from "@kadira/storybook";
import DiagnosticDetails from "./DiagnosticDetails";

let failMessage = `
  FAIL  lib/ExecutionControlEpic/DiagnosticsFeature/Presenters/ToolDiagnostics.test.js
  ● Test suite failed to run

    SyntaxError: /home/main/Documents/molecule-dev-environment/lib/ExecutionControlEpic/DiagnosticsFeature/Presenters/ToolDiagnostics.test.js: Unexpected token (7:18)
       5 | describe('ToolDiagnostics', () => {
       6 |   it('should display diagnostics traveller', () => {
    >  7 |     let subject = ;
         |                   ^
       8 |
       9 |
      10 |   });

      at Parser.pp.raise (node_modules/babylon/lib/parser/location.js:22:13)
      at Parser.pp.unexpected (node_modules/babylon/lib/parser/util.js:91:8)
      at Parser.pp.parseExprAtom (node_modules/babylon/lib/parser/expression.js:512:12)
      at Parser.parseExprAtom (node_modules/babylon/lib/plugins/jsx/index.js:16:22)
      at Parser.pp.parseExprSubscripts (node_modules/babylon/lib/parser/expression.js:270:19)
      at Parser.pp.parseMaybeUnary (node_modules/babylon/lib/parser/expression.js:250:19)
      at Parser.pp.parseExprOps (node_modules/babylon/lib/parser/expression.js:180:19)
      at Parser.pp.parseMaybeConditional (node_modules/babylon/lib/parser/expression.js:157:19)
      at Parser.pp.parseMaybeAssign (node_modules/babylon/lib/parser/expression.js:120:19)
      at Parser.parseMaybeAssign (node_modules/babylon/lib/plugins/flow.js:465:20)
`;
storiesOf("DiagnosticDetails", module).add("Basic", () => (
  <DiagnosticDetails message={failMessage} />
));
