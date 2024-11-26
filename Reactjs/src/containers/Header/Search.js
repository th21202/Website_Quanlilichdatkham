import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { FormattedMessage } from "react-intl";
import HomeMenuSearchSpecialty from '../HomePage/HomeMenuSearchSpecialty';
import HomeHeader from "../HomePage/HomeHeader";
import './Search.scss';
import { getAllSpecialty, getDoctorsBySpecialty  } from "../../services/userService"; //getDoctorsBySpecialty
class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMenuSearchSpecialty: false,
      previewImgURL: [],
      specialties: [],
      doctors: [],
      selectedSpecialty: null,
    };
    //Phương thức này sẽ chuyển đổi trạng thái true và false
    //this trỏ đến instance của class
    this.handleClickShowHomeMenuSearchSpecialty = this.handleClickShowHomeMenuSearchSpecialty.bind(this); // Ràng buộc this
  }

  async componentDidMount() {
    await this.fetchSpecialties();
  }

  fetchSpecialties = async () => {
    try {
      let res = await getAllSpecialty({ limit: 10 }); // Gọi API để lấy danh sách chuyên khoa
      if (res && res.errCode === 0) {
        this.setState({ specialties: res.data ? res.data : [] });
      }
    } catch (error) {
      console.error("Error fetching specialties:", error);
    }
  };

  // fetchDoctors() {
  //   const doctors = [
  //     { name: "Dr. Richard James", specialty: "General Physician" },
  //     { name: "Dr. Sarah Smith", specialty: "Dermatologist" },
  //   ];
  //   this.setState({ doctors });
  // }
  fetchDoctorsBySpecialty = async (specialtyId) => {
  
    try {
      let res = await getDoctorsBySpecialty(specialtyId);
      console.log(" Nhận thông tin dr :", res); // Kiểm tra dữ liệu nhận được
      if (res && res.errCode === 0) {
        // Lọc bỏ các bác sĩ có thông tin null
        const validDoctors = res.data ? res.data.filter(doctor => 
          doctor.id && doctor.firstName && doctor.lastName
        ) : [];
        this.setState({ 
          doctors: validDoctors, 
          selectedSpecialty: specialtyId 
        });
      }
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  handleSpecialtyClick = (specialtyId) => {
    this.fetchDoctorsBySpecialty(specialtyId);
  };
  handleClickShowHomeMenuSearchSpecialty() {
    this.setState(prevState => ({
      showMenuSearchSpecialty: !prevState.showMenuSearchSpecialty // Chuyển đổi trạng thái
    }));
  }

  render() {
    const { specialties, doctors } = this.state;
    return (
      <>
        <HomeHeader isShowBanner={false} />
        <div className="search-container">
          <div
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
          </div>
        </div>
        <div className="doctor-container">
          <div className="sidebar">
            <h2>
              Browse through the doctor specialist:
            </h2>
            {specialties.map((specialty, index) => (
              <div key={index} className="specialty-item" onClick={() => this.handleSpecialtyClick(specialty.id)}>
                {specialty.name}
              </div>
            ))}
          </div>
          <div className="main-content">
            <div className="doctor-list">
            {doctors.map((doctor, index) => {
              let imageBase64 = "";
              if (doctor.image) {
                imageBase64 = new Buffer(doctor.image, "base64").toString(
                  "binary"
                );
                // imageBase64 = `data:image/jpeg;base64,${doctor.image}`;
              }
              return (
                <div key={index} className="doctor-item">
                  <div className="rectangle">
                  <figure className="avt" 
                    style={{ backgroundImage: `url(${imageBase64})`, }}>
                    {/* Thêm nội dung khác nếu cần */}
                  </figure>
                  </div>
                  <div className="status">
                      <div class="Ellipse699" ></div>
                      <div class="Available">Available</div>
                  </div>
                  <div className="doctor-name">
                     {doctor.lastName} {doctor.firstName}
                  </div>
                </div>
              );
            })}
            </div>
          </div>
        </div>
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

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Search)
);
