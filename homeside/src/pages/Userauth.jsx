import React from "react";
import { Outlet ,Navigate} from 'react-router-dom';
import { useSelector } from "react-redux";


export  default function  Userauth(){
    console.log('hello');

    let logged = useSelector((state) => state.user.id)
    return logged ? <Outlet/> : <Navigate to="/" />
 
}