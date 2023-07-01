import React , {useEffect,useContext }from "react";
import { Outlet ,Navigate} from 'react-router-dom';
import { useSelector } from "react-redux";

import { ExternalContext } from '../context/CustomContext';

export  default function  Userauth(){
    console.log('hello');
    const { setShow}=  useContext(ExternalContext)
   
    let logged = useSelector((state) => state.user.id)
    useEffect(()=>{
        if(logged){
console.log('working of useeefect in userauth');
        }
        else{
            console.log('working of useeefect in userauth');
            setShow(true)
  
        }
    },[logged])

    return logged ? <Outlet/> : <Navigate to="/" />
 
}