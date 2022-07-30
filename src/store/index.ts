import { legacy_createStore } from "redux";
import { rootReducer } from './reducers'


export const store = legacy_createStore(rootReducer);