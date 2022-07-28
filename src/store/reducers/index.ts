import { combineReducers } from "redux";
import { statisticReducer } from "./statisticReducer";
import { todosFilterReducer } from "./todosFilterReducer";
import { todosReducer } from "./todosReducer";
 

export const rootReducer = combineReducers({
    statistic: statisticReducer,
    todosFilterReducer: todosFilterReducer,
    todosReducer: todosReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

