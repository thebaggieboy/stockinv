import { combineReducers, configureStore } from "@reduxjs/toolkit";
import logger from 'redux-logger'
import userSlice from "./user/userSlice"
 
import tokenSlice from "./token/tokenSlice"
import balanceSlice from "./balance/balanceSlice"
import userActiveEmailSlice from "./user/userActiveEmail";
 
import {
    persistStore, persistReducer, FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage';
import { BadgeAlertIcon } from "lucide-react";

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ["user", "token", "user_email", "current_balance"],
}

const rootReducer = combineReducers({
    user : userSlice,
    user_email : userActiveEmailSlice,
    token: tokenSlice,
    current_balance: balanceSlice,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)


const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleWare) => (
        getDefaultMiddleWare({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }).concat(logger)
    ),
    devTools: process.env.NODE_ENV !== "production"
})

export const peristor = persistStore(store)


export default store