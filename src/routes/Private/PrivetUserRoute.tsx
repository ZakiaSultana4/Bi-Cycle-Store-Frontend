import { selectCurrentToken } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";
import { ReactNode } from "react";

import { Navigate, useLocation } from "react-router-dom";
import { TUser } from "@/types/types";
import { verifyToken } from "@/utils/verifyToken";

const PrivetUserRoute = ({
  children,

}: {
  children: ReactNode;
}) => {
  const token = useAppSelector(selectCurrentToken);
  const location = useLocation();

  let user;
  if (token) {
    user = verifyToken(token) as TUser;
  }

  if (!user?.email) {
    return <Navigate state={location?.pathname} to={'/login'} replace={true}></Navigate>;
  }

  return children;
};

export default PrivetUserRoute;