import express from "express";
import userController from "../controllers/userController";
import doctorController from "../controllers/doctorController";
import patientController from "../controllers/patientController";
import specialtyController from "../controllers/specialtyController";
import clinicController from "../controllers/clinicController";
import adminController from "../controllers/adminController";

let router = express.Router();

let initWebRoutes = (app) => {
  //----------------------------- USER -----------------------------
  //khi user truy cập vào các link trên web thì express sẽ tìm
  router.post("/api/login", userController.handleLogin);
  router.get("/api/get-all-users", userController.handleGetAllUsers);
  router.post("/api/create-new-user", userController.handleCreateNewUser);
  router.put("/api/edit-user", userController.handleEditUser);

  router.delete("/api/delete-user", userController.handleDeleteUser);
  router.get("/api/get-doctors-by-specialty", userController.handleGetDoctorsBySpecialty);
  
  router.get("/api/allcode", userController.getAllCode);
  //google signin
  router.post("/api/filter-users", userController.filterUsers);
  
  
  //----------------------------- doctor -----------------------------
  router.post("/api/top-doctor-home", doctorController.getTopDoctorHome);
  router.get("/api/get-all-doctors", doctorController.getAllDoctors);
  router.post("/api/save-infor-doctors", doctorController.postInforDoctor);
  router.get("/api/get-detail-doctor-by-id", doctorController.getDetailDoctorById);
  router.post("/api/bulk-create-schedule", doctorController.bulkCreateSchedule);
  router.get("/api/get-schedule-doctor-by-date", doctorController.getScheduleByDate);
  router.get("/api/get-extra-infor-doctor-by-id", doctorController.getExtraInforDoctorById);
  router.get("/api/get-profile-doctor-by-id", doctorController.getProfileDoctorById);
  router.get("/api/get-list-patient-for-doctor", doctorController.getListPatientForDoctor);
  router.get("/api/get-booking-by-id", doctorController.getBookingById);

  router.post("/api/cancel-booking", doctorController.cancelBooking);
  router.post("/api/filter-doctors", doctorController.filterDoctors);
  router.post("/api/complete-booking", doctorController.completeBooking);
  router.post("/api/patient-book-appointment", patientController.postBookAppointment);

  router.post("/api/filter-history", patientController.filterHistory);


  //----------------------------- specialty ----------------------------- 
  router.post("/api/create-new-specialty", specialtyController.createSpecialty);
  router.post("/api/get-specialty", specialtyController.getAllSpecialty);
  router.get(
    "/api/get-detail-specialty-by-id",
    specialtyController.getDetailSpecialtyById
  );
  router.post("/api/filter-specialties", specialtyController.filterSpecialties);
  router.get(
    "/api/delete-specialty",
    specialtyController.deleteSpecialty
  );
  router.post("/api/edit-specialty", specialtyController.udateSpecialtyData);

  //----------------------------- clinic -----------------------------   
  router.post("/api/create-new-clinic", clinicController.createClinic);
  router.post("/api/get-clinic", clinicController.getAllClinic);
  router.get(
    "/api/get-detail-clinic-by-id",
    clinicController.getDetailClinicById
  );
  router.post("/api/filter-clinics", clinicController.filterClinics);
  router.post("/api/edit-clinic", clinicController.udateClinicData);
  router.get(
    "/api/delete-clinic",
    clinicController.deleteClinic
  );

  //admin
  // router.get("/api/get-weekly-revenue", adminController.getWeeklyRevenue);
  // router.get("/api/get-total-new-user-day", adminController.getTotalNewUserDay);
 
  // router.get(
  //   "/api/get-top-four-vip-patient",
  //   adminController.getTopFourVipPatient
  // );
  // router.get(
  //   "/api/get-monthly-revenue-specialty",
  //   adminController.getMonthlyRevenueSpecialty
  // );

 
//khai báo tất cả đường link trên server
//sử dụng tất cả các file router đã khai báo
  return app.use("/", router);
};

module.exports = initWebRoutes;
