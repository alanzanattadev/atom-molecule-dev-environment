"use babel";
// @flow

import * as React from "react";
import Radium from "radium";
import Frame from "./Frame";
import Page from "./Page";
import Step from "./Step";
import LoadingQuestion from "./LoadingQuestion";
import Question from "./Question";
import type {
  Question as QuestionType,
  Step as StepType,
} from "../Types/types";

export default Radium(
  ({
    frameHeight = "300px",
    index = 0,
    step,
    questions = [],
    onNext,
    onPrev,
    onEscape,
    first,
  }: {
    frameHeight: string,
    index: number,
    step: StepType,
    questions: Array<QuestionType>,
    onNext: (answer: any) => void,
    onPrev: () => void,
    onEscape: () => void,
    first: boolean,
  }) => (
    <Frame height={frameHeight} tabIndex="1">
      <Page frameHeight={frameHeight} index={index}>
        {questions.slice(0, index + 1).map((question, i) => (
          <Step height={frameHeight} key={i}>
            {step == "when" || step == "loader" ? (
              <LoadingQuestion />
            ) : (
              <Question
                index={i}
                question={questions[i]}
                onNext={onNext}
                onPrev={onPrev}
                step={step}
              />
            )}
          </Step>
        ))}
      </Page>
      {first == false && step == "ask" && (
        <span
          className="icon icon-chevron-up"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            textAlign: "center",
            cursor: "pointer",
          }}
          onClick={onPrev}
        />
      )}
      <span
        className="icon icon-remove-close"
        style={{
          position: "absolute",
          right: "5px",
          top: "5px",
          cursor: "pointer",
        }}
        onClick={onEscape}
      />
      {/* <span className="icon icon-chevron-down" style={{position: 'absolute', bottom: 0, left: 0, right: 0, textAlign: 'center'}}/> */}
    </Frame>
  ),
);
