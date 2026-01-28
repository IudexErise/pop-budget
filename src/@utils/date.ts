const DAY_FORMATTER = new Intl.DateTimeFormat("en-US", {
  day: "2-digit",
  month: "long",
  year: "numeric",
});

export const formatDay = (timestamp: number) =>
  DAY_FORMATTER.format(new Date(timestamp));
