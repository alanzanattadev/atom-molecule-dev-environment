'use babel'
// @flow

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from "./Reducers";

let store = createStore(reducers, applyMiddleware(thunk));

export default store;
