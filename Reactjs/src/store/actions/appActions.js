import actionTypes from "./actionTypes";

export const appStartUpComplete = () => ({
  type: actionTypes.APP_START_UP_COMPLETE,
});
//gửi action để thay đổi nội dung của modal
// export const setContentOfConfirmModal = (contentOfConfirmModal) => ({
//   type: actionTypes.SET_CONTENT_OF_CONFIRM_MODAL,
//   contentOfConfirmModal: contentOfConfirmModal,
// });

export const changeLanguageApp = (languageInput) => ({
  //gửi action để thay đổi ngôn ngữ
  type: actionTypes.CHANGE_LANGUAGE,
  //lưu trữ ngôn ngữ
  language: languageInput,
});
