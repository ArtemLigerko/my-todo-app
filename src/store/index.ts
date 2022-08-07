//Redux-Toolkit
import { configureStore } from "@reduxjs/toolkit";
//Redux-Reducers
import { rootReducer } from './reducers'



export const store = configureStore({
    reducer: rootReducer,
})

export type RootState = ReturnType<typeof store.getState>;

export type TypedDispatch = typeof store.dispatch;  //https://redux.js.org/usage/usage-with-typescript
