"use babel";
// @flow

import * as React from "react";
import ReactDOM from "react-dom";
import QuestionsConnecter from "../Containers/QuestionsConnecter";
import Questions from "../Presenters/Questions";

export var questionsModal = document.createElement("div");
export var questionsModalPanel = global.atom.workspace.addModalPanel({
  item: questionsModal,
  visible: false,
  priority: 60,
});

export function renderQuestionsForm(questions, onAnswer) {
  const Form = QuestionsConnecter(questions, answers => {
    questionsModalPanel.hide();
    onAnswer(answers);
  })(Questions);
  ReactDOM.render(<Form />, questionsModal);
  questionsModalPanel.show();
}
