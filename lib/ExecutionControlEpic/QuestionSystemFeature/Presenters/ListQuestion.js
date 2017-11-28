"use babel";
// @flow

import * as React from "react";
import Radium from "radium";
import QuestionMessage from "./QuestionMessage";
import type { ComplexChoice, Step } from "../Types/types.js.flow";
import { withState } from "recompose";

export default withState(
  "selected",
  "setSelected",
  props => props.default.value,
)(
  Radium(
    ({
      choices = [],
      message,
      selected,
      setSelected,
      onNext,
      step,
      ...props
    }: {
      choices: Array<ComplexChoice>,
      message: string,
      selected: any,
      setSelected: (v: any) => void,
      onNext: (selected: any) => void,
      step: Step,
    }) => (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flex: "1",
          justifyContent: "center",
          alignItems: "stretch",
        }}
      >
        <div style={{ display: "flex", justifyContent: "center" }}>
          <QuestionMessage>{message}</QuestionMessage>
        </div>
        <ul style={{ margin: "10px" }}>
          {choices.map((choice, i) => (
            <li
              style={{
                display: "flex",
                listStyle: "none",
                alignItems: "center",
                margin: "5px 0px",
                transform: `translate3d(${
                  step == "validation" && selected != choice.value
                    ? "-200px"
                    : 0
                }, 0, 0)`,
                transition: "transform 0.5s cubic-bezier(0.4, 0.0, 0.2, 1)",
              }}
              key={choice.value}
            >
              {step == "validation" && selected == choice.value ? (
                <span className="loading loading-spinner-tiny" />
              ) : (
                <input
                  type="radio"
                  className="input-radio native-key-bindings"
                  value={choice.value}
                  checked={choice.value == selected}
                  onChange={e => setSelected(e.target.value)}
                  onKeyPress={e => {
                    if (e.key == "Enter" && selected != null) onNext(selected);
                  }}
                  autoFocus={props.default.value == choice.value || i == 0}
                />
              )}
              <span
                style={{
                  fontSize: "16px",
                  marginLeft: "10px",
                }}
              >
                {choice.description}
              </span>
            </li>
          ))}
        </ul>
      </div>
    ),
  ),
);
