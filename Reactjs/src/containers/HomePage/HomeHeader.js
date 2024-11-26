import React, { Component } from "react";
import { connect } from "react-redux";
import "./HomeHeader.scss";
import { FormattedMessage } from "react-intl";
import { LANGUAGES } from "../../utils";

import { changeLanguageApp } from "../../store/actions/appActions";
import { withRouter } from "react-router";

import MenuHomeHeader from "./MenuHomeHeader";
import HomeMenuSearchSpecialty from "./HomeMenuSearchSpecialty";
import { emitter } from "../../utils/emitter";
import { Alert } from "reactstrap";

import "../HomePage/Section/Services.scss";
import { NavLink, Link} from "react-router-dom";
import heroImg01 from "../../assets/images/hero-img01.png"
import heroImg02 from "../../assets/images/hero-img02.png"
import heroImg03 from "../../assets/images/hero-img03.png"
const navLinks = [
  {
    path: '/home', 
    display: <FormattedMessage id="navigation.home" />
  },
  {
    path: '/search', 
    display: <FormattedMessage id="navigation.find-doctor" />
  },
  {
    path: '/about', 
    display: <FormattedMessage id="navigation.about" />
  },
  {
    path: '/services', 
    display: <FormattedMessage id="navigation.services" />
  },
  {
    path: '/Admin', 
    display: <FormattedMessage id="navigation.admin" />
  }
]
class HomeHeader extends Component {
  constructor() {
    super();

    this.state = {
      // showMenuSearchSpecialty: false,
      previewImgURL:[]
    };
  }

  componentDidMount() {
    let imageBase64 = "";
    if (this.props && this.props.userInfo && this.props.userInfo.image) {
      imageBase64 = new Buffer(this.props.userInfo.image, "base64").toString("binary");
    }

    this.setState({
      previewImgURL: imageBase64,
    });
  }

  handleClickShowHomeMenuSearchSpecialty = () => {
    this.setState({
      showMenuSearchSpecialty: !this.state.showMenuSearchSpecialty,
    });
  };

  changeLanguage = (language) => {
    this.props.changeLanguageAppRedux(language);
    //fire 1 cái action của redux là changeLanguageApp đầu vào language
  };

  returnToHome = () => {
    if (this.props.history) {
      this.props.history.push(`/home`);
    }
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.userInfo !== this.props.userInfo) {
      let imageBase64 = "";
      if (this.props.userInfo.image) {
        imageBase64 = new Buffer(this.props.userInfo.image, "base64").toString("binary");
      }

      this.setState({
        previewImgURL: imageBase64,
      });
    }
  }

  render() {
    //lây từ trong redux ra
    let language = this.props.language;
    // let {userInfo}=this.props;
    let {user}=this.state;

    return (
      <>
        <div className="home-header-container">
          <div className="home-header-content">
            <div className="left-content">
              {/* <i className="fas fa-bars"></i> */}
              {/* <div className="menu-home-header">
                <MenuHomeHeader />
              </div> */}
              <div
                className="header-logo"
                onClick={() => {
                  this.returnToHome();
                }}
              ></div>
            </div>
            <div className="center-content">
            <div className="navigation">
                <ul className="menu">
                 
                  {navLinks.map((link, index) => (
                    <li key={index}>
                      <NavLink
                        to={link.path}
                        className={navClass =>
                          navClass.isActive ? 'active' : ''
                        }
                      >
                        {link.display}
                      </NavLink>
                    </li>
                     
                  ))}
                  
                </ul>
              </div>
              {/* <div className="child-content">
                <div>
                  <b>
                    <FormattedMessage id="homeheader.speciality" />
                  </b>
                </div>
                <div className="subs-title">
                  <FormattedMessage id="homeheader.searchdoctor" />
                </div>
              </div>
              <div className="child-content">
                <div>
                  <b>
                    <FormattedMessage id="homeheader.health-facility" />
                  </b>
                </div>
                <div className="subs-title">
                  <FormattedMessage id="homeheader.select-room" />
                </div>
              </div>
              <div className="child-content">
                <div>
                  <b>
                    <FormattedMessage id="homeheader.doctor" />
                  </b>
                </div>
                <div className="subs-title">
                  <FormattedMessage id="homeheader.select-doctor" />
                </div>
              </div>
              <div className="child-content">
                <div>
                  <b>
                    <FormattedMessage id="homeheader.fee" />
                  </b>
                </div>
                <div className="subs-title">
                  <FormattedMessage id="homeheader.check-health" />
                </div>
              </div> */}
            </div>
            <div className="right-content">
              
              <div
                className={
                  language === LANGUAGES.VI
                    ? "language-vi active"
                    : "language-vi"
                }
              >
                <span onClick={() => this.changeLanguage(LANGUAGES.VI)}>
                  VN
                </span>
              </div>
              <div
                className={
                  language === LANGUAGES.EN //bien language duoc khai bao 
                    ? "language-en active"
                    : "language-en"
                }
              >
                <span onClick={() => this.changeLanguage(LANGUAGES.EN)}>
                  EN
                </span>
              </div>


           

              <div
              class="avatar-profile mx-10"
              style={{
                backgroundImage: `url(${this.state.previewImgURL ? this.state.previewImgURL : ""})`,
              }}
              >
                </div>

              <div className="menu-home-header">
                <MenuHomeHeader />
              </div>
            </div>
          </div>
        </div>

      
        {this.props.isShowBanner === true && (
         
      
      <section class="hero_section">
      <div class="container">
        <div className="hero-content">
        <div class="hero-text">
          <div class="hero-title">
          <h1><FormattedMessage id="hero.title" /></h1>
          <p><FormattedMessage id="hero.subtitle" /></p>
            <button class="btn"><FormattedMessage id="hero.button" /></button>
          </div>
          
          <div class="hero-counter">
            <div class="counter-item">
              <h2>30+</h2>
              <span class="counter-line yellow"></span>
                <p><FormattedMessage id="hero.counter.experience.text" /></p>
            </div>
            <div class="counter-item">
              <h2>15+</h2>
              <span class="counter-line purple"></span>
                <p><FormattedMessage id="hero.counter.location.text" /></p>
            </div>
            <div class="counter-item">
              <h2>100%</h2>
              <span class="counter-line iris-blue"></span>
              <p><FormattedMessage id="hero.counter.satisfaction.text" /></p>
            </div>
          </div>
        </div>
        {/* <div
                className="search"
                onClick={() => this.handleClickShowHomeMenuSearchSpecialty()}
              >
                <i className="fas fa-search"></i>
                <FormattedMessage id="banner.search">
                  {(placeholder) => (
                    <input type="text" placeholder={placeholder} />
                  )}
                </FormattedMessage>

                {this.state.showMenuSearchSpecialty && (
                  <HomeMenuSearchSpecialty
                    showMenuSearchSpecialty={this.state.showMenuSearchSpecialty}
                  />
                )}
              </div>  */}
        <div class="hero-images">
          <div class="image-column">
            <img src={heroImg01} alt="" class="hero-img"/>
          </div>
          <div class="image-column">
             <img src={heroImg02} alt="" class="hero-img"/>
            <img src={heroImg03} alt="" class="hero-img"/>
          </div>
        </div>
        </div>
      </div>
      </section>
        )}
      </>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    userInfo: state.user.userInfo,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(HomeHeader)
);

