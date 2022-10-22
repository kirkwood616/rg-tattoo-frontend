import GoButton from "components/buttons/GoButton";
import ErrorMessage from "components/errors/ErrorMessage";
import LoadingDotsIcon from "components/loading/LoadingDotsIcon";
import AppContext from "context/AppContext";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "firebaseConfig";
import useAuthCheck from "hooks/useAuthCheck";
import { FormEvent, useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import "./LogIn.css";

function LogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { toggleLoading } = useContext(AppContext);
  const { user, checkingAuth } = useAuthCheck();

  async function onSubmit(e: FormEvent): Promise<void> {
    e.preventDefault();
    toggleLoading();
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      if (error instanceof Error) setErrorMessage(error.message);
      console.error(error);
    } finally {
      toggleLoading();
    }
  }

  if (checkingAuth) return <LoadingDotsIcon />;
  if (user) return <Navigate to="/admin/home" />;
  return (
    <div className="LogIn">
      <form onSubmit={onSubmit}>
        <div className="input_container">
          <input
            type="text"
            name="email"
            id="email"
            placeholder="EMAIL"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
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
