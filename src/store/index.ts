//Redux
import { applyMiddleware, legacy_createStore } from "redux";
//Redux-Toolkit
import thunk from "redux-thunk";
import { composeWithDevTools } from "@reduxjs/toolkit/dist/devtoolsExtension";
import { configureStore } from "@reduxjs/toolkit";
//RootReducer
import { rootReducer } from './reducers'


// export const store = legacy_createStore(
//     rootReducer,
//     composeWithDevTools(applyMiddleware(thunk)),
// );

export const store = configureStore({
    reducer: rootReducer,
})


export type TypedDispatch = typeof store.dispatch;  //https://redux.js.org/usage/usage-with-typescript
