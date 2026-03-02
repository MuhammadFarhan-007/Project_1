import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./users/userSlice";
import authReducer from "./auth/authSlice";
import storage from "redux-persist/lib/storage"; // default: localStorage
import { persistReducer, persistStore } from "redux-persist";

// 1. Reducers ko combine karein
const rootReducer = combineReducers({
  auth: authReducer,
  users: userReducer,
});

// 2. Persist Configuration
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"], // Sirf 'auth' ka data save hoga, 'users' ka nahi
};

// 3. Persisted Reducer banayein
const persistedReducer = persistReducer(persistConfig, rootReducer);

// 4. Store configure karein
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // redux-persist ke liye zaroori hai
    }),
});

export const persistor = persistStore(store);