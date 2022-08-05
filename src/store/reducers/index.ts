//Redux:
import { combineReducers, applyMiddleware } from "redux";
//Reducers:
// import { statisticReducer } from "./statisticReducer";
import statisticSliceReducer from "./statisticSlice";
import { todosFilterReducer } from "./todosFilterReducer";
import todosFilterSliceReducer from "./todosFilterSlice";
import { todosSearchFilterReducer } from './todosSearchFilterReducer';
import { todos } from "./todosReducer";
 

export const rootReducer = combineReducers({
    // statistic: statisticReducer,
    statistic: statisticSliceReducer,
    todos: todos,
    todosFilter: todosFilterReducer,
    // todosFilter: todosFilterSliceReducer,
    todosSearchFilter: todosSearchFilterReducer,
});


export type RootState = ReturnType<typeof rootReducer>;
