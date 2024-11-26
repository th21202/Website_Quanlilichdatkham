import { logger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { routerMiddleware } from "connected-react-router";
import { createBrowserHistory } from "history";

import { createStore, applyMiddleware, compose } from "redux";
import { createStateSyncMiddleware } from "redux-state-sync";
import { persistStore } from "redux-persist";

import createRootReducer from "./store/reducers/rootReducer";
import actionTypes from "./store/actions/actionTypes";

const environment = process.env.NODE_ENV || "development";
let isDevelopment = environment === "development";

//hide redux logs
isDevelopment = false;

export const history = createBrowserHistory({
  basename: process.env.REACT_APP_ROUTER_BASE_NAME,
});

const reduxStateSyncConfig = {
  whitelist: [actionTypes.APP_START_UP_COMPLETE, actionTypes.CHANGE_LANGUAGE],
};

const rootReducer = createRootReducer(history);
const middleware = [
  //xử lý các action đồng bộ
  routerMiddleware(history),
  //xử lý các action không đồng bộ
  thunkMiddleware,
  //xử lý các action đồng bộ
  createStateSyncMiddleware(reduxStateSyncConfig),
];
//hiển thị log
if (isDevelopment) middleware.push(logger);

const composeEnhancers =
  isDevelopment && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose;
//tạo store 
const reduxStore = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middleware))
);

export const dispatch = reduxStore.dispatch;
//lưu trữ dữ liệu
export const persistor = persistStore(reduxStore);

export default reduxStore;
