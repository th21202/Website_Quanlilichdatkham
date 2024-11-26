import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import logo from '../../assets/images/logo.png'
import {RiLinkedinFill} from 'react-icons/ri'
import { Link } from 'react-router-dom';
import {FaFacebookF, FaInstagram} from 'react-icons/fa'
import {AiFillYoutube, AiFillGithub, AiOutlineInstagram} from 'react-icons/ai'
import "./HomeFooter.scss";

const socialLinks = [
  {
    path: 'https://www.linkedin.com',
    icon: <RiLinkedinFill className='group-hover:text-primaryColor w-4 h-4'/>
  },
  {
    path: 'https://www.facebook.com',
    icon: <FaFacebookF className='group-hover:text-primaryColor w-4 h-4'/>
  },
  {
    path: 'https://www.instagram.com',
    icon: <AiOutlineInstagram className='group-hover:text-primaryColor w-4 h-4'/>
  },
  {
    path: 'https://www.youtube.com',
    icon: <AiFillYoutube className='group-hover:text-primaryColor w-4 h-4'/>
  },
  {
    path: 'https://www.github.com',
    icon: <AiFillGithub className='group-hover:text-primaryColor w-4 h-4'/>
  }
]
const quickLinks01 = [
  {
    path: '/home', 
    display: 'Home'
  },
  {
    path: '/', 
    display: 'About us'
  },
  {
    path: '/services', 
    display: 'Services'
  },
  {
    path: '/', 
    display: 'Blog'
  }
]
const quickLinks02 = [
  {
    path: '/find-a-doctor', 
    display: 'Find a Doctor'
  },
  {
    path: '/', 
    display: 'Request an Appointment'
  },
  {
    path: '/', 
    display: 'Find a Location'
  },
  {
    path: '/', 
    display: 'Get a Opinion'
  }
]
const quickLinks03 = [
  {
    path: '/', 
    display: 'Donate'
  },  
  {
    path: '/', 
    display: 'Contact Us'
  },
  {
    path: '/', 
    display: 'FAQ'
  }
]
class HomeFooter extends Component {
  render() {
    return (
      <footer class="footer">
      <div class="container">
        <div class="footer-content">
          <div class="footer-logo">
            <img src={logo} alt="logo" />
            <p class="footer-text">
              Copyright @ 2024 developed by <span class="text-primaryColor">Linh vo</span>
            </p>
            <div class="social-links">
              {socialLinks.map((link, index) => (
                <Link 
                  key={index} 
                  to={link.path}  
                  className="social-icon">
                  {link.icon}
                </Link>
              ))}
            </div>
          </div>
    
          <div class="quick-links">
            <h2 class="quick-links-title">Quick Links</h2>
            <ul>
              {quickLinks01.map((item, index) => (
                <li key={index} class="quick-link-item">
                  <Link class="quick-link" to={item.path}>{item.display}</Link>
                </li>
              ))}
            </ul>   
          </div>
            
          <div class="quick-links">
            <h2 class="quick-links-title">Quick Links</h2>
            <ul>
              {quickLinks02.map((item, index) => (
                <li key={index} class="quick-link-item">
                  <Link class="quick-link" to={item.path}>{item.display}</Link>
                </li>
              ))}
            </ul>   
          </div>
    
          <div class="support">
            <h2 class="support-title">Support</h2>
            <ul>
              {quickLinks03.map((item, index) => (
                <li key={index} class="support-item">
                  <Link class="support-link" to={item.path}>{item.display}</Link>
                </li>
              ))}
            </ul>   
          </div>
        </div>
      </div>
    </footer>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
