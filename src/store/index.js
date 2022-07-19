import {createStore, combineReducers} from "redux";
import { statisticReducer } from "./statisticReducer";
import { todoReducer } from "./todoReducer"
// import { composeWithDevTools } from "redux-devtools-extention";

const rootReducer = combineReducers({
    statistic: statisticReducer,
    todo: todoReducer,
})

export const store = createStore(rootReducer);

