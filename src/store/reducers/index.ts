import { combineReducers } from "redux";
import { statisticReducer } from "./statisticReducer";



const rootReducer = combineReducers({
    statistic: statisticReducer,
    // todo: todoReducer,
})

export type RootState = ReturnType<typeof rootReducer>;

