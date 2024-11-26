import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import "./HandBook.scss";

class HandBook extends Component {
  handleOnChange = () => {
    console.log('click');
    this.props.history.push('/sign-up');
  }

  render() {
    return (
      <div className="main-container1">
        <div className="appointment-doc-img1"></div>
        <div className="rectangle1">
          <div className="rectangle-1">
            <span className="book-appointment">
              Book Appointment <br />With 100+ Trusted Doctors
            </span>
            <button className="button" onClick={this.handleOnChange}>
              <span className="create-account">Create account</span>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(HandBook));