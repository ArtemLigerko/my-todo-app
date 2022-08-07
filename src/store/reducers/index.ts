//Redux:
import { combineReducers, applyMiddleware } from "redux";
//Redux-Slice
import statisticSlice from "./statisticSlice";
import todosSlice from "./todosSlice";
import todosFilterSlice from "./todosFilterSlice";

 

export const rootReducer = combineReducers({
    statistic: statisticSlice,
    todos: todosSlice,
    todosFilter: todosFilterSlice,
});


export type RootState = ReturnType<typeof rootReducer>;
