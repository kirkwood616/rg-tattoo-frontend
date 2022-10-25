export function dateEstUS(date: Date): Date {
  const estDateString = date.toLocaleDateString("en-Us", { timeZone: "America/New_York" });
  return new Date(estDateString);
}

export function dateFormatUS(dateInput: Date | string): string {
  const date = typeof dateInput === "string" ? new Date(dateInput) : dateInput;
  const dateUS = date.toLocaleDateString("en-Us", {
    timeZone: "America/New_York",
    month: "numeric",
    day: "2-digit",
    year: "numeric",
  });
  return dateUS;
}

export function localeDate(date: Date): Date {
  const localeDate = date.toLocaleDateString("en-Us", { timeZone: "America/Detroit" });
  return new Date(localeDate);
}
