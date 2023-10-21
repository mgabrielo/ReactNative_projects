import { combineReducers, configureStore } from "@reduxjs/toolkit";
import AsyncStorage from '@react-native-async-storage/async-storage';
import userReducer from "./user/userSlice";
import newJobPostSlice from "./newJobPost/newJobPostSlice";
import { persistReducer, persistStore } from "redux-persist";

const rootReducer = combineReducers({
    newJobPost: newJobPostSlice,
    user: userReducer,
})
const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    version: 2
}
const persistedReducer = persistReducer(persistConfig, rootReducer)


export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
})

export const persistor = persistStore(store);