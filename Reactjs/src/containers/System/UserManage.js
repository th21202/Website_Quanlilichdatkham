import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./UserManage.scss";
import {
  getAllUsers,
  createNewUserService,
  deleteUserService,
  editUserService,
} from "../../services/userService";
import { emitter } from "../../utils/emitter";
import ModalUser from "./ModalUser";
import ModalEditUser from "./ModalEditUser";
class UserManage extends Component {
  constructor(props) {
    //khởi tạo các biến
    super(props);
    this.state = {
      arrUsers: [],
      //mặc định không mở
      isOpenModalUser: false,
      isOpenModalEditUser: false,
      userEdit: {},
    };
  }
  /**
     * Life cycle
     * Run component:
     * 1. Run construct -> init state
     * muốn gán gtri cho 1bien state 
     * set gtri các biến trc khi render 
     * 2. Did mount(set state): born; unmount
     * 3. Render
     *
     */
  //gọi API
  async componentDidMount() {
    await this.getAllUsersFromReact();
  }

  getAllUsersFromReact = async () => {
    //getAllUsers  yêu cầu HTTP để lấy danh sách người dùng từ server
    let response = await getAllUsers("ALL");
    //sau do  gán giá trị kết quả cho biến response
    //Kiểm tra nếu response tồn tại và mã lỗi
    if (response && response.errCode === 0) {
      this.setState({
        //data đc lưu vào mảng
        arrUsers: response.users,
      });
    }
    //React sẽ tự động render lại component để hiển thị dữ liệu mới
  };

  handleAddNewUser = () => {
    this.setState({
      isOpenModalUser: true,
    });
  };
  //pt cập nhật trạng thái true -> false ngược lại
  toggleUserModal = () => {
    this.setState({
      isOpenModalUser: !this.state.isOpenModalUser,
    });
  };

  toggleUserEditModal = () => {
    this.setState({
      //tự đông gán vd true->false
      isOpenModalEditUser: !this.state.isOpenModalEditUser,
    });
  };

  createNewUser = async (data) => {
    try {
      let response = await createNewUserService(data);
      if (response && response.errCode !== 0) {
        alert(response.errMessage);
      } else {
        await this.getAllUsersFromReact();
        //tắt modal di 
        this.setState({
          isOpenModalUser: false,
        });
        //xóa data trong modal
        // emitter.emit("EVENT_CLEAR_MODAL_DATA", { id: "your id" }); // cach truyen them data
        emitter.emit("EVENT_CLEAR_MODAL_DATA");
      }
    } catch (e) {
      console.log(e);
    }
  };

  handleDeleteUser = async (user) => {
    try {
      let res = await deleteUserService(user.id);
      if (res && res.errCode === 0) {
        await this.getAllUsersFromReact();
      } else {
        alert(res.errMessage);
      }
    } catch (e) {
      console.log(e);
    }
  };

  handleEditUser = (user) => {
    console.log("check edit user", user);
    this.setState({
      isOpenModalEditUser: true,
      //gán gtri user edit 
      userEdit: user,
    });
  };

  doEditUser = async (user) => {
    try {
      let res = await editUserService(user);
      if (res && res.errCode === 0) {
        this.setState({
          isOpenModalEditUser: false,
        });
        await this.getAllUsersFromReact();
      } else {
        alert(res.errMessage);
      }
    } catch (e) {
      console.log(e);
    }
  };
  render() {
    let arrUsers = this.state.arrUsers;
    return (
      <div className="users-container">
        {/* giải thích dofnng này cái nào cha casci nào con*/}
        <ModalUser
          isOpen={this.state.isOpenModalUser}
          toggleFromParent={this.toggleUserModal}
          createNewUser={this.createNewUser}
        />
        {/* //check dk nếu isOpenModalEditUser = true  */}
        {this.state.isOpenModalEditUser && (
          <ModalEditUser
            isOpen={this.state.isOpenModalEditUser}
            toggleFromParent={this.toggleUserEditModal}
            //truyền user muốn edit sang modalEdituser
            currentUser={this.state.userEdit}
            //truyền edituser cho modaledit
            editUser={this.doEditUser}
          />
        )}
        <div className="title text-center">MANAGE USERS</div>
        <div className="mx-1">
          <button
            className="btn btn-primary px-3"
            onClick={() => this.handleAddNewUser()}
          >
            <i className="fas fa-plus"></i> Add New User
          </button>
        </div>
        <div className="users-table mt-4 mx-3">
          <table id="customers">
            <tbody>
              <tr>
                <th>Email</th>
                <th>FirstName</th>
                <th>LastName</th>
                <th>Address</th>
                <th>Actions</th>
              </tr>
              {/* //điều kiện kiểm tra nếu arrUsers tồn tại */}
              {arrUsers &&
                // map pt của mảng lặp qua từng phần tử của mảng arrUsers
                //index:chỉ số ptu 
                arrUsers.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{item.email}</td>
                      <td>{item.firstName}</td>
                      <td>{item.lastName}</td>
                      <td>{item.address}</td>
                      <td>
                        <button
                          className="btn-edit"
                          onClick={() => this.handleEditUser(item)}
                        >
                          <i className="fas fa-pencil-alt"></i>
                        </button>
                        <button
                          className="btn-delete"
                          onClick={() => this.handleDeleteUser(item)}
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
