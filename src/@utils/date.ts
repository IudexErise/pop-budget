const DAY_FORMATTER = new Intl.DateTimeFormat("en-GB", {
  day: "2-digit",
  month: "short",
  year: "numeric",
});

const DAY_FORMATTER_WITH_TIME = new Intl.DateTimeFormat("en-GB", {
  day: "2-digit",
  month: "short",
  year: "numeric",
  hour: "numeric",
  minute: "numeric",
});

export const formatDay = (timestamp: number) =>
  DAY_FORMATTER.format(new Date(timestamp));

export const formatDayWithTime = (timestamp: number) =>
  DAY_FORMATTER_WITH_TIME.format(new Date(timestamp));
