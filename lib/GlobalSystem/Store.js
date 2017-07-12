"use babel";
// @flow

import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import reducers from "./Reducers";
import epics from "./Epics";
import { composeWithDevTools } from "remote-redux-devtools";
import { createEpicMiddleware } from "redux-observable";

const epicsMiddleware = createEpicMiddleware(epics);

let store = createStore(
  reducers,
  composeWithDevTools({ realtime: true })(
    applyMiddleware(thunk, epicsMiddleware),
  ),
);

export default store;
