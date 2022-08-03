//Redux:
import { combineReducers, applyMiddleware } from "redux";
//Reducers:
import { statisticReducer } from "./statisticReducer";
import { todosFilterReducer } from "./todosFilterReducer";
import { todosSearchFilterReducer } from './todosSearchFilterReducer';
import { todos } from "./todosReducer";
import statisticToolkitReducer from "./statisticToolkitReducer";
import { configureStore } from "@reduxjs/toolkit";
 

export const rootReducer = combineReducers({
    statistic: statisticReducer,
    statisticToolkit: statisticToolkitReducer,
    todos: todos,
    todosFilter: todosFilterReducer,
    todosSearchFilter: todosSearchFilterReducer,
});

export const store = configureStore({
    reducer: rootReducer,
})

export type RootState = ReturnType<typeof rootReducer>;
