import { combineReducers } from "redux";
import { statisticReducer } from "./statisticReducer";
import { todosFilterReducer } from "./todosFilterReducer";
import { todos } from "./todosReducer";
 

export const rootReducer = combineReducers({
    statistic: statisticReducer,
    todosFilter: todosFilterReducer,
    todos: todos,
});

export type RootState = ReturnType<typeof rootReducer>;
