import axios from "../axios";

// AUTH & USER MANAGEMENT
const handleLoginApi = (email, password) => {
  return axios.post("/api/login", { email, password });
};

// ADMIN - User Management
const getAllUsers = (inputId) => {
  return axios.get(`/api/get-all-users?id=${inputId}`);
};

const createNewUserService = (data) => {
  return axios.post("/api/create-new-user", data);
};

const editUserService = (inputData) => {
  return axios.put("/api/edit-user", inputData);
};

const deleteUserService = (userId) => {
  return axios.delete("/api/delete-user", { data: { id: userId } });
};
//lọc/tìm kiếm danh sách user
const filterUsers = (data) => {
  return axios.post(`/api/filter-users`, data);
};

// ADMIN - Specialty Management
const createNewSpecialty = (data) => {
  return axios.post("/api/create-new-specialty", data);
};

const getAllSpecialty = (data) => {
  return axios.post("/api/get-specialty", data);
};

const getAllSpecialtyById = (data) => {
  return axios.get(`/api/get-detail-specialty-by-id?id=${data.id}&location=${data.location}`);
};

const getDoctorsBySpecialty = (specialtyId) => {
  return axios.get(`/api/get-doctors-by-specialty?id=${specialtyId}`);
};

// ADMIN - Clinic Management
const createNewClinic = (data) => {
  return axios.post("/api/create-new-clinic", data);
};

const getAllClinic = (data) => {
  return axios.post(`/api/get-clinic`, data);
};

const getAllDetailClinicById = (data) => {
  return axios.get(`/api/get-detail-clinic-by-id?id=${data.id}}`);
};

// DOCTOR - Profile & Information
const getAllDoctors = () => {
  return axios.get(`/api/get-all-doctors`);
};

const getTopDoctorHomeService = (data) => {
  return axios.post(`/api/top-doctor-home`, data);
};

const getProfileDoctorById = (doctorId) => {
  return axios.get(`/api/get-profile-doctor-by-id?doctorId=${doctorId}`);
};

const getDetailInforDoctor = (inputId) => {
  return axios.get(`/api/get-detail-doctor-by-id?id=${inputId}`);
};

const getExtraInforDoctorById = (doctorId) => {
  return axios.get(`/api/get-extra-infor-doctor-by-id?doctorId=${doctorId}`);
};

const saveDetailDoctor = (data) => {
  return axios.post("/api/save-infor-doctors", data);
};

// DOCTOR - Schedule Management
const saveBulkScheduleDoctor = (data) => {
  return axios.post("/api/bulk-create-schedule", data);
};

const getScheduleDoctorByDate = (doctorId, date) => {
  return axios.get(`/api/get-schedule-doctor-by-date?doctorId=${doctorId}&date=${date}`);
};

// DOCTOR - Patient Management
const getAllPatientForDoctor = (data) => {
  return axios.get(`/api/get-list-patient-for-doctor?doctorId=${data.doctorId}&date=${data.date}`);
};

const updateBookingStatus = (data) => {
  return axios.post("/api/update-booking-status", data);
};

const completeBooking = (data) => {
  return axios.post("/api/complete-booking", data);
};

// PATIENT - Booking & History
const postPatientBookAppointment = (data) => {
  return axios.post("/api/patient-book-appointment", data);
};

const getBookingById = (bookingId) => {
  return axios.get(`/api/get-booking-by-id?bookingId=${bookingId}`);
};

const cancelBooking = (data) => {
  return axios.post("/api/cancel-booking", data);
};

const filterHistoriesPatient = (data) => {
  return axios.post(`/api/filter-history`, data);
};

// UTILS
const getAllCodeService = (inputType) => {
  return axios.get(`/api/allcode?type=${inputType}`);
};

export {
  // Auth & User Management
  handleLoginApi,
  
  // Admin - User Management
  getAllUsers,
  createNewUserService,
  editUserService,
  deleteUserService,
  filterUsers,
  
  // Admin - Specialty Management
  createNewSpecialty,
  getAllSpecialty,
  getAllSpecialtyById,
  getDoctorsBySpecialty,
  
  // Admin - Clinic Management
  createNewClinic,
  getAllClinic,
  getAllDetailClinicById,
  
  // Doctor - Profile & Information
  getAllDoctors,
  getTopDoctorHomeService,
  getProfileDoctorById,
  getDetailInforDoctor,
  getExtraInforDoctorById,
  saveDetailDoctor,
  
  // Doctor - Schedule Management
  saveBulkScheduleDoctor,
  getScheduleDoctorByDate,
  
  // Doctor - Patient Management
  getAllPatientForDoctor,
  updateBookingStatus,
  completeBooking,
  
  // Patient - Booking & History
  postPatientBookAppointment,
  getBookingById,
  cancelBooking,
  filterHistoriesPatient,
  
  // Utils
  getAllCodeService,
};