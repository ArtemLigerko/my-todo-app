import { combineReducers } from "redux";
import { statisticReducer } from "./statisticReducer";
import { todosFilterReducer } from "./todosFilterReducer";
import { todosSearchFilterReducer } from './todosSearchFilterReducer';
import { todos } from "./todosReducer";
 

export const rootReducer = combineReducers({
    statistic: statisticReducer,
    todos: todos,
    todosFilter: todosFilterReducer,
    todosSearchFilter: todosSearchFilterReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
