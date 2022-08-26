import { useContext } from "react";
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import { requestTypes } from "./admin/AdminSettings";
import AdminContainer from "./components/admin/AdminContainer";
import AdminHome from "./components/admin/AdminHome";
import AppointmentRequestById from "./components/admin/AppointmentRequestById";
import AppointmentRequests from "./components/admin/AppointmentRequests";
import LogIn from "./components/admin/LogIn";
import PrivateRoutes from "./components/admin/PrivateRoutes";
import RequestList from "./components/admin/RequestList";
import SetAvailableAppointments from "./components/admin/SetAvailableAppointments";
import Aftercare from "./components/Aftercare";
import Header from "./components/Header";
import LoadingDotsIcon from "./components/loading/LoadingDotsIcon";
import Main from "./components/Main";
import RequestPage from "./components/RequestPage";
import RequestSubmitted from "./components/RequestSubmitted";
import AppContext from "./context/AppContext";

function App() {
  let { user, isLoading } = useContext(AppContext);

  return (
    <div className="App">
      <Router>
        {isLoading && <LoadingDotsIcon />}
        {!user && <Header />}
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="aftercare" element={<Aftercare />} />
          <Route path="request-appointment" element={<RequestPage />} />
          <Route path="request-submitted" element={<RequestSubmitted />} />
          <Route path="user/login" element={<LogIn />} />
          <Route element={<PrivateRoutes />}>
            <Route path="/admin/*" element={<AdminContainer />}>
              <Route index element={<AdminHome />} />
              <Route path="home" element={<AdminHome />} />
              <Route path="appointment-requests" element={<AppointmentRequests />}>
                {requestTypes.map((request, index) => (
                  <Route path={":route"} element={<RequestList />} key={request.name + request.path}>
                    <Route path=":id" element={<AppointmentRequestById />} key={request.name + request.path + index} />
                  </Route>
                ))}
              </Route>
              <Route path="set-available-appointments" element={<SetAvailableAppointments />} />
            </Route>
          </Route>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
