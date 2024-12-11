import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from "../../../utils";
import * as actions from "../../../store/actions";
import "./UserRedux.scss";

import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css"; // This only needs to be imported once in your app

import TableManageUser from "./TableManageUser";
import { withRouter } from '../../../utils/withRouter';  //navigate

import { filterUsers } from "../../../services/userService";

class UserRedux extends Component {
  constructor(props) {
    super(props);
    this.state = {
      genderArr: [],
      positionArr: [],
      roleArr: [],
      previewImgURL: "",
      isOpen: false,

      email: "",
      password: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      address: "",
      gender: "",
      position: "",
      role: "",
      avatar: "",

      action: "",
      userEditId: "",
      listFilterUsers: []
    };
  }

  async componentDidMount() {
    this.props.getGenderStart();
    this.props.getPositionStart();
    this.props.getRoleStart();

    await this.handleFilterUsers()
  }
//
  componentDidUpdate(prevProps, prevState, snapshot) {
    //hien tai(this) va qua khu(previous)
    //[] [3]
    //[3] [3]
    //dk ss render khi và chỉ khi genderRedux có giá trị thay đổi
    if (prevProps.genderRedux !== this.props.genderRedux) {
      let arrGenders = this.props.genderRedux;
      this.setState({
        genderArr: arrGenders,
      });
    }
    if (prevProps.positionRedux !== this.props.positionRedux) {
      let arrPositions = this.props.positionRedux;
      this.setState({
        positionArr: arrPositions,
      });
    }
    if (prevProps.roleRedux !== this.props.roleRedux) {
      let arrRoles = this.props.roleRedux;
      this.setState({
        roleArr: arrRoles,
      });
    }
    if (prevProps.listUsers !== this.props.listUsers) {
      let arrGenders = this.props.genderRedux;
      let arrPositions = this.props.positionRedux;
      let arrRoles = this.props.roleRedux;

      this.setState({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        phoneNumber: "",
        address: "",
        gender: "",
        position: "",
        role: "",
        avatar: "",
        action: CRUD_ACTIONS.CREATE,
        previewImgURL: "",
      });
    }
  }

  openPreviewImage = () => {
    if (!this.state.previewImgURL) return;
    this.setState({
      isOpen: true,
    });
  };

  handleSaveUser = () => {
    let isValid = this.checkValidateInput();
    if (isValid === false) return;

    let { action } = this.state;

    if (action === CRUD_ACTIONS.CREATE) {
      //fire redux create user
      this.props.createNewUser({
        email: this.state.email,
        password: this.state.password,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        address: this.state.address,
        phonenumber: this.state.phoneNumber,
        gender: this.state.gender,
        roleId: this.state.role,
        positionId: this.state.position,
        avatar: this.state.avatar,
      });
    }
    if (action === CRUD_ACTIONS.EDIT) {
      //fire redux edit user
      this.props.editAUserRedux({
        id: this.state.userEditId,
        email: this.state.email,
        password: this.state.password,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        address: this.state.address,
        phonenumber: this.state.phoneNumber,
        gender: this.state.gender,
        roleId: this.state.role,
        positionId: this.state.position,
        avatar: this.state.avatar,
      });
    }
  };

  checkValidateInput = () => {
    let isValid = true;
    let arrCheck = [
      "email",
      "password",
      "firstName",
      "lastName",
      "phoneNumber",
      "address",
    ];
    for (let i = 0; i < arrCheck.length; i++) {
      if (!this.state[arrCheck[i]]) {
        isValid = false;
        alert("This input is required: " + arrCheck[i]);
        break;
      }
    }
    return isValid;
  };

  onChangeInput = (event, id) => {
    //copy all state
    let copyState = { ...this.state };
    //lấy gtr biến input
    //vd nư
    copyState[id] = event.target.value;

    this.setState({
      ...copyState,
    });
  };

