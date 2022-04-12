import { FormEvent, useContext, useEffect, useState } from "react";
import AppContext from "../../context/AppContext";
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { useNavigate } from "react-router-dom";

import GoButton from "../buttons/GoButton";
import Page from "../Page";
import ErrorMessage from "../ErrorMessage";
import "./LogIn.css";

function LogIn() {
  // CONTEXT
  let { user, setUser, setIsLoading } = useContext(AppContext);

  // STATES
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  // STATES FOR ERRORS
  const [errorMessage, setErrorMessage] = useState("");

  // NAVIGATE
  let navigate = useNavigate();

  // USER CHECK
  useEffect(() => {
    if (user) {
      navigate("/admin/home");
    }
  }, [navigate, user]);

  // AUTH
  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  async function handleLogIn() {
    setIsLoading(true);
    try {
      const user = await signInWithEmailAndPassword(auth, email, password).then(() => setIsLoading(false));
    } catch (error: unknown) {
      setIsLoading(false);
      if (error instanceof Error) {
        console.log(error.message);
        setErrorMessage(error.message);
      }
    }
  }

  // ON SUBMIT
  function onSubmit(e: FormEvent) {
    e.preventDefault();
    handleLogIn();
  }
  console.log(errorMessage.includes("user-not-found"));

  return (
    <Page title="Log In">
      <div className="LogIn">
        <form onSubmit={onSubmit}>
          <div className="input_container">
            <input type="text" name="email" id="email" placeholder="EMAIL" value={email} required onChange={(e) => setEmail(e.target.value)} />
            <ErrorMessage message={"INCORRECT EMAIL"} loginError={errorMessage.includes("user-not-found")} />
          </div>
          <div className="input_container">
            <input
              type="password"
              name="password"
              id="password"
              placeholder="PASSWORD"
              value={password}
              autoComplete="on"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <ErrorMessage message={"INCORRECT PASSWORD"} loginError={errorMessage.includes("wrong-password")} />
          </div>
          <GoButton type="submit" text="LOG IN" backgroundColor="green" />
        </form>
      </div>
    </Page>
  );
}

export default LogIn;
