import AdminContainer from "admin/components/AdminContainer";
import RequestList from "admin/components/RequestList";
import AdminHome from "admin/pages/AdminHome";
import AppointmentRequestById from "admin/pages/AppointmentRequestById";
import AppointmentRequests from "admin/pages/AppointmentRequests";
import SetAvailableAppointments from "admin/pages/SetAvailableAppointments";
import { requestTypes } from "admin/settings/AdminSettings";
import Header from "components/Header";
import LoadingDotsIcon from "components/loading/LoadingDotsIcon";
import RequestPage from "components/RequestPage";
import AppContext from "context/AppContext";
import Aftercare from "pages/Aftercare";
import Home from "pages/Home";
import LogIn from "pages/LogIn";
import RequestSubmitted from "pages/RequestSubmitted";
import { useContext } from "react";
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import PrivateRoutes from "routes/PrivateRoutes";

function App() {
  const { isLoading } = useContext(AppContext);

  return (
    <div className="App">
      <Router>
        {isLoading && <LoadingDotsIcon />}
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="aftercare" element={<Aftercare />} />
          <Route path="request-appointment" element={<RequestPage />} />
          <Route path="request-submitted" element={<RequestSubmitted />} />
          <Route path="login" element={<LogIn />} />
          <Route element={<PrivateRoutes component={<AdminContainer />} />}>
            <Route path="/admin/*">
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
