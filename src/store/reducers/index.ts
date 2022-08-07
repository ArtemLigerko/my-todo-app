//Redux:
import { combineReducers, applyMiddleware } from "redux";
//Reducers:
// import { statisticReducer } from "./statisticReducer";
// import { todosFilterReducer } from "./todosFilterReducer";
// import { todosSearchFilterReducer } from './todosSearchFilterReducer';
// import { todos } from "./todosReducer";
//Redux-Slice
import statisticSlice from "./statisticSlice";
import todosSlice from "./todosSlice";
import todosFilterSlice from "./todosFilterSlice";

 

export const rootReducer = combineReducers({
    // statistic: statisticReducer,
    // todos: todos,
    // todosFilter: todosFilterReducer,
    // todosSearchFilter: todosSearchFilterReducer,
    statistic: statisticSlice,
    todos: todosSlice,
    todosFilter: todosFilterSlice,
});


export type RootState = ReturnType<typeof rootReducer>;
