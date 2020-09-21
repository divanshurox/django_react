import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PrivateRoute({ component: Component, auth, ...rest }) {
  const author = useSelector((state) => state.auth);
  return (
    <Route
      {...rest}
      render={(props) => {
        if (author.isLoading) {
          return <h2>Loading...</h2>;
        } else if (!author.isAuthenticated) {
          return <Redirect to="/login" />;
        } else {
          return <Component {...props} />;
        }
      }}
    />
  );
}
