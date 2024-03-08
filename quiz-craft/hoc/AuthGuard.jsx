import { AuthContext } from "/context/AuthContext";
import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

export default function AuthGuard({ children }) {
  const { user } = useContext(AuthContext);
  const location = useLocation();

  if (!user) {
    return <Navigate replace to="/register" state={{ from: location }} />
  }

  return children;
}

AuthGuard.propTypes = {
  children: PropTypes.node,
};