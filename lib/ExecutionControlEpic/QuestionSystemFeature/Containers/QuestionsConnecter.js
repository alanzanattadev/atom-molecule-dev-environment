"use babel";
// @flow

import { Record } from "immutable";
import { lifecycle, withProps, withState } from "recompose";
import Rx from "rxjs/Rx";

function execStep(step, answers, ...data) {
  if (typeof step == "function") {
    const result = step(answers, ...data);
    if (result != null && typeof result == "object" && result.then) {
      return Rx.Observable.fromPromise(result);
    } else if (result instanceof Rx.Observable) {
      return result;
    } else {
      return Rx.Observable.create(obs => {
        obs.next(result);
        obs.complete();
      });
    }
  } else {
    return Rx.Observable.create(obs => {
      obs.next(step);
      obs.complete();
    });
  }
}

export default (questions, onAnswer) => Component =>
  withState("formState", "setFormState", () => {
    const Answers = Record(
      questions
        .map(q => q.name)
        .reduce((red, value) => Object.assign({}, red, { [value]: null }), {}),
    );
    const ReducerState = Record({
      index: 0,
      step: "when",
      answers: null,
      questions: null,
      prevState: null,
      loaded: null,
    });
    return new ReducerState({
      questions: questions,
      answers: new Answers(),
    });
  })(
    lifecycle({
      testQuestion() {
        execStep(
          this.props.formState.questions[this.props.formState.index].when ||
            true,
          this.props.formState.answers,
        )
          .toPromise()
          .then(
            response => {
              if (response) {
                this.props.setFormState(current =>
                  current.set("step", "loader"),
                );
              } else {
                this.props.setFormState(current =>
                  current.set("index", current.index + 1),
                );
              }
            },
            () => {},
          );
      },
      loadData() {
        execStep(
          this.props.formState.questions[this.props.formState.index].loader ||
            null,
          this.props.formState.answers,
        )
          .toPromise()
          .then(response => {
            this.props.setFormState(current =>
              current.set("step", "ask").set("loaded", response),
            );
          });
      },
      componentDidMount() {
        if (this.props.formState.step == "when") {
          this.testQuestion();
        }
      },
      componentDidUpdate(prevProps) {
        if (this.props.formState.index == this.props.formState.questions.length)
          onAnswer(this.props.formState.answers);
        else if (
          (prevProps.formState.step != "when" ||
            prevProps.formState.index != this.props.formState.index) &&
          this.props.formState.step == "when"
        ) {
          this.testQuestion();
        } else if (
          prevProps.formState.step == "when" &&
          this.props.formState.step == "loader"
        ) {
          this.loadData();
        }
      },
    })(
      withProps(props => ({
        onNext(data) {
          props.setFormState(current => current.set("step", "validation"));
          execStep(
            props.formState.questions[props.formState.index].validator || true,
            Object.assign({}, props.formState.answers, {
              [props.formState.questions[props.formState.index].name]: data,
            }),
            data,
          )
            .toPromise()
            .then(validated => {
              if (validated) {
                props.setFormState(current =>
                  current
                    .set("index", current.index + 1)
                    .setIn(
                      [
                        "answers",
                        props.formState.questions[props.formState.index].name,
                      ],
                      data,
                    )
                    .set("prevState", current.set("step", "ask"))
                    .set("loaded", null)
                    .set("step", "when"),
                );
              } else {
                props.setFormState(current => current.set("step", "ask"));
              }
            });
        },
        onPrev() {
          props.setFormState(props.formState.prevState);
        },
        onEscape() {
          onAnswer(null);
        },
        index: props.formState.index,
        step: props.formState.step,
        first: props.formState.prevState == null,
        questions: props.formState.questions.map(question => {
          let dflt =
            typeof question.default == "function"
              ? question.default(
                  props.formState.answers,
                  props.formState.loaded,
                )
              : question.default;
          dflt =
            typeof dflt == "string" ? { value: dflt, description: dflt } : dflt;
          const message =
            typeof question.message == "function"
              ? question.message(
                  props.formState.answers,
                  props.formState.loaded,
                )
              : question.message;
          const choices = (
            (typeof question.choices == "function"
              ? question.choices(
                  props.formState.answers,
                  props.formState.loaded,
                )
              : question.choices) || []
          ).map(choice =>
            typeof choice == "string"
              ? { value: choice, description: choice }
              : choice,
          );
          const accept =
            typeof question.accept == "string"
              ? { description: question.accept, value: true }
              : question.accept;
          const decline =
            typeof question.decline == "string"
              ? { description: question.decline, value: false }
              : question.decline;
          return {
            type: question.type,
            default: dflt,
            message: message,
            choices: choices,
            accept: accept,
            decline: decline,
          };
        }),
      }))(Component),
    ),
  );
