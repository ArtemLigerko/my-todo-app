//Redux
import { applyMiddleware, legacy_createStore } from "redux";
//Redux-Toolkit
import { configureStore } from "@reduxjs/toolkit";
//Redux-Reducers
import { rootReducer } from './reducers'
// import { statisticReducer } from "./reducers/statisticSlice";
// import thunk from "redux-thunk";
// import { composeWithDevTools } from "@reduxjs/toolkit/dist/devtoolsExtension";


// export const store = legacy_createStore(
//     rootReducer,
//     composeWithDevTools(applyMiddleware(thunk)),
// );

export const store = configureStore({
    reducer: rootReducer,
})

export type RootState = ReturnType<typeof store.getState>;

export type TypedDispatch = typeof store.dispatch;  //https://redux.js.org/usage/usage-with-typescript
