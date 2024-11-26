import db from "../models/index";
import bcrypt from "bcryptjs";
// require("dotenv").config();

import { v4 as uuidv4 } from "uuid";
var fs = require('fs');
const clientHttps = require('https');
require("dotenv").config();
const { Op } = require("sequelize");


//dùng ddeere hash
const salt = bcrypt.genSaltSync(10);

// function to encode file data to base64 encoded string
let base64_encode = (file) => {
  // read binary data
  var bitmap = fs.readFileSync(file);
  // convert binary data to base64 encoded string
  return new Buffer(bitmap).toString('base64');
}


let handleUserLogin = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      //trả biến data cho controller
      let userData = {};
      let isExist = await checkUserEmail(email);
      //true
      if (isExist) {
        //use biến chứa tất cả thông tin
        let user = await db.User.findOne({
          where: { email: email },
          attributes: [
            "id",
            "email",
            "roleId",
            "password",
            "firstName",
            "lastName",
            "image",
            "address",
            "gender",
            "phonenumber",
            "status"
          ],
          // truy vấn Sequelize
          //lấy thông tin doctor
          
          include: [
            {
              model: db.Doctor_Infor,
              attributes: ["priceId", "specialtyId"],
              include: [
                {
                  model: db.Allcode,
                  as: "priceTypeData",
                  attributes: ["valueEn", "valueVi"],
                },
              ],
            },
          ],
          //trả kq dạng JavaS
          raw: true,
          //2 kết quả được tổ chức theo cấu trúc lồng nhau
          nest: true,
        });
        if (user) {
          //compareSync ss password
          let check = await bcrypt.compareSync(password, user.password);
          if (check) {
            userData.errCode = 0;
            userData.errMessage = "OK";
            delete user.password;
            //Khi người dùng đăng nhập thành công, thông tin của người dùng sẽ được gán vào
            userData.user = user;
          } else {
            userData.errCode = 3;
            userData.errMessage = "wrong password";
          }

          //check status
          if (user && user.status && user.status != 0) {
            userData.errCode = 1;
            userData.errMessage = `Status is not active`;
          }
        } else {
          userData.errCode = 2;
          userData.errMessage = `User's not found`;
        }
      } else {
        userData.errCode = 1;
        userData.errMessage = `Your's Email isn't exist in your system. Plz try other email`;
      }

      resolve(userData);
    } catch (e) {
      reject(e);
    }
  });
};

let checkUserEmail = (userEmail) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { email: userEmail },
      });
      if (user) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (e) {
      reject(e);
    }
  });
};

let getAllUsers = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = "";
      //lấy theo id
      if (userId === "ALL") {
        //lấy all dự liệu user từ csdl  pp findone
        users = await db.User.findAll({
          // ko lấy  mk 
          attributes: {
            exclude: ["password"],
          },
        });
      }
      if (userId && userId !== "ALL") {
        users = await db.User.findOne({
          where: { id: userId },
          attributes: {
            exclude: ["password"],
          },
        });
      }
      resolve(users);
    } catch (e) {
      reject(e);
    }
  });
};

let createNewUser = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      //Kiểm tra email: Trước khi thêm người dùng, mã kiểm tra xem email đã tồn tại hay chưa.
      let check = await checkUserEmail(data.email);
      //true email đã tồn tại
      if (check === true) {
        resolve({
          errCode: 1,
          errMessage: "Your email is already in used, plz try another email!!",
        });
      } else {
        let hashPasswordFromBcrypt = await hashUserPassword(data.password);

        await db.User.create({
          email: data.email,
          password: hashPasswordFromBcrypt,
          firstName: data.firstName,
          lastName: data.lastName,
          address: data.address,
          phonenumber: data.phonenumber,
          gender: data.gender,
          roleId: data.roleId,
          positionId: data.positionId,
          image: data.avatar,
          status: data.status ? data.status : 0
        });
        resolve({
          errCode: 0,
          message: "ok",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let hashUserPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPassword = await bcrypt.hashSync(password, salt);
      resolve(hashPassword);
    } catch (e) {
      reject(e);
    }
  });
};

let deleteUser = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { id: userId },
      });
      if (!user) {
        resolve({
          errCode: 2,
          errMessage: `The user isn't exist`,
        });
      }
      if (user) {
        await db.User.destroy({
          where: { id: userId },
        });
      }
      resolve({
        errCode: 0,
        errMessage: `The user is deleted`,
      });
    } catch (e) {
      reject(e);
    }
  });
};

