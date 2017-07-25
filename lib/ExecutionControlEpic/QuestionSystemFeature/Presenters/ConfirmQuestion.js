"use babel";
// @flow

import React from "react";
import Radium from "radium";
import QuestionMessage from "./QuestionMessage";
import type { ComplexChoice, Step } from "../Types/types.js.flow";

export default Radium(
  ({
    message,
    decline = { value: false, description: "No" },
    accept = { value: true, description: "Yes" },
    onNext,
    step,
    ...props
  }: {
    message: string,
    decline: ComplexChoice,
    accept: ComplexChoice,
    onNext: (answer: any) => void,
    step: Step,
  }) =>
    <div
      style={{
        display: "flex",
        flex: "1",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "strech",
      }}
    >
      <div style={{ display: "flex", justifyContent: "center" }}>
        <QuestionMessage>
          {message}
        </QuestionMessage>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        {step == "validation"
          ? <span className="loading loading-spinner-small inline-block" />
          : <span>
              <button
                className="btn btn-info inline-block-tight native-key-bindings"
                onKeyPress={e => e.key == "Enter" && onNext(false)}
                onClick={() => onNext(decline.value)}
                autoFocus={
                  props.default && props.default.value == decline.value
                }
              >
                {decline.description}
              </button>
              <button
                className="btn btn-success inline-block-tight native-key-bindings"
                onClick={() => onNext(accept.value)}
                autoFocus={
                  (props.default && props.default.value == accept.value) ||
                  (props.default && props.default.value === undefined)
                }
              >
                {accept.description}
              </button>
            </span>}
      </div>
    </div>,
);
