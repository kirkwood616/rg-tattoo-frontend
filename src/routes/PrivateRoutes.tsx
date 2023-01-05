import Loading from "components/loading/Loading";
import useAuthCheck from "hooks/useAuthCheck";
import { Navigate } from "react-router-dom";

interface Props {
  component: JSX.Element;
}
function PrivateRoutes({ component }: Props) {
  const { user, checkingAuth } = useAuthCheck();

  if (checkingAuth) return <Loading />;
  if (user) return component;
  return <Navigate to="/user/login" />;
}

export default PrivateRoutes;
