import { postAvailableAppointment, updateAvailableAppointment } from "admin/services/AdminApiService";
import GoButton from "components/buttons/GoButton";
import ModalWindow from "components/modals/ModalWindow";
import AppContext from "context/AppContext";
import { format } from "date-fns";
import AvailableAppointments from "models/AvailableAppointments";
import { Dispatch, SetStateAction, useContext } from "react";
import { useSWRConfig } from "swr";
import "./SaveChangesModal.css";

interface Props {
  isSaveActive: boolean;
  setIsSaveActive: Dispatch<SetStateAction<boolean>>;
  dateId: string;
  startDate: Date;
  appointmentTimes: string[];
}

function SaveChangesModal({ isSaveActive, setIsSaveActive, dateId, startDate, appointmentTimes }: Props) {
  const { toggleLoading } = useContext(AppContext);
  const { mutate } = useSWRConfig();

  function handleOnSave(): void {
    toggleLoading();
    const appointmentDateTimes: AvailableAppointments = {
      date: format(startDate!, "MM-dd-yyyy"),
      availableTimes: appointmentTimes!,
    };
    if (dateId) {
      updateAvailableAppointment(dateId, appointmentDateTimes)
        .then(() => mutate("/available-appointments"))
        .catch((error) => console.error(error))
        .then(() => {
          toggleLoading();
          setIsSaveActive((current) => !current);
        });
    } else {
      postAvailableAppointment(appointmentDateTimes)
        .then(() => mutate("/available-appointments"))
        .catch((error) => console.error(error))
        .then(() => {
          toggleLoading();
          setIsSaveActive((current) => !current);
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
