import React, { useContext } from "react";
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Main from "./components/Main";
import RequestSubmitted from "./components/RequestSubmitted";
import SetAvailableAppointments from "./components/admin/SetAvailableAppointments";
import LogIn from "./components/admin/LogIn";
import AdminHome from "./components/admin/AdminHome";
import AppointmentRequests from "./components/admin/AppointmentRequests";
import AppointmentRequestById from "./components/admin/AppointmentRequestById";
import LoadingDotsIcon from "./components/loading/LoadingDotsIcon";
import AppContext from "./context/AppContext";
import RequestPage from "./components/RequestPage";

function App() {
  // CONTEXT
  let { isLoading } = useContext(AppContext);

  return (
    <div className="App">
      <Router>
        {isLoading ? <LoadingDotsIcon /> : ""}
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/request-appointment" element={<RequestPage />} />
          <Route path="/request-submitted" element={<RequestSubmitted />} />
          <Route path="/admin/login" element={<LogIn />} />
          <Route path="/admin/home" element={<AdminHome />} />
          <Route path="/admin/appointment-requests" element={<AppointmentRequests />} />
          <Route path="/admin/appointment-requests/:id" element={<AppointmentRequestById />} />
          <Route path="/admin/set-available-appointments" element={<SetAvailableAppointments />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>{" "}
    </div>
  );
}

export default App;
