import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = useSelector(
    (state) => state.reducer.user.isAuthenticated,
  );
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!isAuthenticated) {
          localStorage.setItem(
            "redirectPath",
            props.location.pathname + props.location.search,
          );
          return (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: props.location },
              }}
            />
          );
        }
        return <Component {...props} />;
      }}
    />
  );
};

export default ProtectedRoute;
