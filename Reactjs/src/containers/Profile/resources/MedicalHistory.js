import { useRef, useState, useEffect } from "react";

import "../scss/MedicalHistory.scss";
import { FormattedMessage } from "react-intl";

import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import EditProfileModal from "./EditProfileModal"
import * as actions from "../../../store/actions";
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from "../../../utils";

import { Modal } from "reactstrap";
import moment from "moment";

import {
  filterHistoriesPatient
} from "../../../services/userService";

import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css"; // This only needs to be imported once in your app
import { toast } from "react-toastify";
import LoadingOverlay from "react-loading-overlay";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";


export default function MedicalHistory() {

    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [patientId, setPatientId] = useState("");
    const [histories, setHistories] = useState([]);
    const [previewImgURL, setPreviewImgURL] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
   
    const [isShowLoading, setIsShowLoading] = useState(false);
    
    

    const dispatch = useDispatch();
    let history = useHistory();

    const { isLoggedIn, userInfo, language } = useSelector((state) => ({
      isLoggedIn: state.user.isLoggedIn,
      userInfo: state.user.userInfo,
      language: state.app.language,
    }));

    useEffect(async () => {
      console.log("userInfo",userInfo)
      if(userInfo && userInfo.id){
        setPatientId(userInfo.id)
      }

     await handleFilterHistoriesByDate(userInfo.id,startDate,endDate)

    }, []);

    console.log("userInfo",userInfo)

const checkValidateInput=()=>{
    if(!startDate){
      if(language=="vi"){
          toast.error("Bạn chưa nhập ngày bắt đầu")
      }else{
        toast.error("You have not entered a start date")
      }
      return false;
    }

    if(!endDate){
      if(language=="vi"){
          toast.error("Bạn chưa nhập ngày kết thúc")
      }else{
        toast.error("You have not entered an end date")
      }
      return false;
    }

    return true;
}

const handleFilterHistoriesByDate=async (patientId,startDate,endDate)=>{
    let data={
      patientId:patientId,
      startDate:startDate,
      endDate:endDate
    }
    let res = await filterHistoriesPatient(data)
    if(res && res.errCode==0){
        console.log("res.data",res.data)
        setHistories(res.data)
    }
}

const openPreviewImage = (item) => {
  setPreviewImgURL("")

  let imageBase64 = "";
  
  if(item.files){
    imageBase64 = new Buffer(item.files, "base64").toString("binary");
    if(imageBase64){
      setPreviewImgURL(imageBase64)

      if (previewImgURL){
        setIsOpen(true)
      }
    }
  }
};

const handleDownloadImage = (item) => {
  let imageBase64 = "";
  
  if(item.files){
    imageBase64 = new Buffer(item.files, "base64").toString("binary");
    if(imageBase64){
      const a = document.createElement('a')
      a.download = 'medical-examination-history.png'
      a.href = imageBase64
      a.click()
    }
  }
};


  return (
    <LoadingOverlay
    active={isShowLoading}
    spinner={<ClimbingBoxLoader color={"#86e7d4"} size={15} />}
  >
        <div>
            <div class="d-flex justify-content-center">
              <h2><FormattedMessage id="medical-history.title" /></h2>
            </div>
           

            <div class="row">
                <div class="col-12">
                    <table class="table table-hover mt-45">
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col"><FormattedMessage id="medical-history.date-examination" /></th>
                          <th scope="col" class="text-center"><FormattedMessage id="medical-history.reason" /></th>
                          <th scope="col"  class="text-center"><FormattedMessage id="medical-history.doctor" /></th>
                          <th scope="col" class="text-center"><FormattedMessage id="medical-history.prescription" /></th>
                          <th scope="col" class="text-center"><FormattedMessage id="medical-history.doctor-advice" /></th>
                          <th scope="col" class="text-center"><FormattedMessage id="medical-history.receipt" /></th>
                          <th scope="col" class="text-center">&nbsp;</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          histories.map((item,index)=>{
                           
                            return(
                              <tr>
                                  <th scope="row">{index+1}</th>
                                  <td>{moment(item.createdAt).format("DD/MM/YYYY")}</td>
                                  <td class="text-center">{item.reason}</td>
                                  <td class="text-center">
                                      <div class="pointer text-primary" onClick={()=>history.push(`/detail-doctor/${item.doctorId}`)}>{item.doctorDataHistory.lastName} {item.doctorDataHistory.firstName}</div>
                                      <div class="pointer text-primary" onClick={()=>history.push(`/detail-specialty/${item.doctorDataHistory.Doctor_Infor.specialtyId}`)}>{item.doctorDataHistory.Doctor_Infor.specialtyData.name}</div>
                                      <div class="pointer text-primary" onClick={()=>history.push(`/detail-clinic/${item.doctorDataHistory.Doctor_Infor.clinicId}`)}>{item.doctorDataHistory.Doctor_Infor.clinicData.name}</div>
                                  </td>
                                  <td>
                                
                                  </td>
                                  <td class="text-center">{item.description}</td>
                                  <td  class="text-center">
                                    <div
                                      className="text-center pointer text-primary"
                                      onClick={()=>openPreviewImage(item)}
                                    ><FormattedMessage id={"manage-patient.view"} /></div>
                                  </td>
                                  <td onClick={()=>handleDownloadImage(item)} class="text-center pointer text-center text-success"><FormattedMessage id={"manage-patient.download"} /></td>
                              </tr>
                            )
                          })
                        }
                      
                      </tbody>
                    </table>
                </div>
            </div>

            {isOpen === true && (
            <Lightbox
              mainSrc={previewImgURL}
              onCloseRequest={() => setIsOpen(false)}
            />
          )}
        </div>
    </LoadingOverlay>
  );
}