let udateUserData = (data) => {
  //trả ra promise
  return new Promise(async (resolve, reject) => {
    try {
      //kiểm tra id có tồn tại hay không
      if (!data.id) {
        resolve({
          errCode: 2,
          errMessage: "Missing required parameter",
        });
      }
      //tìm user với id truyền vào
      let user = await db.User.findOne({
        where: { id: data.id },
        raw: false, //cho nay do ben file config cau hinh cho query
      });
      //nếu tìm thấy user
      if (user) {
        user.firstName = data.firstName;
        user.lastName = data.lastName;
        user.address = data.address;
        if (data.roleId) user.roleId = data.roleId;
        if (data.positionId) user.positionId = data.positionId;
        user.gender = data.gender;
        user.phonenumber = data.phonenumber;
        if (data.avatar) user.image = data.avatar;
        user.status = data.status;
        // user.image = data.avatar;
        //lưu xún db
        await user.save();

        resolve({
          errCode: 0,
          message: "Update the user succeed!",
        });
      } else {
        reject({
          errCode: 1,
          errMessage: `User's not found!`,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let getAllCodeService = (typeInput) => {
  return new Promise(async (resolve, reject) => {
    try {
      //Kiểm tra xem typeInput có được cung cấp hay không
      if (!typeInput) {
        // Nếu không có typeInput, trả về lỗi
        resolve({
          errCode: 1,
          errMessage: "Missing required parameters",
        });
      } else {
        //Nếu có typeInput, khởi tạo một đối tượng kết quả
        let res = {};
        let allcode = await db.Allcode.findAll({
          where: { type: typeInput },//// Lọc theo typeInput

        });
        //Gán kết quả truy vấn vào đối tượng kết quả
        res.errCode = 0;//  Đặt mã lỗi là 0 (không có lỗi)
        res.data = allcode; //Gán dữ liệu lấy được vào thuộc tính data của đối tượng kết quả
        
        resolve(res);
      }
    } catch (e) {
      reject(e);
    }
  });
};
let getDoctorsBySpecialty = (specialtyId) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log("Fetching doctors for specialtyId:", specialtyId);
      let doctors = await db.Doctor_Infor.findAll({
        where: { 
          specialtyId: specialtyId,
        },
        
        include: [
          {
            model: db.User,
            attributes: ["id", "firstName", "lastName", "image"],
            where: {
              status: 0, // 0 là trạng thái active
              roleId: 'R2'  // R2 là role bác sĩ
            }
          },
        ],
        raw: true,
        nest: true,
      });

        // Chuyển đổi dữ liệu để chỉ lấy các trường cần thiết
        const result = doctors.map(doctor => {
          // Chuyển đổi hình ảnh từ Buffer sang base64
          if (doctor.User && doctor.User.image) {
            doctor.User.image = Buffer.from(doctor.User.image).toString("base64");
          }
          
          return {
            id: doctor.User.id,
            firstName: doctor.User.firstName,
            lastName: doctor.User.lastName,
            image: doctor.User.image || null, // Nếu không có hình ảnh, trả về null
          };
        });
  
        resolve({
          errCode: 0,
          data: result,
        });
      } catch (e) {
        console.error("Error fetching doctors:", e);
        reject(e);
      }
    });
};




//download img from url
function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    clientHttps.get(url, (res) => {
      if (res.statusCode === 200) {
        res.pipe(fs.createWriteStream(filepath))
          .on('error', reject)
          .once('close', () => resolve(filepath));
      } else {
        // Consume response data to free up memory
        res.resume();
        reject(new Error(`Request Failed With a Status Code: ${res.statusCode}`));

      }
    });
  });
}



let filterUsers = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let options = {
        where: {},
        raw: true,
        nest: true,
      };
      let firstName = data.firstName;
      let lastName = data.lastName;
      let email = data.email;
      let role = data.role;
      let address = data.address;
      let position = data.position;
      let gender = data.gender;

      if (firstName) {
        options.where.firstName = {
          [Op.like]: '%' + firstName + '%'
        }
      }
      if (lastName) {
        options.where.lastName = {
          [Op.like]: '%' + lastName + '%'
        }
      }
      if (email) {
        options.where.email = {
          [Op.like]: '%' + email + '%'
        }
      }
      if (role) options.where.roleId = role
      if (address) {
        options.where.address = {
          [Op.like]: '%' + address + '%'
        }
      }
      if (position) options.where.positionId = position
      if (gender) options.where.gender = gender

      let dataUsers = []
      dataUsers = await db.User.findAll(options)
      resolve({
        errCode: 0,
        data: dataUsers,
      });

    } catch (e) {
      reject(e);
    }
  });
};








module.exports = {
  handleUserLogin: handleUserLogin,
  getAllUsers: getAllUsers,
  createNewUser: createNewUser,
  deleteUser: deleteUser,
  udateUserData: udateUserData,
  getAllCodeService: getAllCodeService,
  
  filterUsers: filterUsers,
  getDoctorsBySpecialty: getDoctorsBySpecialty,
  
};
