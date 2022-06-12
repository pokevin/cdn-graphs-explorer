const GIGABYTE = 1073741824;

export const toGigaByte = (bytes: number) => bytes / GIGABYTE;

export const shortDateFormatter = new Intl.DateTimeFormat("en-US", {
  day: "2-digit",
  month: "short",
}).format;

export const fullDateFormatter = new Intl.DateTimeFormat("en-US", {
  weekday: "long",
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  timeZoneName: "shortOffset",
}).format;
