"use babel";
// @flow

import React from "react";
import Radium from "radium";
import { withState } from "recompose";
import QuestionMessage from "./QuestionMessage";

export default withState("text", "setText", "")(
  Radium(props => (
    <div
      style={{
        display: "flex",
        flex: "1",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <div style={{ display: "flex", justifyContent: "center" }}>
        <QuestionMessage>{props.message}</QuestionMessage>
      </div>
      {props.step == "validation" ? (
        <span className="loading loading-spinner-small inline-block" />
      ) : (
        <input
          type="password"
          className="text-color-highlight input-text native-key-bindings"
          placeholder={`default: "${props.default.description}"`}
          onKeyPress={e => {
            if (e.key == "Enter") {
              props.onNext(props.text == "" ? props.default.value : props.text);
            }
          }}
          autoFocus
          onChange={e => props.setText(e.target.value)}
          value={props.text}
          style={{
            maxWidth: "400px",
            margin: "0px",
            borderTopLeftRadius: "0px",
            borderBottomLeftRadius: "0px",
            borderTopRightRadius: "10px",
            borderBottomRightRadius: "10px",
            borderWidth: "0px",
            padding: "5px 20px",
          }}
        />
      )}
    </div>
  )),
);
