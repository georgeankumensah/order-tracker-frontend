import React from "react";
import { Navigate, Route } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated); // Modify this based on your Redux state structure

  return (
    <Route
      {...rest}
      element={
        isAuthenticated ? <Component /> : <Navigate to="/login" replace />
      }
    />
  );
};

export default PrivateRoute;
