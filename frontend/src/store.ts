import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import persistedReducer from "./rootReducer";

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({ serializableCheck: false }).concat(logger),
  devTools: process.env.NODE_ENV !== "production"
});

export type AppDispatch = typeof store.dispatch;
export default store;
