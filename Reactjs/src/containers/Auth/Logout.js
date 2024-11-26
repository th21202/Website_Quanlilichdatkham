import { useRef, useState, useEffect } from "react";
// import * as actions from "../store/actions";
import * as actions from "../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";


export default function Logout() {

  

  const dispatch = useDispatch();
  let history = useHistory();
  
  useEffect(() => { 
    handleLogout()
   }, []);

   const handleLogout = ()=>{
    dispatch(actions.processLogout()); //mapDispathToProps
    
    history.push("/home");
   }

  return (
    <>
    </>
  );
}


