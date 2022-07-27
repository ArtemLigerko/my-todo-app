import { combineReducers } from "redux";
import { statisticReducer } from "./statisticReducer";
import { todosFilterReducer } from "./todosFilterReducer";
import { todosReducer } from "./todosReducer";
 

export const rootReducer = combineReducers({
    statistic: statisticReducer,
    todosFilter: todosFilterReducer,
    todos: todosReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

