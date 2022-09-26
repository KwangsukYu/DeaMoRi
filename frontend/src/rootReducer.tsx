import { combineReducers } from "@reduxjs/toolkit";
import userInfo from "./Slices/userInfo";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

// 만들어 놓은 리듀서들을 합친다.
const reducer = combineReducers({
  userInfo
});

const persistConfig = {
  key: "root",
  storage
};

const persistedReducer = persistReducer(persistConfig, reducer);
// React에서 사용할 수 있도록 타입을 만들어 export 해준다.
export type ReducerType = ReturnType<typeof reducer>;
export default persistedReducer;
