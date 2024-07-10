import React from "react";
import { Route, Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

const PrivateRoute = ({ element, ...rest }) => {
  const isAuthenticated = useSelector(
    (state) => state.reducer.user.isAuthenticated,
  );
  const location = useLocation();
  console.log("the loc", location);
  return (
    <>
      {isAuthenticated ? (
        <Outlet />
      ) : (
        <>
          {location && localStorage.setItem("redirectPath", location.pathname)}

          <Navigate to="/login" />
        </>
      )}
    </>
  );
};

export default PrivateRoute;
