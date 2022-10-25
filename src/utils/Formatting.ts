import { PhotoType } from "models/AppointmentRequest";
import { RequestReducer } from "models/RequestReducer";

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
  const dateENUS = new Date(date).toLocaleDateString("en-US", {
    timeZone: "America/New_York",
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  });
  if (dateENUS[0] === "0") {
    return dateENUS.substring(1);
  } else {
    return dateENUS;
  }
}

/**
 * Formats a Date object or date-time string to US Eastern Standard Time to a string.
 *
 * The returned string will be in the format of MM/DD/YYYY.
 *
 * If the month has a leading the 0, it will be returned as M/DD/YYYY.
 *
 * @param dateInput Date object or parsed date-time string. Date-time strings should be parsed to ISO or UTC. Preferred usage of `date.toLocaleDateString("en-US")` on a `Date` object.
 */
export function formatEstTime(dateInput: Date | string): string {
  const date = typeof dateInput === "string" ? new Date(dateInput) : dateInput;
  const estDate = date.toLocaleTimeString("en-US", {
    timeZone: "America/New_York",
    hour: "numeric",
    minute: "2-digit",
  });
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
export function formatEstTimeWithSuffix(dateInput: Date | string): string {
  const date = typeof dateInput === "string" ? new Date(dateInput) : dateInput;
  const estDate = date.toLocaleTimeString("en-US", {
    timeZone: "America/New_York",
    hour: "numeric",
    minute: "2-digit",
  });
  return `${estDate} (EST)`;
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

/**
 *
 * @param filePath A filepath `string` from file upload
 * @returns A `string` with special characters removed & spaces replaced with underscores.
 * @example 'Bill & Ted.jpg' => 'Bill__Ted.jpg'
 * @example 'Fl!ck3r!ng .png ' => 'Flck3rng.png'
 */
export function formatFileName(filePath: string): string {
  const extension = filePath
    .substring(filePath.lastIndexOf(".") + 1)
    .replace(/[^a-zA-Z 0-9]+/g, "")
    .replace(" ", "_");
  const name = filePath.substring(0, filePath.lastIndexOf("."));
  const newName = name.replace(/[^a-zA-Z 0-9 _-]+/g, "").replace(/\s/g, "_");
  const formattedFileName = `${newName}.${extension}`;
  return formattedFileName;
}

/**
 *
 * @param state `RequestReducer` state object
 * @param photoType `PhotoType` ("reference" | "placement")
 * @returns A formatted `string` that will be used as the file name in storage & in the Request object.
 */
export function formatPhotoPath(state: RequestReducer, photoType: PhotoType) {
  const prefix = `${state.firstName.value}-${state.lastName.value}`;
  switch (photoType) {
    case "reference":
      if (!state.referencePhoto.value) return "";
      return `${prefix}-ref-${formatFileName(state.referencePhoto.value.name)}`;
    case "placement":
      if (!state.placementPhoto.value) return "";
      return `${prefix}-place-${formatFileName(state.placementPhoto.value.name)}`;
  }
}
