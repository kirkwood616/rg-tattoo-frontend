import LoadingDotsIcon from "components/loading/LoadingDotsIcon";
import useAuthCheck from "hooks/useAuthCheck";
import { Navigate } from "react-router-dom";

interface Props {
  component: JSX.Element;
}
function PrivateRoutes({ component }: Props) {
  const { user, checkingAuth } = useAuthCheck();

  if (checkingAuth) return <LoadingDotsIcon />;
  if (user) return component;
  return <Navigate to="/user/login" />;
}

export default PrivateRoutes;
