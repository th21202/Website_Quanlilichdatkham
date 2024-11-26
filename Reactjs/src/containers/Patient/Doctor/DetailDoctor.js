import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "../../HomePage/HomeHeader";
import "./DetailDoctor.scss";
import { getDetailInforDoctor } from "../../../services/userService";
import { LANGUAGES } from "../../../utils";
import DoctorSchedule from "./DoctorSchedule";
import DoctorExtraInfor from "./DoctorExtraInfor";
class DetailDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detailDoctor: {},
      currentDoctorId: -1,
    };
  }

  async componentDidMount() {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let id = this.props.match.params.id;
      this.setState({
        currentDoctorId: id,
      });
      let res = await getDetailInforDoctor(id);
      if (res && res.errCode === 0) {
        this.setState({
          detailDoctor: res.data,
        });
      }
      //   imageBase64 = new Buffer(user.image, "base64").toString("binary");
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) { }

  render() {
    let { detailDoctor } = this.state;
    let { language } = this.props;
    let nameVi = "",
      nameEn = "";
    if (detailDoctor && detailDoctor.positionData) {
      nameVi = `${detailDoctor.positionData.valueVi}, ${detailDoctor.lastName} ${detailDoctor.firstName}`;
      nameEn = `${detailDoctor.positionData.valueEn}, ${detailDoctor.firstName} ${detailDoctor.lastName}`;
    }

    return (
      <>
        <HomeHeader isShowBanner={false} />
        <div className="doctor-detail-container">
          <div className="intro-doctor">
            <div
              className="content-left "
              style={{
                backgroundImage: `url(${detailDoctor && detailDoctor.image ? detailDoctor.image : ""
                  })`,
              }}
            ></div>
            <div className="content-right">
              
              <div className="up">
                <div className="name">
                    {language === LANGUAGES.VI ? nameVi : nameEn}
                </div>
                <svg  className="svg" xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M9.4905 1.44033C9.1861 1.68936 9.03389 1.8139 8.87133 1.91849C8.4987 2.15825 8.08021 2.32465 7.64013 2.40807C7.44814 2.44446 7.24879 2.45973 6.8501 2.49027C5.84838 2.56702 5.3475 2.60538 4.92964 2.74708C3.96314 3.0748 3.20291 3.80461 2.86154 4.73245C2.71394 5.1336 2.67398 5.61444 2.59403 6.5761C2.56222 6.95884 2.54632 7.15021 2.5084 7.33452C2.42152 7.75701 2.24818 8.15875 1.99843 8.51647C1.88948 8.67253 1.75977 8.81864 1.50034 9.11088C0.84854 9.84516 0.522628 10.2122 0.331528 10.5961C-0.110509 11.484 -0.110509 12.516 0.331528 13.4039C0.522641 13.7878 0.84854 14.1548 1.50034 14.8891C1.75973 15.1813 1.88948 15.3275 1.99843 15.4835C2.24818 15.8412 2.42152 16.243 2.5084 16.6655C2.54632 16.8498 2.56222 17.0412 2.59403 17.4239C2.67398 18.3856 2.71394 18.8664 2.86154 19.2676C3.20291 20.1954 3.96314 20.9252 4.92964 21.253C5.3475 21.3946 5.84838 21.433 6.8501 21.5098C7.24879 21.5402 7.44814 21.5556 7.64013 21.592C8.08021 21.6754 8.4987 21.8418 8.87133 22.0816C9.03389 22.1861 9.18609 22.3106 9.4905 22.5596C10.2554 23.1854 10.6378 23.4983 11.0376 23.6818C11.9625 24.1061 13.0375 24.1061 13.9624 23.6818C14.3623 23.4983 14.7446 23.1854 15.5095 22.5596C15.8139 22.3106 15.9661 22.1861 16.1286 22.0816C16.5012 21.8418 16.9198 21.6754 17.3599 21.592C17.5519 21.5556 17.7512 21.5402 18.1499 21.5098C19.1516 21.433 19.6525 21.3946 20.0704 21.253C21.0369 20.9252 21.7971 20.1954 22.1385 19.2676C22.286 18.8664 22.326 18.3856 22.406 17.4239C22.4377 17.0412 22.4537 16.8498 22.4916 16.6655C22.5785 16.243 22.7519 15.8412 23.0016 15.4835C23.1105 15.3275 23.2402 15.1813 23.4996 14.8891C24.1515 14.1548 24.4774 13.7878 24.6685 13.4039C25.1105 12.516 25.1105 11.484 24.6685 10.5961C24.4774 10.2122 24.1515 9.84516 23.4996 9.11088C23.2402 8.81864 23.1105 8.67253 23.0016 8.51647C22.7519 8.15875 22.5785 7.75701 22.4916 7.33452C22.4537 7.15021 22.4377 6.95884 22.406 6.5761C22.326 5.61444 22.286 5.1336 22.1385 4.73245C21.7971 3.80461 21.0369 3.0748 20.0704 2.74708C19.6525 2.60538 19.1516 2.56702 18.1499 2.49027C17.7512 2.45973 17.5519 2.44446 17.3599 2.40807C16.9198 2.32465 16.5012 2.15825 16.1286 1.91849C15.9661 1.8139 15.8139 1.68937 15.5095 1.44033C14.7446 0.814599 14.3623 0.501735 13.9624 0.318267C13.0375 -0.106089 11.9625 -0.106089 11.0376 0.318267C10.6378 0.501723 10.2554 0.814599 9.4905 1.44033ZM17.9669 9.43577C18.3641 9.05436 18.3641 8.436 17.9669 8.05459C17.5696 7.6732 16.9254 7.6732 16.5281 8.05459L10.4654 13.8749L8.47183 11.9611C8.07454 11.5798 7.4304 11.5798 7.03311 11.9611C6.63583 12.3425 6.63583 12.9608 7.03311 13.3423L9.74598 15.9467C10.1433 16.328 10.7874 16.328 11.1848 15.9467L17.9669 9.43577Z" fill="#0016E1"/>
                </svg>
              </div>
              <div className="about">
                <span className="about-title">About</span>
                <svg className="svg" xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M8.5 0C3.80559 0 0 3.68945 0 8.2407C0 12.7919 3.80559 16.4814 8.5 16.4814C13.1945 16.4814 17 12.7919 17 8.2407C17 3.68945 13.1945 0 8.5 0ZM8.5 14.8333C4.75049 14.8333 1.7 11.8758 1.7 8.2407C1.7 4.60557 4.75049 1.64814 8.5 1.64814C12.2496 1.64814 15.3 4.60557 15.3 8.2407C15.3 11.8758 12.2496 14.8333 8.5 14.8333ZM9.56436 4.94442C9.56436 5.5419 9.11565 5.97451 8.50864 5.97451C7.87706 5.97451 7.43936 5.5419 7.43936 4.93299C7.43936 4.34775 7.88891 3.91433 8.50864 3.91433C9.11565 3.91433 9.56436 4.34775 9.56436 4.94442ZM7.65186 7.41663H9.35186V12.361H7.65186V7.41663Z" fill="black"/>
                </svg>
              </div>
              <div className="down">
                {detailDoctor &&
                  detailDoctor.Markdown &&
                  detailDoctor.Markdown.description && (
                    <span className="description">{detailDoctor.Markdown.description}</span>
                  )}
              </div>
            </div>
          </div>
          <div className="schedule-doctor">
            <div className="content-left">
              <DoctorSchedule doctorIdFromParent={this.state.currentDoctorId} />
            </div>
            <div className="content-right">
              <DoctorExtraInfor
                doctorIdFromParent={this.state.currentDoctorId}
              />
            </div>
          </div>
          
          <div className="comment-doctor"></div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return { language: state.app.language };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
// Kiểm tra điều kiện
// detailDoctor && detailDoctor.image ? detailDoctor.image : ""
// - Kiểm tra detailDoctor có tồn tại không
// - Nếu có thì kiểm tra detailDoctor.image
// - Nếu có image thì dùng image đó
// - Nếu không thì dùng chuỗi rỗng ""