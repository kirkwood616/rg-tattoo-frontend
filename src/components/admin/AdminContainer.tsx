import { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { requestTypes } from "../../admin/AdminSettings";
import AdminContextProvider from "../../context/AdminContextProvider";
import AppContext from "../../context/AppContext";
import Header from "../Header";
import AdminHome from "./AdminHome";
import AppointmentRequestById from "./AppointmentRequestById";
import AppointmentRequests from "./AppointmentRequests";
import RequestList from "./RequestList";
import SetAvailableAppointments from "./SetAvailableAppointments";

function AdminContainer() {
  let { user } = useContext(AppContext);

  return (
    <AdminContextProvider>
      {user && <Header />}
      <Routes>
        <Route index element={<AdminHome />} />
        <Route path="home" element={<AdminHome />} />
        <Route path="appointment-requests" element={<AppointmentRequests />}>
          {requestTypes.map((item) => (
            <>
              <Route path={item.path} element={<RequestList />} key={`${item.name} Path`} />
              <Route path={`${item.path}/:id`} element={<AppointmentRequestById key={`${item.name} ID`} />} />
            </>
          ))}
        </Route>
        <Route path="set-available-appointments" element={<SetAvailableAppointments />} />
      </Routes>
    </AdminContextProvider>
  );
}

export default AdminContainer;
