const db = require("../models");
const moment = require("moment");
const { Sequelize } = require("sequelize");





let getTotalHealthAppointmentDone = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let apointmentDones = await db.Booking.findAll({
        where: { statusId: "S3" },
        attributes: ["id", "createdAt", "statusId"],
        raw: true,
        nest: true,
      });

      let totalHealthApointmentDone = apointmentDones.length;

      resolve({
        errCode: 0,
        data: { totalHealthApointmentDone: totalHealthApointmentDone },
      });
    } catch (e) {
      reject(e);
    }
  });
};

let getTotalDoctor = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let doctors = await db.User.findAll({
        where: { roleId: "R2" },
        attributes: ["id", "roleId"],
        raw: true,
        nest: true,
      });

      let totalDoctors = doctors.length;

      resolve({
        errCode: 0,
        data: { totalDoctors: totalDoctors },
      });
    } catch (e) {
      reject(e);
    }
  });
};


module.exports = {
  
  getTotalHealthAppointmentDone: getTotalHealthAppointmentDone,
  getTotalDoctor: getTotalDoctor,
  
 
};
