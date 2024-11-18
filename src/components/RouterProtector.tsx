import React from "react";
import { Navigate } from "react-router-dom";
import { useAppDispatch } from "../utils/reduxHooks";
import { logout } from "../redux/slice/authSlice";
interface ProtectedRouteProps {
    children: React.ReactNode;
}
const RouterProtector: React.FC<ProtectedRouteProps> = ({ children }) => {
    const dispatch = useAppDispatch()
    const isTokenValid = (token: string): boolean => {
        try {
            const decodedToken: any = JSON.parse(atob(token.split(".")[1]));
            const currentTime = Math.floor(Date.now() / 1000); // Waktu saat ini dalam detik
            return decodedToken.exp > currentTime; // Token valid jika belum kedaluwarsa
        } catch {
            return false; // Jika parsing gagal, token dianggap tidak valid
        }
    };

    const token = localStorage.getItem("token");
    if (!token || !isTokenValid(token)) {
        dispatch(logout())
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
}

export default RouterProtector