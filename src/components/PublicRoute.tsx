import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useGlobalContext } from "../context/GlobalContext";

const PublicRoute: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { token, user } = useGlobalContext();

  if (token && user?.id) return <Navigate to={`/admin/${user?.id}`} replace />;

  return children;
};

export default PublicRoute;
