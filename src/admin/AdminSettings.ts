import { add } from "date-fns";

// POPULATE TIMES BY INTERVAL (5, 10, 15, 30, etc. => endTime must be divisible by increment to startTime)
function adminTimePickerValues(startTime: string, endTime: string, interval: number): string[] | void {
  if (interval !== 5 && interval !== 10 && interval !== 15 && interval !== 30) return;
  let start: Date = new Date(`03/27/2022 ${startTime}`);
  let end: Date = new Date(`03/27/2022 ${endTime}`);
  let startLocale: string = start.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
  let endLocale: string = end.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
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
    name: "New Requests",
    path: "new",
  },
  {
    name: "Awaiting Deposit",
    path: "awaiting-deposit",
  },
  {
    name: "Confirmed Requests",
    path: "confirmed",
  },
  {
    name: "Completed Requests",
    path: "completed",
  },
  {
    name: "Canceled Requests",
    path: "canceled",
  },
  {
    name: "Rejected Requests",
    path: "rejected",
  },
];
