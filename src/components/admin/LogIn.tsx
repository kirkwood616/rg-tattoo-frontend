import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { FormEvent, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppContext from "../../context/AppContext";
import { auth } from "../../firebaseConfig";
import GoButton from "../buttons/GoButton";
import ErrorMessage from "../ErrorMessage";
import Page from "../Page";
import "./LogIn.css";

function LogIn() {
  // CONTEXT
  let { user, setUser, setIsLoading } = useContext(AppContext);

  // STATES
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
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
      await signInWithEmailAndPassword(auth, email, password).then(() => setIsLoading(false));
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
