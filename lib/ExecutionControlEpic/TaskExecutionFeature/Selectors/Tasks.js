'use babel'
// @flow

import type {TaskState} from "../Types/types.js";
import { fromJS, is } from "immutable";
import type {TasksReducer} from "../Reducers/Tasks";

function selectRepresentativeState(tasks: any) {
  if (tasks.find(task => task.get('state') == "running"))
    return "running";
  else {
    return tasks.reduce((red, task) => {
      if (red.get('state') == null)
        return task;
      else if (red.get('end') && task.get('end'))
        return red.get('end') < task.get('end') ? task : red;
      else if (task.get('end'))
        return task;
      else
        return red;
    }, fromJS({state: null})).get('state');
  };
}

export function selectStateOfTarget(state: TasksReducer, target: mixed): TaskState {
  return fromJS(state)
          .filter(task => is(task.get('target'), fromJS(target)))
          .update(selectRepresentativeState);
};

export function selectStateOfTool(state: TasksReducer, toolId: string): TaskState {
  return fromJS(state)
          .filter(task => task.getIn(['target', 'tool', 'id']) == toolId)
          .update(selectRepresentativeState);
};
