import { useSelector } from 'react-redux'
import { Outlet, Navigate } from 'react-router-dom'
import React from 'react-dom'

function HostAuth() {
    let hosted = useSelector((state) => state.user.isHosted)
    return hosted ? <Outlet /> : <Navigate to="/" />
}

export default HostAuth
