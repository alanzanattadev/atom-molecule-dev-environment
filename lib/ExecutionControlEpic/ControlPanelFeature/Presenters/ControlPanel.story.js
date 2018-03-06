import React from "react";
import { storiesOf, action, linkTo } from "@kadira/storybook";
import ControlPanel from "./ControlPanel";
import { List } from "immutable";

storiesOf("ControlPanel", module).add("Basic", () => (
  <ControlPanel
    onPinPlan={action("onPinPlan")}
    onUnPinPlan={action("onUnPinPlan")}
    onStartPlan={action("onStartPlan")}
    onStopPlan={action("onStopPlan")}
    onTerminalClick={action("onTerminalClick")}
    onDiagnosticClick={action("onDiagnosticClick")}
    onSplit={action("onSplit")}
    onNewPlan={action("onNewPlan")}
    packagePanels={List.of({
      package: {
        path: "/project/package.json",
        name: "project/package.json",
      },
      tools: List.of(
        {
          tool: {
            name: "Jest",
            iconUri: "devtool-icon-jest.png",
            dominantColor: "#AB4426",
          },
          plans: List.of(
            {
              plan: {
                id: "1",
                name: "Watch",
              },
              tasks: List.of({
                strategy: {
                  type: "terminal",
                },
                state: "running",
              }),
            },
            {
              plan: {
                id: "2",
                name: "Test CI",
              },
              tasks: List.of(),
            },
          ),
        },
        {
          tool: {
            name: "Flow",
            iconUri: "devtool-icon-flow.png",
            dominantColor: "#ffff00",
          },
          plans: List.of({
            plan: {
              id: "3",
              name: "Watch",
            },
            tasks: List.of(),
          }),
        },
      ),
    })}
  />
));
