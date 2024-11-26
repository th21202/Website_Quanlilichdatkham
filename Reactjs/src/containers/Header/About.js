import React, { Component } from "react";
import { connect } from "react-redux";

import { FormattedMessage } from "react-intl";
import HomeHeader from "../HomePage/HomeHeader";
// import Slider from "react-slick";

import './About.scss'; 

import HomeFooter from "../HomePage/HomeFooter";

class HandBook extends Component {
  render() {
    return (
      <>
        <HomeHeader isShowBanner={false} />
        
     <div class="container-about">
   <div class="about-us">
    <h1>
     ABOUT US
    </h1>
    <div class="about-us-content">
     <img alt="Two healthcare professionals standing and smiling" height="400" src="https://storage.googleapis.com/a1aa/image/o6qmyem8VuV4OKCKwXYFDPLiDgejvlzkk5GxciYeGfCC7HBPB.jpg" width="600"/>
     <div class="about-us-text">
      <p>
      Chào mừng đến với MEDICAL, Đối tác đáng tin cậy của bạn trong việc quản lý nhu cầu chăm sóc sức khỏe của bạn một cách thuận tiện và hiệu quả. Tại Prescribe, chúng tôi hiểu những 
      thách thức mà mọi người phải đối mặt khi lên lịch hẹn khám bác sĩ và quản lý hồ sơ sức khỏe của họ.</p>
      <p>
      MEDICAL cam kết đạt được sự xuất sắc trong công nghệ chăm sóc sức khỏe. 
      Chúng tôi liên tục nỗ lực cải thiện nền tảng của mình, tích hợp những tiến bộ mới nhất để cải thiện trải nghiệm của người dùng và cung cấp dịch vụ vượt trội. Cho dù bạn đang đặt lịch hẹn khám đầu tiên hay quản lý việc chăm sóc liên tục, 
      MEDICAL luôn ở đây để hỗ trợ bạn trong từng bước thực hiện. </p>
      <p>
       <strong>
        Our Vision
       </strong>
      </p>
      <p>
      Tầm nhìn của chúng tôi tại Prescribe là tạo ra trải nghiệm chăm sóc sức khỏe liền mạch cho mọi người dùng. 
      Chúng tôi hướng đến mục tiêu thu hẹp khoảng cách giữa bệnh nhân và nhà cung cấp dịch vụ chăm sóc sức khỏe, 
      giúp bạn dễ dàng tiếp cận dịch vụ chăm sóc bạn cần, khi bạn cần.      </p>
     </div>
    </div>
   </div>
   <div class="why-choose-us">
    <h2>
     WHY CHOOSE US
    </h2>
    <div class="features">
     <div class="feature">
      <h3>
       HIỆU QUẢ:
      </h3>
      <p>
      Lịch hẹn hợp lý phù hợp với lối sống bận rộn của bạn.
      </p>
     </div>
     <div class="feature">
      <h3>
      SỰ TIỆN LỢI:
      </h3>
      <p>
      Tiếp cận mạng lưới các chuyên gia chăm sóc sức khỏe đáng tin cậy tại khu vực của bạn.
      </p>
     </div>
     <div class="feature">
      <h3>
      CÁ NHÂN HÓA:
      </h3>
      <p>
      Những khuyến nghị và lời nhắc nhở phù hợp giúp bạn duy trì sức khỏe tốt nhất.      </p>
     </div>
    </div>
   </div>
  </div>
 
        <HomeFooter/>

      </>
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

export default connect(mapStateToProps, mapDispatchToProps)(HandBook);
