import GoButton from "components/buttons/GoButton";
import ErrorMessage from "components/errors/ErrorMessage";
import AppContext from "context/AppContext";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "firebaseConfig";
import { FormEvent, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LogIn.css";

function LogIn() {
  // CONTEXT
  const { setUser, setIsLoading } = useContext(AppContext);

  // STATE
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // NAVIGATE
  const navigate = useNavigate();

  // USER CHECK
  useEffect(() => {
    setIsLoading(true);
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        navigate("/admin/home");
      }
      setIsLoading(false);
    });

    return unsubscribe;
  }, [navigate, setIsLoading, setUser]);

  async function handleLogIn() {
    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      if (error instanceof Error) setErrorMessage(error.message);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  // ON SUBMIT
  function onSubmit(e: FormEvent) {
    e.preventDefault();
    handleLogIn();
  }

  return (
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
  );
}

export default LogIn;
