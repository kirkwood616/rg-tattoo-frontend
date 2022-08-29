import { onAuthStateChanged } from "firebase/auth";
import { useContext, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AppContext from "../../context/AppContext";
import { auth } from "../../firebaseConfig";
import LoadingDotsIcon from "../loading/LoadingDotsIcon";

function PrivateRoutes() {
  let { user, setUser } = useContext(AppContext);

  useEffect(() => {
    const authChange = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) setUser(currentUser);
    });
    return authChange;
  }, []);

  if (user === null) return <LoadingDotsIcon />;

  return user ? <Outlet /> : <Navigate to="user/login" />;
}

export default PrivateRoutes;
