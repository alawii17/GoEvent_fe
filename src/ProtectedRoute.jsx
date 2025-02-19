import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("token"); // Cek token di local storage
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
