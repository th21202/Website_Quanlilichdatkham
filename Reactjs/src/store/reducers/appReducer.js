import actionTypes from "../actions/actionTypes";
//quan li trạng thái của ứng dụng và state luu trữ lại các biến 
// vd khi user login sẽ lưu thông tin vào reducer và khi cần 
//thay đổi avt hoặc password
// thì ko cần phải call api mà trực tiếp lấy từ reducer
const initContentOfConfirmModal = {
  isOpen: false,
  messageId: "",
  handleFunc: null,
  dataFunc: null,
};

const initialState = {
  started: true,
  language: "vi",
  systemMenuPath: "/system/user-manage",
  contentOfConfirmModal: {
    ...initContentOfConfirmModal,
  },
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.APP_START_UP_COMPLETE:
      //Đánh dấu ứng dụng đã khởi động hoàn tất.
      return {
        ...state,
        started: true,
      };
    case actionTypes.SET_CONTENT_OF_CONFIRM_MODAL:
      //Cập nhật nội dung của modal xác nhận.
      return {
        ...state,
        contentOfConfirmModal: {
          ...state.contentOfConfirmModal,
          ...action.contentOfConfirmModal,
        },
      };
    case actionTypes.CHANGE_LANGUAGE:
      // Thay đổi ngôn ngữ của ứng dụng.
      return {
        ...state,
        language: action.language,
      };
    default:
      return state;
  }
};

export default appReducer;
