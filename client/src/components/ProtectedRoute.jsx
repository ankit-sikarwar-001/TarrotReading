import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../appContext/AuthContext";

const PrivateRoute = ({ children }) => {
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        return <div className="text-white text-center mt-10">Loading...</div>; // or a spinner
    }

    return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
