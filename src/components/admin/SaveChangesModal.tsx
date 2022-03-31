import { format } from "date-fns";
import { Dispatch, SetStateAction, useContext, useState } from "react";
import AppContext from "../../context/AppContext";
import AvailableAppointments from "../../models/AvailableAppointments";
import { postAvailableAppointment, updateAvailableAppointment } from "../../services/AdminApiService";
import GoButton from "../buttons/GoButton";
import LoadingDotsIcon from "../loading/LoadingDotsIcon";
import "./SaveChangesModal.css";

interface Props {
  isSaveActive: boolean;
  setIsSaveActive: Dispatch<SetStateAction<boolean>>;
  dateId: string;
  startDate: Date;
  appointmentTimes: string[];
}

function SaveChangesModal({ isSaveActive, setIsSaveActive, dateId, startDate, appointmentTimes }: Props) {
  // CONTEXT
  let { handleAvailableAppointments } = useContext(AppContext);

  // STATE
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // SAVE CHANGES
  function handleOnSave(): void {
    setIsLoading(true);
    let appointmentDateTimes: AvailableAppointments = {
      date: format(startDate!, "MM-dd-yyyy"),
      availableTimes: appointmentTimes!,
    };
    if (dateId) {
      updateAvailableAppointment(dateId, appointmentDateTimes)
        .then(() => handleAvailableAppointments())
        .then(() => {
          setIsLoading(false);
          setIsSaveActive(false);
        });
    } else {
      postAvailableAppointment(appointmentDateTimes)
        .then(() => handleAvailableAppointments())
        .then(() => {
          setIsLoading(false);
          setIsSaveActive(false);
        });
    }
  }

  return (
    <div className={isSaveActive ? "SaveChangesModal" : "SaveChangesModal hide"}>
      <div className="save-confirm">
        <h2>Are You Sure?</h2>
        <GoButton type="button" text="SAVE" backgroundColor="green" onClick={handleOnSave} />
        <GoButton type="button" text="CANCEL" backgroundColor="red" onClick={() => setIsSaveActive(false)} />
        {isLoading ? <LoadingDotsIcon /> : ""}
      </div>
    </div>
  );
}

export default SaveChangesModal;
