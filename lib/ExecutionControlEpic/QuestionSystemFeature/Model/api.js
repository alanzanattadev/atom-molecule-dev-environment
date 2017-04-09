"use babel";
// @flow

import Rx from "rxjs/Rx";
import type { Questions } from "../Types/types.js.flow";
import { renderQuestionsForm } from "../AtomLinks/Layouts";

// eslint-disable-next-line no-unused-vars
export default function generateAPI(store) {
  const questionsPipeline = new Rx.Subject()
    .concatMap(({ questions, id }) =>
      Rx.Observable.defer(() => Rx.Observable.create(obs => {
        renderQuestionsForm(questions, answers => {
          obs.next({ answers, id });
          obs.complete();
        });
      })))
    .share();
  let lastId = 0;
  return {
    ask(questions: Questions): rxjs$Observable<object> {
      const id = lastId + 1;
      lastId += 1;
      const obs = questionsPipeline
        .first(data => data.id == id)
        .map(data => data.answers)
        .toPromise();
      questionsPipeline.next({ questions, id });
      return obs;
    },
  };
}
