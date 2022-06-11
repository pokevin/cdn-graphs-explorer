import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";

type RequireAuthProps = {
  redirectTo: string;
  children: JSX.Element;
};

export const RequireAuth = ({ redirectTo, children }: RequireAuthProps) => {
  const { isAuth } = useAuth();
  const location = useLocation();
  return isAuth ? (
    children
  ) : (
    <Navigate to={redirectTo} state={{ from: location }} replace />
  );
};
