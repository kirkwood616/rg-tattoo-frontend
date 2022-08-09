import { add } from "date-fns";

// POPULATE TIMES BY INTERVAL (5, 10, 15, 30, etc. => endTime must be divisible by increment to startTime)
function adminTimePickerValues(startTime: string, endTime: string, interval: number): string[] | void {
  if (interval !== 5 && interval !== 10 && interval !== 15 && interval !== 30) return;
  let start: Date = new Date(`03/27/2022 ${startTime}`);
  const end: Date = new Date(`03/27/2022 ${endTime}`);
  const startLocale: string = start.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
  const endLocale: string = end.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
  let timesArray: string[] = [startLocale];

  while (!timesArray.includes(endLocale)) {
    start = add(start, { minutes: interval });
    timesArray.push(start.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }));
  }
  return timesArray;
}

export const timePickerValues: string[] | void = adminTimePickerValues("12:00 PM", "8:00 PM", 15);

// TATTOO STYLES
export const tattooStyles = ["Linework", "Black & White", "Full Color", "Lettering"];

// REQUEST TYPES
export const requestTypes = [
  {
    name: "NEW",
    path: "new",
  },
  {
    name: "AWAITING DEPOSIT",
    path: "awaiting-deposit",
  },
  {
    name: "DEPOSIT RECEIVED",
    path: "deposit-received",
  },
  {
    name: "COMPLETED",
    path: "completed",
  },
  {
    name: "CANCELED",
    path: "canceled",
  },
  {
    name: "REJECTED",
    path: "rejected",
  },
];
