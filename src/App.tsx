import React from "react";
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Main from "./components/Main";
import RequestAppointment from "./components/RequestAppointment";
import RequestSubmitted from "./components/RequestSubmitted";
import SetAvailableAppointments from "./components/admin/SetAvailableAppointments";
import LogIn from "./components/admin/LogIn";
import AdminHome from "./components/admin/AdminHome";
import AppointmentRequests from "./components/admin/AppointmentRequests";
import AppointmentRequestById from "./components/admin/AppointmentRequestById";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/request-appointment" element={<RequestAppointment />} />
          <Route path="/request-submitted" element={<RequestSubmitted />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/admin/home" element={<AdminHome />} />
          <Route path="/admin/appointment-requests" element={<AppointmentRequests />} />
          <Route path="/admin/appointment-requests/:id" element={<AppointmentRequestById />} />
          <Route path="/admin/set-available-appointments" element={<SetAvailableAppointments />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
