const shortWeekNames = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];

const toValidDate = (date) => {
  date = date instanceof Date ? date : new Date(date);
  if (isNaN(date)) throw new Error("Not a valid Date!");
  return date;
};

const toDayArray = (pattern) =>
  pattern.map((day) => shortWeekNames.indexOf(day.toLowerCase()));

const findDate = (date, pattern, type) => {
  if (!type || !["first", "last"].includes(type))
    throw new Error('[findSession] type should be one of "first" or "last"');
  const days = toDayArray(pattern);
  date = toValidDate(date);
  while (!days.includes(date.getDay())) {
    const day = date.getTime() + (type === "first" ? 86400000 : -86400000);
    date = new Date(day);
  }
  return date;
};

const findDesiredDate = (startDate, endDate, pattern) => {
  const date = new Date();
  const firstSession = findDate(startDate, pattern, "first");
  const lastSession = findDate(endDate, pattern, "last");
  if (date <= firstSession) return firstSession;
  if (date >= lastSession) return lastSession;
  return findDate(date, pattern, "last");
};

export default findDesiredDate;
