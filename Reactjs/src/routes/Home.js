import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { LANGUAGES, USER_ROLE } from "../utils";

class Home extends Component {
  render() {
    // check đk 
    const { isLoggedIn, userInfo } = this.props;
   

    let linkToRedirect =
      isLoggedIn && userInfo.roleId !== USER_ROLE.PATIENT
        ? "/"
        : "/home";

    return <Redirect to={linkToRedirect} />;
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
