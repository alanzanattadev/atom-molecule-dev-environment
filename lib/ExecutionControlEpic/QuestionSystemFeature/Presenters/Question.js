"use babel";
// @flow

import * as React from "react";
import Radium from "radium";
import InputQuestion from "./InputQuestion";
import PasswordQuestion from "./PasswordQuestion";
import ListQuestion from "./ListQuestion";
import CheckboxQuestion from "./CheckboxQuestion";
import ConfirmQuestion from "./ConfirmQuestion";
import type { Question, Step } from "../Types/types.js.flow";

export default Radium(
  ({
    question,
    step,
    onNext,
    onPrev,
  }: {
    question: Question,
    step: Step,
    onNext: (answer: any) => void,
    onPrev: () => void,
  }) => {
    switch (question.type) {
      case "input":
        return (
          <InputQuestion
            {...question}
            onNext={onNext}
            onPrev={onPrev}
            step={step}
          />
        );
      case "list":
        return (
          <ListQuestion
            {...question}
            onNext={onNext}
            onPrev={onPrev}
            step={step}
          />
        );
      case "checkbox":
        return (
          <CheckboxQuestion
            {...question}
            onNext={onNext}
            onPrev={onPrev}
            step={step}
          />
        );
      case "confirm":
        return (
          <ConfirmQuestion
            {...question}
            onNext={onNext}
            onPrev={onPrev}
            step={step}
          />
        );
      case "password":
        return (
          <PasswordQuestion
            {...question}
            onNext={onNext}
            onPrev={onPrev}
            step={step}
          />
        );
      default:
        return null;
    }
  },
);
