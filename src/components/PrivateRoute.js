import React from "react";
import { Navigate } from "react-router-dom";
import Swal from "sweetalert2";

const PrivateRoute = ({ isAuthenticated, children }) => {
  if (!isAuthenticated) {
    Swal.fire({
      title: "Unauthorized!",
      text: "You must be logged in to access this page.",
      icon: "warning",
      confirmButtonText: "OK",
    });
    return <Navigate to="/login" />;
  }
  return children;
};

export default PrivateRoute;
