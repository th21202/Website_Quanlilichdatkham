import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./ManagePatient.scss";
import DatePicker from "../../../components/Input/DatePicker";
import {
  cancelBooking,
  getAllPatientForDoctor,
  completeBooking,
} from "../../../services/userService";
import moment from "moment";
import { LANGUAGES } from "../../../utils";
import { toast } from "react-toastify";
import LoadingOverlay from "react-loading-overlay";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
import {withRouter} from '../../../utils/withRouter';  //navigate
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css"; // This only needs to be imported once in your app

class ManagePatient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDate: moment(new Date()).startOf("day").valueOf(),
      dataPatient: [],
      isShowLoading: false,
      description: "",
    };
  }

  async componentDidMount() {
    await this.getDataPatient();
  }

  getDataPatient = async () => {
    let { user } = this.props;
    let { currentDate } = this.state;
    let formatedDate = new Date(currentDate).getTime();
    if (user && user.id) {
      let res = await getAllPatientForDoctor({
        doctorId: user.id,
        date: formatedDate,
      });
      if (res && res.errCode === 0) {
        this.setState({
          dataPatient: res.data,
        });
      }
    }
  };

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
    if (this.props.user !== prevProps.user) {
      await this.getDataPatient();
    }
  }

  handleOnChangeDatePicker = (date) => {
    this.setState(
      {
        currentDate: date[0],
      },
      async () => {
        await this.getDataPatient();
      }
    );
  };
  handleBtnConfirm = async (item) => {
    this.setState({ isShowLoading: true });
    let res = await completeBooking({
      doctorId: item.doctorId,
      patientId: item.patientId,
      timeType: item.timeType,
      date: item.date,
      statusId: item.statusId,
      description: this.state.description,
    });
    if (res && res.errCode === 0) {
      this.setState({ 
        isShowLoading: false,
        description: ""
       });
      toast.success("Hoàn thành cuộc hẹn thành công!");
      await this.getDataPatient();
    } else {
      this.setState({ isShowLoading: false });
      toast.error("Đã xảy ra lỗi!!");
    }
  };

  handleBtnCancel = async (item) => {
    this.setState({ isShowLoading: true });
    let res = await cancelBooking({
      doctorId: item.doctorId,
      patientId: item.patientId,
      timeType: item.timeType,
      date: item.date,
      statusId: item.statusId,
      description: this.state.description,
    });
    if (res && res.errCode === 0) {
      this.setState({ isShowLoading: false });
      if(this.props.language==="en"){
        toast.success("cancel appointment succeed!");
      }else{
        toast.success("Hủy cuộc hẹn thành công!");
      }
      await this.getDataPatient();
    } else {
      this.setState({ isShowLoading: true });
      if(this.props.language==="en"){
        toast.error("Something wrongs...!");
      }else{
        toast.error("Lỗi!");
      }
    }
  };
  handleDescriptionChange = (event) => {
    this.setState({
      description: event.target.value
    });
  };
  

  render() {
    let { dataPatient } = this.state;
    let { language } = this.props;

    return (
      <>
        <LoadingOverlay
          active={this.state.isShowLoading}
          spinner={<ClimbingBoxLoader color={"#86e7d4"} size={15} />}
        >
          <div className="manage-patient-container">
            <div className="m-p-title font-weight-bold"><FormattedMessage id={"manage-patient.title"} /> </div>
            <div className="manage-patient-body row">
              <div className="col-4 form-group">
                <label><FormattedMessage id={"manage-patient.choose-date"} /></label>
                <DatePicker
                  onChange={this.handleOnChangeDatePicker}
                  className="form-control"
                  value={this.state.currentDate}
                />
              </div>
              <div className="col-12 table-manage-patient">
                <table>
                  <tbody>
                    <tr>
                      <th>#</th>
                      <th><FormattedMessage id={"manage-patient.examination-time"} /></th>
                      <th><FormattedMessage id={"manage-patient.patient-name"} /></th>
                      <th><FormattedMessage id={"manage-patient.address"} /></th>
                      <th><FormattedMessage id={"manage-patient.phone-number"} /></th>
                      <th><FormattedMessage id={"manage-patient.gender"} /></th>
                      <th><FormattedMessage id={"manage-patient.reason"} /></th>
                      <th><FormattedMessage id={"manage-patient.prescription"} /></th>
                      <th><FormattedMessage id={"manage-patient.actions"} /></th>
                    </tr>
                    {dataPatient && dataPatient.length > 0 ? (
                      dataPatient.map((item, index) => {
                        let time =
                          language === LANGUAGES.VI
                            ? item.timeTypeDataPatient.valueVi
                            : item.timeTypeDataPatient.valueEn;
                        let gender=
                          language === LANGUAGES.VI
                            ? (item.patientGender=="M" ? "Nam" : "Nữ")
                            : (item.patientGender=="M" ? "Male" : "Female")
                        return (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{time}</td>
                            <td>{item.patientName}</td>
                            <td>{item.patientAddress}</td>
                            <td>
                              {item.patientPhoneNumber ? item.patientPhoneNumber : ""}
                            </td>
                            <td>{gender}</td>
                            <td>{item.patientReason}</td>
                            
                            <td>
                            <textarea
                              className="form-control"
                              rows="2"
                              value={this.state.description}
                                onChange={this.handleDescriptionChange}
                                placeholder="Nhập ghi chú cho bệnh nhân..."
                              />
                            </td>
                            <td>
                              <button
                                className="btn btn-primary"
                                onClick={() => this.handleBtnConfirm(item)}
                              >
                                <FormattedMessage id={"manage-patient.complete"} />
                              </button>
                              
                              <button
                                className="btn btn-danger"
                                onClick={() => this.handleBtnCancel(item)}
                              >
                                <FormattedMessage id={"manage-patient.cancel"} />
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan="9" style={{ textAlign: "center" }}>
                          {language === LANGUAGES.VI ? "Không có bệnh nhân đặt lịch vào ngày này" : "No patients booked for this date"}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        
            {this.state.isOpen === true && (
            <Lightbox
              mainSrc={this.state.previewImgURL}
              onCloseRequest={() => this.setState({ isOpen: false })}
            />
          )}
         
        </LoadingOverlay>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return { language: state.app.language, user: state.user.userInfo };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ManagePatient));
