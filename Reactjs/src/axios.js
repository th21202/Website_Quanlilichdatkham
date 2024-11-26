import axios from "axios";
import _ from "lodash";
// import config from "./config";

const instance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  // withCredentials: true,
});


instance.interceptors.response.use(
  (response) => {
    //object có 2 thuộc tính: data và status
    const { data } = response;
  
    //call api thành công  
    return response.data;
  }
 
);

export default instance;
