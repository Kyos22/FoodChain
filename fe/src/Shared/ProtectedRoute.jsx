import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext"
import { useEffect } from "react";


const ProtectedRoute = () => {
    const navigate = useNavigate();
    
    useEffect(()=>{
        const token = localStorage.getItem('authToken');
        if(!token){
            return navigate("/login");

        }
    });

   
    return <Outlet/>
};
export default ProtectedRoute;