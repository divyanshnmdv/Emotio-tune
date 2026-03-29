import React from 'react'
import { useAuth } from '../hooks/useAuth'
import { Navigate, useNavigate } from 'react-router'
import { useEffect } from 'react'
import Loading from "./Loading.jsx";

const Protected = ({ children }) => {

    const {
        user, loading
    } = useAuth()


    if (loading) {
        return <Loading/>
    }
    
    if (!user) {
        return <Navigate to="/login" />
    }

    return children
}

export default Protected