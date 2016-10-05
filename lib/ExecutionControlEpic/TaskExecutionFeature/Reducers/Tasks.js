'use babel'
// @flow
import type {Task} from "../Types/types.js";
import { fromJS } from "immutable";

export default function(state: TasksReducer = [], action: any): TasksReducer {
  switch(action.type) {
    case "ADD_TASK":
      return fromJS(state).push(action.payload.task).toJS();
    case "START_TASK":
      return fromJS(state).map(task => task.get('id') == action.payload.id ? task.update('state', state => state == "created" ? "running" : state) : task).toJS();
    case "STOP_TASK":
      return fromJS(state).map(task => task.get('id') == action.payload.id ? task.update('state', state => state == "running" ? "stopped" : state) : task).toJS();
    case "CRASH_TASK":
      return fromJS(state).map(task => task.get('id') == action.payload.id ? task.update('state', state => state == "running" ? "crashed" : state) : task).toJS();
    default:
      return state;
  }
}

export type TasksReducer = Array<Task>;
