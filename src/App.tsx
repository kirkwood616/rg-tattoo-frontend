import { useContext } from "react";
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import AdminHome from "./components/admin/AdminHome";
import AppointmentRequestById from "./components/admin/AppointmentRequestById";
import AppointmentRequests from "./components/admin/AppointmentRequests";
import LogIn from "./components/admin/LogIn";
import SetAvailableAppointments from "./components/admin/SetAvailableAppointments";
import Aftercare from "./components/Aftercare";
import Header from "./components/Header";
import LoadingDotsIcon from "./components/loading/LoadingDotsIcon";
import Main from "./components/Main";
import RequestPage from "./components/RequestPage";
import RequestSubmitted from "./components/RequestSubmitted";
import AppContext from "./context/AppContext";

function App() {
  // CONTEXT
  let { isLoading } = useContext(AppContext);

  return (
    <div className="App">
      <Router>
        {isLoading && <LoadingDotsIcon />}
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/aftercare" element={<Aftercare />} />
          <Route path="/request-appointment" element={<RequestPage />} />
          <Route path="/request-submitted" element={<RequestSubmitted />} />
          <Route path="/admin/login" element={<LogIn />} />
          <Route path="/admin/home" element={<AdminHome />} />
          <Route path="/admin/appointment-requests" element={<AppointmentRequests />} />
          <Route path="/admin/appointment-requests/:id" element={<AppointmentRequestById />} />
          <Route path="/admin/rejected-requests/:id" element={<AppointmentRequestById />} />
          <Route path="/admin/set-available-appointments" element={<SetAvailableAppointments />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
