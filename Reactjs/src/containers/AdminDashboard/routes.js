import { Navigate, useRoutes } from "react-router-domv6";
// layouts
import DashboardLayout from "./layouts/dashboard";
// import LogoOnlyLayout from "./layouts/LogoOnlyLayout";
//

import DashboardApp from "./pages/DashboardApp";

// import User from "./pages/User";
// import NotFound from "./pages/Page404";
import UserRedux from "../../containers/System/Admin/UserRedux";
import CreateUser from "../../containers/System/Admin/User/resources/CreateUser";
import EditUser from "../../containers/System/Admin/User/resources/EditUser";

import ManageDoctor from "../../containers/System/Admin/ManageDoctor";
import EditDoctor from "../../containers/System/Admin/Doctor/resources/EditDoctor";

import ManageSchedule from "../../containers/System/Doctor/ManageSchedule";
import ManageScheduleOneDoctor from "../../containers/System/Doctor/ManageScheduleOneDoctor";

import ManageClinic from "../../containers/System/Clinic/ManageClinic";
import CreateClinic from "../../containers/System/Clinic/resources/CreateClinic";
import EditClinic from "../../containers/System/Clinic/resources/EditClinic";

import ManageSpecialty from "../../containers/System/Specialty/ManageSpecialty";
import CreateSpecialty from "../../containers/System/Specialty/resources/CreateSpecialty";
import EditSpecialty from "../../containers/System/Specialty/resources/EditSpecialty";

import ManagePatient from "../../containers/System/Doctor/ManagePatient";




import { useDispatch, useSelector } from "react-redux";
// import AdminLogin from "./pages/Login"; // Đảm bảo import đúng file Login

// ----------------------------------------------------------------------
//quản lý và điều hướng các trang trong phần admin.
export default function Router() {
  const { isLoggedIn, userInfo, language } = useSelector((state) => ({
    isLoggedIn: state.user.isLoggedIn,
    userInfo: state.user.userInfo,
    language: state.app.language,
  }));

  return useRoutes([
    // {
    //   path: "/admin",
    //   element: <AdminLayout />, 
    //   children: [
    //     { path: "login", element: <AdminLogin /> },
    //     
    //   ],
    // },
    {
      path: "/admin-dashboard",
      element: <DashboardLayout />,
      children: [
        { path: "app", element: <DashboardApp /> },
        { path: "user", element: <UserRedux /> }, //quan ly user
        { path: "user/create", element: <CreateUser /> }, //create user
        { path: "user/edit/:userId", element: <EditUser /> }, //edit user

        

        { path: "manage-doctor", element: <ManageDoctor /> }, //quan ly bac si
        { path: "manage-doctor/edit/:doctorId", element: <EditDoctor /> }, //edit bac si

        { path: "manage-schedule", element: <ManageSchedule /> }, //quan ly ke hoach kham benh bac si

        { path: "manage-clinic", element: <ManageClinic /> }, //quan ly bệnh viện
        { path: "manage-clinic/create", element: <CreateClinic /> }, //quan ly bệnh viện
        { path: "manage-clinic/edit/:clinicId", element: <EditClinic /> }, //quan ly bệnh viện


        { path: "manage-specialty", element: <ManageSpecialty /> }, //quan ly chuyen khoa
        { path: "manage-specialty/create", element: <CreateSpecialty /> }, //quan ly chuyen khoa
        { path: "manage-specialty/edit/:specialtyId", element: <EditSpecialty /> }, //quan ly chuyen khoa

        // { path: "", element: <Navigate to={userInfo.roleId=="R1" ? "/admin-dashboard/app" : "/admin-dashboard/doctor"} replace={true}/> }
        
      ],
    },
    {
      path: "/admin-dashboard/doctor",
      element: <DashboardLayout />,
      children: [
        { path: "manage-patient", element: <ManagePatient /> }, //quan ly benh nhan
      
        {
          path: "manage-schedule-doctor",
          element: <ManageScheduleOneDoctor />,
        }, //quan ly ke hoach kham benh chi rieng mot bac si do
        { path: "", element: <Navigate to="/admin-dashboard/doctor/manage-patient" replace={true}/> }
      ],
    },
    
  ]);
}
