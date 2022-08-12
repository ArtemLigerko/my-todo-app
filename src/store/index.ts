//Redux-Toolkit
import { configureStore } from "@reduxjs/toolkit";
//Redux-Persist
import { 
    persistStore, 
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
    WebStorage,
 } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
//Redux-Reducers
import { rootReducer } from './reducers'


interface IpersistConfig {
    key: string,
    storage: WebStorage,
    whitelist: any,
}

const persistConfig: IpersistConfig = {
    key: 'root',
    storage,
    whitelist: ["todos", "statistic"],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export type TypedDispatch = typeof store.dispatch;  //https://redux.js.org/usage/usage-with-typescript
