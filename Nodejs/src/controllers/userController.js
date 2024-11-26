import userService from "../services/userService";
//Xử lý yêu cầu: Khi một yêu cầu được gửi đến endpoint để tạo người dùng mới,
// hàm handleCreateNewUser sẽ gọi createNewUser từ userService và trả về phản hồi cho client.
let handleLogin = async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  //bắt 2 lỗi rỗng
  if (!email || !password) {
    return res.status(500).json({
      errCode: 1,
      message: "Missing inputs parameter!",
    });
  }
  // hứng userdata
  let userData = await userService.handleUserLogin(email, password);
  return res.status(200).json({
    errCode: userData.errCode,
    message: userData.errMessage,
    user: userData.user ? userData.user : {},
  });
};

let handleGetAllUsers = async (req, res) => {
  let id = req.query.id; //All, id
  //ko truyền id return báo lỗi
  if (!id) {
    return res.status(200).json({
      errCode: 1,
      message: "Missing required parameters",
      users: [],
    });
  }
  let users = await userService.getAllUsers(id);
  return res.status(200).json({
    errCode: 0,
    message: "ok",
    users,
  });
};

let handleCreateNewUser = async (req, res) => {
  let message = await userService.createNewUser(req.body);
  return res.status(200).json(message);
};

let handleEditUser = async (req, res) => {
  // lấy tất cả dữ liệu
  let data = req.body;
  let message = await userService.udateUserData(data);
  return res.status(200).json(message);
};

let handleDeleteUser = async (req, res) => {
  //lấy id
  let id = req.body.id;
  if (!id) {
    return res.status(500).json({
      errCode: 1,
      errMessage: "Missing required parameters!",
    });
  }
  if (id) {
    let message = await userService.deleteUser(id);
    return res.status(200).json(message);
  }
};

let getAllCode = async (req, res) => {
  try {
    //chờ await lấy thông tin ra
    let data = await userService.getAllCodeService(req.query.type);
    //lấy thông tin thành công trả ra
    return res.status(200).json(data);
  } catch (e) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};


let handleGetDoctorsBySpecialty = async (req, res) => {
  let specialtyId = req.query.id; // Lấy id chuyên khoa từ query
  if (!specialtyId) {
    return res.status(400).json({
      errCode: 1,
      message: "Missing required parameters",
    });
  }
  try {
    let doctors = await userService.getDoctorsBySpecialty(specialtyId);
    return res.status(200).json(doctors); // Đảm bảo trả về dữ liệu JSON
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};



let filterUsers = async (req, res) => {
  try {
    let infor = await userService.filterUsers(req.body);
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};





module.exports = {
  handleLogin: handleLogin,
  handleGetAllUsers: handleGetAllUsers,
  handleCreateNewUser: handleCreateNewUser,
  handleEditUser: handleEditUser,
  handleDeleteUser: handleDeleteUser,
  getAllCode: getAllCode,
  filterUsers: filterUsers,
  handleGetDoctorsBySpecialty: handleGetDoctorsBySpecialty,
  
};
