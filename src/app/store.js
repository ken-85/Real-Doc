import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
import fileReducer from "../Features/File/FileSlice";
import authReducer from "../Features/auth/authSlice";
import allFilesReducer from "../Features/File/allFilesSlice";

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["file"],
};

const rootReducer = combineReducers({
  file: fileReducer,
  allFiles: allFilesReducer,
  auth: authReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

export const persistor = persistStore(store);
