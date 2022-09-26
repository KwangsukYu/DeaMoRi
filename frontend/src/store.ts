import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import persistedReducer from "./rootReducer";

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(logger)
});

export type AppDispatch = typeof store.dispatch;
export default store;
