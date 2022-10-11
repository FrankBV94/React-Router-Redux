import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { PrivateRoutes, PublicRoutes } from "../models";
import { AppStore } from "../redux/store";

interface Props {
  privateValidation: boolean;
}
const privateRoute = <Outlet />;
const publicRoute = <Navigate replace to={PrivateRoutes.PRIVATE} />;

export const AuthGuard = ({ privateValidation }: Props) => {
  const userState = useSelector((store: AppStore) => store.user);
  return userState.name ? (
    privateValidation ? (
      privateRoute
    ) : (
      publicRoute
    )
  ) : (
    <Navigate replace to={PublicRoutes.LOGIN} />
  );
};

export default AuthGuard;
