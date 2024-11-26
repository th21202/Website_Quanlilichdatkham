import { useRef, useState, useEffect } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
// import * as actions from "../store/actions";
import * as actions from "../../store/actions";

import "./Login.scss";
import { FormattedMessage } from "react-intl";
import { handleLoginApi } from "../../services/userService";
// import { userLoginSuccess } from "../../store/actions";

import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";


import { PinDropSharp } from "@material-ui/icons";
import { userService } from "../../services/index.js";



export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [errMessage, setErrMessage] = useState("");



  const { isLoggedIn, userInfo, language } = useSelector((state) => ({
    isLoggedIn: state.user.isLoggedIn,
    userInfo: state.user.userInfo,
    language: state.app.language,
  }));

  const dispatch = useDispatch();
  let history = useHistory();

 

  const handleOnChangeUsername = (event) => {
    setUsername(event.target.value)
  };
  const handleOnChangePassword = (event) => {
    setPassword(event.target.value)
  };
  const handleLogin = async () => {
    //trc mỗi lẫn login cleans mã lỗi đi
    //set=rỗng
    setErrMessage("")
    //bắt ngoại lệ 
    try {
      //hứng response
      let data = await handleLoginApi(username, password);
      if (data && data.errCode !== 0) {
        if (language == "vi") {
          setErrMessage("Những thông tin đăng nhập này không khớp với hồ sơ của chúng tôi.")
        } else {
          setErrMessage("These credentials do not match our records.")
        }
      }
      if (data && data.errCode === 0) {
        // history.goBack()
        history.push('/home');
        //dùng redux LƯU USER VÀO DATA.USER
        dispatch(actions.userLoginSuccess(data.user));
      }
    } catch (error) {
      if (error.response) {
        if (error.response.data) {
          setErrMessage(error.response.data.message)
        }
      }
    }
  };
  const handleShowHidePassword = () => {
    setIsShowPassword(!isShowPassword)
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleLogin();
    }
  };


  

  return (
    <div className="login-background">

      <div className="login-container">
        <div className="login-content ">
          <div class="columnapothart">
            <img src={require("../../assets/images/icon1.jpg").default} alt="Image" className="image" />
            {/* <h1 class="apothart ui heading size-headings">Apothart</h1>
          <p class="aninclusive ui text size-texts">An inclusive pharmaceutical<br>marketplace</br></p> */}
          </div>
          <div className="columnenglishuk">
            <div className="col-12 text-login"><FormattedMessage id={"login.login"} /></div>
            <div className="col-12 form-group login-input">
              <label><FormattedMessage id={"login.username"} />:</label>
              <input
                type="text"
                className="form-control"
                placeholder={language === "en" ? "Enter your username" : "Nhập tên đăng nhập"}
                value={username}
                onChange={(event) => handleOnChangeUsername(event)}
              />
            </div>
            <div className="col-12 form-group login-input">
              <label><FormattedMessage id={"login.password"} />:</label>
              <div className="custom-input-password">
                <input
                  className="form-control"
                  type={isShowPassword ? "text" : "password"}
                  placeholder={language === "en" ? "Enter your password" : "Nhập mật khẩu"}
                  onChange={(event) => handleOnChangePassword(event)}
                  onKeyDown={(event) => handleKeyDown(event)}
                />
                <span
                  onClick={() => {
                    handleShowHidePassword();
                  }}
                >
                  <i
                    className={
                      isShowPassword
                        ? "far fa-eye"
                        : "fas fa-eye-slash"
                    }
                  ></i>
                </span>
              </div>
            </div>
            <div className="col-12" style={{ color: "red" }}>
              {errMessage}
            </div>
            <div className="col-12">
              <button
                className="btn-login"
                onClick={() => {
                  handleLogin();
                }}
              >
                Login
              </button>
            </div>
            <div className="col-12 section-forgot-signup">
              <span className="forgot-password pointer" onClick={() => {
                history.push("/forgot-password");
              }}><FormattedMessage id={"login.forgot-password"} /></span>
              <span
                className="sign-up"
                onClick={() => {
                  history.push("/sign-up");
                }}
              >
                <FormattedMessage id={"login.sign-up"} />
              </span>
            </div>
            <div className="col-12 text-center mt-3">
              <span className="text-other-login"> <FormattedMessage id={"login.or-login-with"} />:</span>
            </div>

            <div className="col-12 social-login">
              <i  className="fab fa-google-plus-g google"></i>
              <i className="fab fa-facebook-square facebook"></i>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  
  );
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // navigate: (path) => dispatch(push(path)),
    adminLoginSuccess: (adminInfo) => dispatch(actions.adminLoginSuccess(adminInfo)),
    // adminLoginFail: () => dispatch(actions.adminLoginFail()),
    userLoginSuccess: (userInfor) =>
      dispatch(actions.userLoginSuccess(userInfor)),
  };
};

