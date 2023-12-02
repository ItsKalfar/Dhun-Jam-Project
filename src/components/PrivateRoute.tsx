import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useGlobalContext } from "../context/GlobalContext";

const PrivateRoute: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { token, user } = useGlobalContext();

  if (!token || !user?.id) return <Navigate to={"/login"} replace />;

  return children;
};

export default PrivateRoute;
