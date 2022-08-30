import { format } from "date-fns";
import { Dispatch, SetStateAction, useContext } from "react";
import { useSWRConfig } from "swr";
import GoButton from "../../components/buttons/GoButton";
import ModalWindow from "../../components/modals/ModalWindow";
import AppContext from "../../context/AppContext";
import AvailableAppointments from "../../models/AvailableAppointments";
import { postAvailableAppointment, updateAvailableAppointment } from "../services/AdminApiService";
import "./SaveChangesModal.css";

interface Props {
  isSaveActive: boolean;
  setIsSaveActive: Dispatch<SetStateAction<boolean>>;
  dateId: string;
  startDate: Date;
  appointmentTimes: string[];
}

function SaveChangesModal({ isSaveActive, setIsSaveActive, dateId, startDate, appointmentTimes }: Props) {
  // SWR
  const { mutate } = useSWRConfig();

  // CONTEXT
  const { setIsLoading } = useContext(AppContext);

  // SAVE CHANGES
  function handleOnSave(): void {
    setIsLoading(true);
    const appointmentDateTimes: AvailableAppointments = {
      date: format(startDate!, "MM-dd-yyyy"),
      availableTimes: appointmentTimes!,
    };
    if (dateId) {
      updateAvailableAppointment(dateId, appointmentDateTimes)
        .then(() => mutate("/available-appointments"))
        .catch((error) => console.error(error))
        .then(() => {
          setIsLoading(false);
          setIsSaveActive(false);
        });
    } else {
      postAvailableAppointment(appointmentDateTimes)
        .then(() => mutate("/available-appointments"))
        .catch((error) => console.error(error))
        .then(() => {
          setIsLoading(false);
          setIsSaveActive(false);
        });
    }
  }

  return (
    <ModalWindow isActive={isSaveActive} setIsActive={setIsSaveActive} className="save-confirm">
      <h2>Are You Sure?</h2>
      <GoButton type="button" text="SAVE" backgroundColor="green" onClick={handleOnSave} />
      <GoButton type="button" text="CANCEL" backgroundColor="red" onClick={() => setIsSaveActive(false)} />
    </ModalWindow>
  );
}

export default SaveChangesModal;
