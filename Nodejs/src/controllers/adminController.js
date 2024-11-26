import adminService from "../services/adminService";

let getWeeklyRevenue = async (req, res) => {
  try {
    let infor = await adminService.getWeeklyRevenue();
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};





let getTopThreeDoctorsOfTheYear = async (req, res) => {
  try {
    let infor = await adminService.getTopThreeDoctorsOfTheYear();
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};


let getMonthlyRevenueSpecialty = async (req, res) => {
  try {
    let infor = await adminService.getMonthlyRevenueSpecialty();
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
  getWeeklyRevenue: getWeeklyRevenue,
  getTopThreeDoctorsOfTheYear: getTopThreeDoctorsOfTheYear,
 
  getMonthlyRevenueSpecialty: getMonthlyRevenueSpecialty,
};
