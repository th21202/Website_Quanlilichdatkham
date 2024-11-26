import React, { Component } from "react";
import { connect } from "react-redux";

import { FormattedMessage } from "react-intl";
import Slider from "react-slick";
import * as actions from "../../../store/actions";
import { LANGUAGES } from "../../../utils";
import { withRouter } from "react-router";
import "./OutStandingDoctor.scss";
class OutStandingDoctor extends Component {
  constructor(props) {
    super(props);
    //Khi state thay đổi, component sẽ tự động render lại
    this.state = {
      arrDoctors: [],// arrDoctors là một mảng trong state để lưu danh sách bác sĩ
    };
  }
  //cập nhật theo redux
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.topDoctorsRedux !== this.props.topDoctorsRedux) {
      this.setState({
        arrDoctors: this.props.topDoctorsRedux,
      });
    }
  }

  //Khi component được mount, component sẽ tự động render lại
  componentDidMount() {
    this.props.loadTopDoctors(4); // Gọi hàm được truyền từ component cha để lấy data từ redux
  }

  handleViewDetailDoctor = (doctor) => {
    if (this.props.history) {
      this.props.history.push(`/detail-doctor/${doctor.id}`);
    }
  };

  // handleOnClickSeeMoreDoctor = () => {
  //   if (this.props.history) {
  //     this.props.history.push(`/list-oustanding-doctor`);
  //   }
  // };
  //Khi click vào button load more, component sẽ tự động render lại     
  handleLoadMore=async () => {
    let total=this.state.arrDoctors.length+4;
    this.props.loadTopDoctors(total);
  }
  render() {
    let arrDoctors = this.state.arrDoctors;
    let { language } = this.props;
    // arrDoctors = arrDoctors
    //   .concat(arrDoctors)
    //   .concat(arrDoctors)
    //   .concat(arrDoctors)
    //   .concat(arrDoctors);
    return (
      <div className="section-share section-outstanding-doctor">
        <div className="section-container">
          {/* <div className="section-header">
            {/* <span className="title-section">
              <FormattedMessage id="homepage.outstanding-doctor" />
            </span> 
            <button
              className="btn-section"
              onClick={() => this.handleOnClickSeeMoreDoctor()}
            >
              <FormattedMessage id="homepage.more-infor" />
            </button>
          </div> */}
         < section>
          <div className="container">
            <div className="xl:w-[950px] mx-auto">
              <h2 className="heading text-center"><FormattedMessage id="homepage.outstanding-doctor" /></h2>
              <p className="text_para text-center">
                <FormattedMessage id="homepage.outstanding-doctor-text" />
              </p>
              </div>
          </div>
        </section>
          <div class="row">
                {
                  //render ra 4 card doctor
                  //khi length >0 mới thực hiện map
                  arrDoctors &&
                  arrDoctors.length > 0 && arrDoctors.map((item,index)=>{
                    let imageBase64 = "";//
                    if (item.image) {
                      //lấy hình ảnh từ API -> chuỗi base64 để hiển thị
                      //-> hình ảnh từ dạng lưu trữ (base64) sang dạng hiển thị (binary)
                      imageBase64 = new Buffer(item.image, "base64").toString(
                        "binary"
                      );
                    }
                    let nameVi = `${item.positionData.valueVi}, ${item.lastName} ${item.firstName}`;
                    let nameEn = `${item.positionData.valueEn}, ${item.firstName} ${item.lastName}`;
                    return (
                      // <div class="col-lg-3 col-auto my-10">
                      //     <div class="card-bs-custom pointer" onClick={() => this.handleViewDetailDoctor(item)}>
                      //       <figure class="bg-cover bg-center" 
                      //       //lấy theo biến imageBase64 để hiển thị hình ảnh
                      //         style={{ backgroundImage: `url(${imageBase64})`, }}></figure>
                      //         <div class=" specialty-name ">
                      //             <div class="name" >{language === LANGUAGES.VI ? nameVi : nameEn}</div>
                      //             <div class="custom-bg custom-padding custom-text">
                      //               {item.Doctor_Infor &&
                      //               item.Doctor_Infor.specialtyData &&
                      //               item.Doctor_Infor.specialtyData.name
                      //                 ? item.Doctor_Infor.specialtyData.name
                      //                 : ""}
                      //             </div>
                                      
                      //         </div>
                      //     </div>
                      // </div>
                      <div class="col-lg-3 col-auto my-10">
                          <div className="doctor-item" onClick={() => this.handleViewDetailDoctor(item)}>
                            <div className="rectangle">
                            <figure className="avatar" 
                            //lấy theo biến imageBase64 để hiển thị hình ảnh
                              style={{ backgroundImage: `url(${imageBase64})`, }}></figure>
                              </div>
                              <div className="specialty-name">
                                  <div className="doctor-name" >{language === LANGUAGES.VI ? nameVi : nameEn}</div>
                                  <div className=" specialty custom-text">
                                    {item.Doctor_Infor &&
                                    item.Doctor_Infor.specialtyData &&
                                    item.Doctor_Infor.specialtyData.name
                                      ? item.Doctor_Infor.specialtyData.name
                                      : ""}
                                  </div>
                                      
                              </div>
                          </div>
                      </div>
                    );
                  })
                }
          </div>
              <div className="d-flex justify-content-center">
                <button type="button" className="btn btn-primary my-15" onClick={() => this.handleLoadMore()}>{this.props.language=="en" ? "Load more" : "Tải thêm"}</button>
              </div>

        
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    topDoctorsRedux: state.admin.topDoctors,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadTopDoctors: (limit) => dispatch(actions.fetchTopDoctor(limit)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor)
);