  handleEditUserFromParent = (user) => {
    let imageBase64 = "";
    //nếu user có hình ảnh thì chuyển đổi thành chuỗi base64
    if (user.image) {
      imageBase64 = new Buffer(user.image, "base64").toString("binary");
    }
    // Điền thông tin user vào form
    this.setState({
      email: user.email,
      password: "HARDCODE",
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phonenumber,
      address: user.address,
      gender: user.gender,
      position: user.positionId,
      role: user.roleId,
      avatar: user.avatar,
      previewImgURL: imageBase64,
      action: CRUD_ACTIONS.EDIT,
      userEditId: user.id,
    });
  };

  handleFilterUsers = async () => {
    let {
      email,
      password,
      firstName,
      lastName,
      phoneNumber,
      address,
      gender,
      position,
      role,
      avatar,
    } = this.state;

    let data = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      role: role,
      address: address,
      position: position,
      gender: gender
    }

    let res = await filterUsers(data)
    if (res && res.data) {
      this.setState({
        listFilterUsers: res.data.reverse()
      })
    }

  }

  handleReset = async () => {
    this.setState({
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      address: "",
      gender: "",
      position: "",
      role: "",
      avatar: "",
      action: CRUD_ACTIONS.CREATE,
      previewImgURL: "",
    });
    // Gọi API lấy lại toàn bộ danh sách users không filter
    let res = await filterUsers({})
    if (res && res.data) {
      this.setState({
        listFilterUsers: res.data.reverse()
      })
    }

  }


  render() {
    let genders = this.state.genderArr;
    let roles = this.state.roleArr;
    let positions = this.state.positionArr;

    let language = this.props.language;
    let isGetGenders = this.props.isLoadingGender;
    //lấy gtr các biến state
    let {
      email,
      password,
      firstName,
      lastName,
      phoneNumber,
      address,
      gender,
      position,
      role,
      avatar,
    } = this.state;
    return (
      <div className="user-redux-container">
        <div className="title">
          {/* //FormattedMessage: Là một component dùng để hiển thị văn bản đã được dịch. */}

          <FormattedMessage id="manage-user.title" />
        </div>
        <div>{isGetGenders === true ? "Loading genders" : ""}</div>
        <div className="user-redux-body">
          <div className="container">
         
            <div className="row">
              <div class="col-12 mb-5 text-right">
                <button type="submit" class="btn btn-primary pointer mr-5"
                  onClick={() => { this.props.navigate(`/admin-dashboard/user/create`); }}
                ><i class="fas fa-plus-circle mr-5"></i><FormattedMessage id="manage-user.btn-create" /></button>
              </div>
              <div className="col-12 mb-5">
                <TableManageUser
                  listFilterUsers={this.state.listFilterUsers}
                  // Hàm reset form và danh sách
                  handleReset={this.handleReset}
                  // Hàm edit user từ component cha
                  handleEditUserFromParentKey={this.handleEditUserFromParent}
                  // Hàm xử lý action
                  action={this.state.action}
                />
              </div>
            </div>
          </div>
        </div>
      
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    //lấy state  và truy cập vào key=app
    language: state.app.language,
    genderRedux: state.admin.genders,
    roleRedux: state.admin.roles,
    positionRedux: state.admin.positions,
    isLoadingGender: state.admin.isLoadingGender,
    listUsers: state.admin.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGenderStart: () => dispatch(actions.fetchGenderStart()),
    getPositionStart: () => dispatch(actions.fetchPositionStart()),
    getRoleStart: () => dispatch(actions.fetchRoleStart()),
    createNewUser: (data) => dispatch(actions.createNewUser(data)),
    fetchUserRedux: () => dispatch(actions.fetchAllUsersStart()),
    editAUserRedux: (data) => dispatch(actions.editAUser(data)),
    // changeLanguageAppRedux: (language) =>
    //   dispatch(actions.changeLanguageApp(language)),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserRedux));
