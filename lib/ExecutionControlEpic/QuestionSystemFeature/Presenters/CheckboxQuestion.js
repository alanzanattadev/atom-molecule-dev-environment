"use babel";
// @flow

import React from "react";
import Radium from "radium";
import QuestionMessage from "./QuestionMessage";
import { withState } from "recompose";
import { fromJS, Map } from "immutable";

export default withState(
  "selected",
  "setSelected",
  props => fromJS(props.default) || Map(),
)(
  Radium(
    ({
      choices = [],
      message,
      selected,
      step,
      setSelected,
      onNext,
    }: {
      message: string,
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
          {choices.map(choice => (
            <li
              style={{
                display: "flex",
                listStyle: "none",
                alignItems: "center",
                margin: "5px 0px",
                transform: `translate3d(${step == "validation" && selected[choice.value] == false ? "-200px" : 0}, 0, 0)`,
                transition: "transform 0.5s cubic-bezier(0.4, 0.0, 0.2, 1)",
              }}
              key={choice.value}
            >
              {step == "validation" && selected[choice.value] == true
                ? <span className="loading loading-spinner-tiny" />
                : <input
                    type="checkbox"
                    className="input-checkbox native-key-bindings"
                    value={choice.value}
                    checked={selected.get(choice.value, false)}
                    onChange={e =>
                      setSelected(
                        selected.set(e.target.value, e.target.checked),
                      )}
                    onKeyPress={e => {
                      if (e.key == "Enter") onNext(selected.toJS());
                    }}
                    autoFocus
                  />}
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
