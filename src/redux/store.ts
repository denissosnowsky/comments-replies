import { createStore, combineReducers, applyMiddleware } from "redux";
import commentsReducer from "./commentsReducer";
import thunkMiddleware from "redux-thunk";
import alertReducer from "./alertReducer";

let rootReducer = combineReducers({
  commentsReducer: commentsReducer,
  alertReducer: alertReducer
});

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

type RootReducerType = typeof rootReducer;
export type StateType = ReturnType<RootReducerType>;

//@ts-ignore
window.store = store;

export default store;
