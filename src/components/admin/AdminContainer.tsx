import { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import AdminContextProvider from "../../context/AdminContextProvider";
import AppContext from "../../context/AppContext";
import Header from "../Header";
import AdminHome from "./AdminHome";
import AppointmentRequestById from "./AppointmentRequestById";
import AppointmentRequests from "./AppointmentRequests";
import LogIn from "./LogIn";
import RequestList from "./RequestList";
import SetAvailableAppointments from "./SetAvailableAppointments";

function AdminContainer() {
  let { user } = useContext(AppContext);

  return (
    <AdminContextProvider>
      {user && <Header />}
      <Routes>
        <Route path="login" element={<LogIn />} />
        <Route path="home" element={<AdminHome />} />
        <Route path="appointment-requests/*" element={<AppointmentRequests />}>
          <Route path="new" element={<RequestList />}></Route>
          <Route path="new/:id" element={<AppointmentRequestById />} />
          <Route path="rejected" element={<RequestList />} />
          <Route path="rejected/:id" element={<AppointmentRequestById />} />
        </Route>
        <Route path="set-available-appointments" element={<SetAvailableAppointments />} />
      </Routes>
    </AdminContextProvider>
  );
}

export default AdminContainer;
