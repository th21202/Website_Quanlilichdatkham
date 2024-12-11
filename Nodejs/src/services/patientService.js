import { Op } from 'sequelize';
import db from "../models/index";
require("dotenv").config();

import { v4 as uuidv4 } from "uuid";

// let postBookAppointment = (data) => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       // Validate input
//       if (!data.email || !data.doctorId || !data.timeType || 
//           !data.date || !data.patientName) {
//         resolve({
//           errCode: 1,
//           errMessage: "Missing required parameter",
//         });
//       } else {
//         //check limit booking on table schedule
//         //tìm kiếm lịch khám (schedule) dựa vào 3 điều kiện:
//         let schedule = await db.Schedule.findOne({
//           where: { 
//             date: data.date,
//             timeType: data.timeType,
//             doctorId: data.doctorId  
//           },
//           raw: false,
//         });

//         if(schedule){
//           if(schedule.currentNumber < schedule.maxNumber){
//             schedule.currentNumber = parseInt(schedule.currentNumber) + 1;
//             await schedule.save();
//           } else {
//             resolve({
//               errCode: 3,
//               errMessage: "Limit max number booking!",
//             });
//           }
//         } else {
//           resolve({
//             errCode: 3,
//             errMessage: "Limit max number booking!",
//           });
//         }

//         let user = await db.User.findOne({
//           where: { email: data.email },
//         });

//         //create a booking record
//         if (user) {
//           await db.Booking.create({
//             statusId: "S2", // Thay đổi từ S1 thành S2 vì đã xác nhận
//             doctorId: data.doctorId,
//             patientId: user.id,
//             date: data.date,
//             timeType: data.timeType,
//             patientName: data.patientName,
//             patientPhoneNumber: data.phoneNumber,
//             patientAddress: data.address,
//             patientReason: data.reason,
//             patientGender: data.selectedGender,
//             patientBirthday: data.date
//           });
//         }

//         resolve({
//           errCode: 0,
//           errMessage: "Save infor patient succeed!",
//         });
//       }
//     } catch (e) {
//       reject(e);
//     }
//   });
// };


let postBookAppointment = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.email || !data.doctorId || !data.timeType || !data.date || !data.patientName) {
        return resolve({
          errCode: 1,
          errMessage: "Missing required parameter",
        });
      }

      //Kiểm tra xem khung giờ  (status = S1)
      let existingBooking = await db.Booking.findOne({
        where: { 
          date: data.date,
          timeType: data.timeType,
          doctorId: data.doctorId,
          statusId: "S1"  // Chỉ tính các booking đang chờ khám
        }
      });
    //    // Lấy maxNumber từ bảng AllCode
    //    let timeSlot = await db.Allcode.findOne({
    //     where: {
    //         keyMap: data.timeType,
    //         type: 'TIME'
    //     }
    // });

    // // Kiểm tra với maxNumber
    // if (currentBookings >= timeSlot.maxNumber) {
    //     return {
    //         errCode: 3,
    //         errMessage: 'Đã đạt số lượng tối đa cho khung giờ này'
    //     }
    // }
      if (existingBooking) {
        return resolve({
          errCode: 3,
          errMessage: "Khung giờ này đã có người đặt, vui lòng chọn khung giờ khác",
        });
      }

      // Nếu chưa có ai đặt, tạo booking mới với status = S1
      let user = await db.User.findOne({
        where: { email: data.email }
      });

      if (user) {
        await db.Booking.create({
          statusId: "S1",  
          doctorId: data.doctorId,
          patientId: user.id,
          date: data.date,
          timeType: data.timeType,
          patientName: data.patientName,
          patientPhoneNumber: data.phoneNumber,
          patientAddress: data.address,
          patientReason: data.reason,
          patientGender: data.selectedGender,
          patientBirthday: data.date
        });
      }

      resolve({
        errCode: 0,
        errMessage: "Đặt lịch thành công!",
      });

    } catch (e) {
      reject(e);
    }
  });
};



let filterHistory = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.patientId) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter",
        });
      } else {
        let startDate=data.startDate ? data.startDate : null
        let endDate=data.endDate ? data.endDate : null

        let dataHistories=[]
        if(startDate && endDate){
            dataHistories = await db.History.findAll({
              where: {
                    patientId:data.patientId,
                    createdAt: {
                        [Op.lt]: new Date(new Date(endDate).getTime() + 60 * 60 * 24 * 1000 - 1),
                        [Op.gt]: new Date(startDate)
                    },
                },
                order: [['createdAt', 'DESC']],
                attributes: ["id", "patientId", "doctorId", "description", "reason", "createdAt", "updatedAt"],
                include: [
                  {
                    model: db.User,
                    as: "doctorDataHistory",
                    attributes: ["id","email", "firstName","lastName"],
                    include: [
                      {
                        model: db.Doctor_Infor,
                        attributes: ["id","doctorId","specialtyId","clinicId"],
                        include: [
                          {
                            model: db.Specialty,
                            as: "specialtyData",
                            attributes: ["name"],
                          },
                          {
                            model: db.Clinic,
                            as: "clinicData",
                            attributes: ["name"],
                          },
                        ],
                      },
                    ],
                  },
                ],
                raw: true,
                nest: true,
            })
        }else{
            dataHistories = await db.History.findAll({
              where: {
                    patientId:data.patientId,
                },
                order: [['createdAt', 'DESC']],
                attributes: ["id", "patientId", "doctorId", "description", "reason","createdAt", "updatedAt"],
                include: [
                  {
                    model: db.User,
                    as: "doctorDataHistory",
                    attributes: ["id","email", "firstName","lastName"],
                    include: [
                      {
                        model: db.Doctor_Infor,
                        attributes: ["id","doctorId","specialtyId","clinicId"],
                        include: [
                          {
                            model: db.Specialty,
                            as: "specialtyData",
                            attributes: ["name"],
                          },
                          {
                            model: db.Clinic,
                            as: "clinicData",
                            attributes: ["name"],
                          },
                        ],
                      },
                    ],
                  },
                ],
                raw: true,
                nest: true,
            })
        }
       
          resolve({
            errCode: 0,
            data: dataHistories,
          });
      }
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  postBookAppointment: postBookAppointment,
  
  filterHistory:filterHistory
};

