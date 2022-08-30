import LoadingDotsIcon from "components/loading/LoadingDotsIcon";
import AppContext from "context/AppContext";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "firebaseConfig";
import { useContext, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";

function PrivateRoutes() {
  const { user, setUser } = useContext(AppContext);

  useEffect(() => {
    const authChange = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) setUser(currentUser);
    });
    return authChange;
  }, [setUser]);

  if (user === null) return <LoadingDotsIcon />;

  return user ? <Outlet /> : <Navigate to="user/login" />;
}

export default PrivateRoutes;
