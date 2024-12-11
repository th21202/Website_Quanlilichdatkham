import actionTypes from "./actionTypes";
// import { handleLoginApi } from "D:\\DOAN2024\\Reactjs\\src\\services\\userService.js"; // Thay đổi tên import nếu cần
export const addUserSuccess = () => ({
  type: actionTypes.ADD_USER_SUCCESS,
});

export const userLoginSuccess = (userInfo) => ({
  type: actionTypes.USER_LOGIN_SUCCESS,
  userInfo: userInfo,
});

export const userLoginFail = () => ({
  type: actionTypes.USER_LOGIN_FAIL,
});

export const processLogout = () => ({
  type: actionTypes.PROCESS_LOGOUT,
});
