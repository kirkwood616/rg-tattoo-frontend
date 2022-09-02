/**
 * Formats the current browser path & parameters into a title to be displayed
 * within components. If no path or parameters in the route, it will return
 * a default title of `Home`.
 *
 * @param title Takes in a `string` or `undefined` route from the current browser
 * path. If `admin` is present in the path, it will be removed.
 *
 * @returns A `string` formatted with capitalization and removing of hyphens.
 *  If `undefined` is passed as a parameter, it will return `Home`.
 * @example formatRouteTitle("/admin/appointment-requests") // Returns "Appointment Requests"
 * @example formatRouteTitle(undefined) // Returns "Home"
 */
export function formatRouteTitle(title: string | undefined): string {
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

/**
 *
 * @param time A `string` in HH:MM AM/PM format.
 * @returns A `string` without a leading 0, if present. If no leading 0 present,
 * the return will be the initial `time` parameter passed.
 * @example 09:30 AM => 9:30 AM
 * @example 10:30 PM => 10:30 PM
 */
export function formatTimeNoLeadingZero(time: string): string {
  if (Number(time[0]) > 0) return time;
  return time.substring(1);
}

/**
 *
 * @param date A `string` in MM/DD/YYYY format.
 * @returns A `string` without a leading 0, if present. If no leading 0 present,
 * the return will be the initial `date` parameter passed.
 * @example 09/01/2022 => 9/01/2022
 * @example 10/01/2022 => 10/01/2022
 */
export function formatDateNoLeadingZero(date: string): string {
  if (Number(date[0]) > 0) return date;
  return date.substring(1);
}
