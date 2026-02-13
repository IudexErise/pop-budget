const DAY_FORMATTER = new Intl.DateTimeFormat("en-GB", {
  day: "2-digit",
  month: "short",
  year: "numeric",
  hour: "numeric",
  minute: "numeric",
});

export const formatDay = (timestamp: number) =>
  DAY_FORMATTER.format(new Date(timestamp));
