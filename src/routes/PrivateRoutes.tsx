import AppContext from "context/AppContext";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "firebaseConfig";
import { useContext, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";

function PrivateRoutes() {
  const { user, setUser, setIsLoading } = useContext(AppContext);

  useEffect(() => {
    setIsLoading(true);
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) setUser(currentUser);
      setIsLoading(false);
    });
    return unsubscribe;
  }, [setIsLoading, setUser, user]);

  return user ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoutes;
