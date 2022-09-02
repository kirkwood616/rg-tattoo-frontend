// FORMAT TIME FROM STRING (e.g. 04:00 PM => 4:00 PM)
export function formatTime(time: string): string {
  if (Number(time[0]) > 0) return time;
  return time.substring(1);
}

export function formatDate(date: string): string {
  if (Number(date[0]) > 0) return date;
  return date.substring(1);
}

// FORMAT TITLE FROM STATUS/ROUTE (e.g. awaiting-deposit => Awaiting Deposit)
export function formatTitle(title: string | undefined): string {
  if (title === undefined) {
    return "Home";
  } else if (title.includes("/admin/")) {
    return title.replace("/admin/", "") + title;
  } else if (title.includes("-")) {
    return (
      title[0].toUpperCase() +
      title
        .substring(1)
        .replace(/-[a-z]/g, (match) => match.toUpperCase())
        .replace("-", " ")
    );
  } else {
    return `${title[0].toUpperCase()}${title.substring(1)}`;
  }
}

/**
 * Formats a Date object or date-time string to US date format.
 *
 * The returned string will be in the format of MM/DD/YYYY.
 *
 * If the month has a leading the 0, it will be returned as M/DD/YYYY.
 *
 * @param date Date object or parsed date-time string. Date-time strings should be parsed to ISO or UTC. Preferred usage of `date.toLocaleString("en-US")` on a `Date` object.
 */
export function formatUnitedStatesDate(date: Date | string): string {
  const dateENUS = new Date(date).toLocaleDateString("en-US", { timeZone: "America/New_York", month: "2-digit", day: "2-digit", year: "numeric" });
  if (dateENUS[0] === "0") {
    return dateENUS.substring(1);
  } else {
    return dateENUS;
  }
}

/**
 * Formats a Date object or date-time string to US Eastern Standard Time to a string.
 *
 * The returned string will be in the format of MM/DD/YYYY (EST).
 *
 * If the month has a leading the 0, it will be returned as M/DD/YYYY (EST).
 *
 * @param date Date object or parsed date-time string. Date-time strings should be parsed to ISO or UTC. Preferred usage of `date.toLocaleString("en-US")` on a `Date` object.
 */
export function formatEstTime(date: Date | string): string {
  const estDate = new Date(date).toLocaleTimeString("en-US", { timeZone: "America/New_York", hour: "2-digit", minute: "2-digit" });
  return estDate;
}

/**
 * Formats a Date object or date-time string to US Eastern Standard Time to a string with an `(EST)` suffix appended.
 *
 * The returned string will be in the format of HH:MM (EST).
 *
 * If the time has a leading the 0, it will be returned as H:MM (EST).
 *
 * @param date Date object or parsed date-time string. Date-time strings should be parsed to ISO or UTC. Preferred usage of `date.toLocaleString("en-US")` on a `Date` object.
 */
export function formatEstTimeWithSuffix(date: Date | string): string {
  const estDate = new Date(date).toLocaleTimeString("en-US", { timeZone: "America/New_York", hour: "2-digit", minute: "2-digit" });
  if (estDate[0] === "0") {
    return `${estDate.substring(1)} (EST)`;
  } else {
    return estDate;
  }
}
