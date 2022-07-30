import { legacy_createStore } from "redux";
import { rootReducer } from './reducers'


export const store = legacy_createStore(rootReducer);

export type TypedDispatch = typeof store.dispatch;  //https://redux.js.org/usage/usage-with-typescript
