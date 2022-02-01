import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import dictionary from "./modules/dictionarylist";
import { composeWithDevTools } from "redux-devtools-extension";

const middleWares = [thunk];
const rootReducer = combineReducers({ dictionary }); //리듀서를 묶은것이 root
const enhancer = applyMiddleware(...middleWares);

//스토어 만들기
const store = createStore(rootReducer, composeWithDevTools(enhancer));

export default store;
