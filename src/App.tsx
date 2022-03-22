import React from "react";
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Main from "./components/Main";
import RequestAppointment from "./components/RequestAppointment";
import RequestSubmitted from "./components/RequestSubmitted";
import SetAvailableAppointments from "./components/admin/SetAvailableAppointments";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/request-appointment" element={<RequestAppointment />} />
          <Route path="/request-submitted" element={<RequestSubmitted />} />
          <Route path="/set-available-appointments" element={<SetAvailableAppointments />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
