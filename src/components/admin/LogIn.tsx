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
  let { user, setUser } = useContext(AppContext);

  // STATES
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  // STATES FOR ERRORS
  const [errors, setErrors] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // ERROR CHECK
  useEffect(() => {
    if (errorMessage) {
      setErrors(true);
    } else {
      setErrors(false);
    }
  }, [errorMessage]);

  // NAVIGATE
  let navigate = useNavigate();

  // USER CHECK
  useEffect(() => {
    if (user) {
      navigate("/admin/home");
    }
  }, [user]);

  // AUTH
  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  async function logIn() {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      console.log(user);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error.message);
        setErrorMessage(error.message);
      }
    }
  }

  // ON SUBMIT
  function onSubmit(e: FormEvent) {
    e.preventDefault();
    logIn();
  }

  return (
    <Page title="Log In">
      <div className="LogIn">
        <form onSubmit={onSubmit}>
          <div className="input_container">
            <input type="text" name="email" id="email" placeholder="EMAIL" value={email} required onChange={(e) => setEmail(e.target.value)} />
            {errorMessage.includes("user-not-found") ? <ErrorMessage message={"INCORRECT EMAIL"} /> : ""}
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
            {errorMessage.includes("wrong-password") ? <ErrorMessage message={"INCORRECT PASSWORD"} /> : ""}
          </div>
          <GoButton type="submit" text="LOG IN" />
        </form>
      </div>
    </Page>
  );
}

export default LogIn;
