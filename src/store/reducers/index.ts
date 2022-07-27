import { combineReducers } from "redux";
import { statisticReducer } from "./statisticReducer";
import { todosFilterReducer } from "./todosFilterReducer";
 


export const rootReducer = combineReducers({
    statistic: statisticReducer,
    todosFilter: todosFilterReducer,
    // todo: todoReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

