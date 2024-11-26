import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import appReducer from "./appReducer";
import adminReducer from "./adminReducer";
import userReducer from "./userReducer";

import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

const persistCommonConfig = {
  storage: storage,//sử dụng storage để lưu trữ dữ liệu
  stateReconciler: autoMergeLevel2,//hợp nhất các state 
};

const userPersistConfig = {
  ...persistCommonConfig,
  key: "user",
  whitelist: ["isLoggedIn", "userInfo"],//chỉ lưu trữ các state được chỉ định
};

const appPersistConfig = {
  ...persistCommonConfig,
  key: "app",
  whitelist: ["language"],
};

export default (history) =>
  combineReducers({
    router: connectRouter(history),
    //tất cả thông tin  user lưu xún local storage
    // data của key=user là persistReducer(userPersistConfig, userReducer),
    user: persistReducer(userPersistConfig, userReducer),
    app: (appPersistConfig, appReducer),
    admin: adminReducer,
  });
