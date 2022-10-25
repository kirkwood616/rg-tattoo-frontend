interface AvailableAppointments {
  _id?: string;
  date: string | Date;
  availableTimes: string[];
}

export default AvailableAppointments;
