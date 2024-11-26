import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./Services.scss";

class Services extends Component {
  render() {
    return (
      
  <div className="content-down py-30">
        <section class="medical-services">
          <div class="container">
            <div className="services-content">
              <h2 className="heading">
                <FormattedMessage id="services.title" />
              </h2>
              <p className="text-para">
                <FormattedMessage id="services.description" />
              </p>
              <div className="services-list">
                <div className="options">
                  <div className="option-child">
                    <div className="icon-child">
                      <img src={require('../../../assets/images/thankinh.png').default} alt="neurology" />
                    </div>
                    <div className="text-child">
                      <FormattedMessage id="services.specialties.neurology" />
                    </div>
                  </div>

                  <div className="option-child">
                    <div className="icon-child">
                      <img src={require('../../../assets/images/tim.png').default} alt="cardiology" />
                    </div>
                    <div className="text-child">
                      <FormattedMessage id="services.specialties.cardiology" />
                    </div>
                  </div>
                  <div className="option-child">
                    <div className="icon-child">
                      <img src={require('../../../assets/images/tieuhoa.png').default} alt="cardiology" />
                    </div>
                    <div className="text-child">
                      <FormattedMessage id="services.specialties.gastroenterology" />
                    </div>
                  </div>
                  <div className="option-child">
                    <div className="icon-child">
                      <img src={require('../../../assets/images/xuongkhop.png').default} alt="cardiology" />
                    </div>
                    <div className="text-child">
                      <FormattedMessage id="services.specialties.orthopedics" />
                    </div>
                  </div>
                  <div className="option-child">
                    <div className="icon-child">
                      <img src={require('../../../assets/images/nhakhoa.png').default} alt="cardiology" />
                    </div>
                    <div className="text-child">
                      <FormattedMessage id="services.specialties.dental" />
                    </div>
                  </div>
                  <div className="option-child">
                    <div className="icon-child">
                      <img src={require('../../../assets/images/cotsong.png').default} alt="cardiology" />
                    </div>
                    <div className="text-child">
                      <FormattedMessage id="services.specialties.spine" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
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

export default connect(mapStateToProps, mapDispatchToProps)(Services);
