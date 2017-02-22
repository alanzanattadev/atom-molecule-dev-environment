"use babel";
// @flow

import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import reducers from "./Reducers";
import { composeWithDevTools } from "remote-redux-devtools";

let store = createStore(
  reducers,
  composeWithDevTools({ realtime: true })(applyMiddleware(thunk))
);

export default store;
