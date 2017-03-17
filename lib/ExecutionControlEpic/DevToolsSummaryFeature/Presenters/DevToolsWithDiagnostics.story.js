import React from "react";
import { storiesOf, action, linkTo } from "@kadira/storybook";
import DevToolsWithDiagnostics from "./DevToolsWithDiagnostics";

storiesOf("DevToolsWithDiagnostics", module).add("Basic", () => (
  <div style={{height: '300px', display: 'flex', alignItems: 'center'}}>
    <DevToolsWithDiagnostics
      tools={[
        {
          errors: 1,
          warnings: 2,
          name: "webpack",
          iconUri: "devtool-icon-webpack.png"
        },
        {
          infos: 9,
          name: "npm",
          iconUri: "devtool-icon-npm.svg"
        },
        {
          successes: 1,
          errors: 5,
          name: "jest",
          iconUri: "devtool-icon-jest.png"
        },
        {
          errors: 0,
          successes: 0,
          warnings: 0,
          infos: 0,
          name: "redux",
          iconUri: "devtool-icon-redux.png"
        },
        {
          errors: 2,
          successes: 0,
          warnings: 1,
          infos: 7,
          name: "flow",
          iconUri: "devtool-icon-flow.png"
        },
        {
          errors: 2,
          successes: 5,
          warnings: 1,
          infos: 7,
          name: "chrome",
          iconUri: "devtool-icon-chrome.png"
        }
      ]}
    />
  </div>
));
