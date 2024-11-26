import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import * as actions from "../store/actions";
import { Redirect, Route, Switch } from "react-router-dom";
import { ConnectedRouter as Router } from "connected-react-router";
import { history } from "../redux";
import { ToastContainer } from "react-toastify";
import Doctor from "../routes/Doctor";

// import AdminLogin from "./AdminDashboard/pages/Login"; // 


import {
  userIsAuthenticated,
  userIsNotAuthenticated,
} from "../hoc/authentication";

import { path } from "../utils";

import Home from "../routes/Home";
import About from "../containers/Header/About.js";
import Services from "../containers/HomePage/services2.js";

import Search from '../containers/Header/Search'; // Import SearchPage
import Login from "./Auth/Login";
import Logout from "./Auth/Logout";
import Signup from "./Auth/Signup";
import AdminLoginn from "../containers/Header/Login";

import { CustomToastCloseButton } from "../components/CustomToast";
import HomePage from "./HomePage/HomePage.js";

import CustomScrollbars from "../components/CustomScrollbars";

import DetailDoctor from "./Patient/Doctor/DetailDoctor";
import DetailSpecialty from "./Patient/Specialty/DetailSpecialty";
import DetailClinic from "./Patient/Clinic/DetailClinic";
import NotFound from "./System/NotFound";
import indexAdminDashboard from "./AdminDashboard/indexAdminDashboard";

import { getOptionGroupUnstyledUtilityClass } from "@mui/base";


import ProfileSetting from "./Profile/ProfileSetting";


class App extends Component {

  handlePersistorState = () => {
    const { persistor } = this.props;
    let { bootstrapped } = persistor.getState();
    if (bootstrapped) {
      if (this.props.onBeforeLift) {
        Promise.resolve(this.props.onBeforeLift())
          .then(() => this.setState({ bootstrapped: true }))
          .catch(() => this.setState({ bootstrapped: true }));
      } else {
        this.setState({ bootstrapped: true });
      }
    }
  }



  componentDidMount() {
    this.handlePersistorState();
  }

  render() {

    return (
      //tạo ra khối trong suốt
      <Fragment>
        {/* giữ lại data -> ko gọi api nhiều lần  */}
        <Router history={history}>
          <div className="main-container">
            {/* <ConfirmModal /> */}
            {/* {this.props.isLoggedIn && <Header />} */}
            <div className="content-container">
              <CustomScrollbars style={{ height: "100vh", width: "100%" }}>
                <Switch>
                  <Route path={path.HOME} exact component={Home} />
                  <Route path={path.LOGIN} component={userIsNotAuthenticated(Login)}/>
                  <Route path="/search" component={Search} />
                  <Route path="/about" component={About} />
                  <Route path="/admin" component={AdminLoginn} />
                  <Route path="/services" component={Services} />
                  <Route path={path.LOG_OUT} component={Logout} />
                  <Route path={path.SIGNUP} exact component={Signup} />
                  {/* <Route
                    path={"/doctor/"}
                    component={userIsAuthenticated(Doctor)}
                  /> */}
                  <Route path={path.HOMEPAGE} component={HomePage} />
                  <Route path={path.DETAIL_DOCTOR} component={DetailDoctor} />
                  <Route path={path.DETAIL_SPECIALTY} component={DetailSpecialty} />
                  <Route path={path.DETAIL_CLINIC} component={DetailClinic} />
                  <Route path={path.ADMIN_DASHBOARD} component={userIsAuthenticated(indexAdminDashboard)}/>
                  <Route path={path.PROFILE_SETTING} component={userIsAuthenticated(ProfileSetting)}/>
                  <Route path="*">
                    <NotFound />
                  </Route>
                </Switch>
              </CustomScrollbars>
            </div>

            {/* <ToastContainer
              className="toast-container"
              toastClassName="toast-item"
              bodyClassName="toast-item-body"
              autoClose={false}
              hideProgressBar={true}
              pauseOnHover={false}
              pauseOnFocusLoss={true}
              closeOnClick={false}
              draggable={false}
              closeButton={<CustomToastCloseButton />}
            /> */}

            <ToastContainer
              position="bottom-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
          </div>
        </Router>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    started: state.app.started,
    //check user có login hay ko
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
