import { useContext } from "react";
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import AdminContainer from "./components/admin/AdminContainer";
import Aftercare from "./components/Aftercare";
import Header from "./components/Header";
import LoadingDotsIcon from "./components/loading/LoadingDotsIcon";
import Main from "./components/Main";
import RequestPage from "./components/RequestPage";
import RequestSubmitted from "./components/RequestSubmitted";
import AppContext from "./context/AppContext";

function App() {
  // CONTEXT
  let { user, isLoading } = useContext(AppContext);

  return (
    <div className="App">
      <Router>
        {isLoading && <LoadingDotsIcon />}
        {!user && <Header />}
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/aftercare" element={<Aftercare />} />
          <Route path="/request-appointment" element={<RequestPage />} />
          <Route path="/request-submitted" element={<RequestSubmitted />} />
          <Route path="/admin/*" element={<AdminContainer />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
