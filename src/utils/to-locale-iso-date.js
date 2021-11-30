const toLocaleISODate = (date) => {
  const tzOffset = date.getTimezoneOffset() * 60000; //offset in milliseconds
  const localeISODate = new Date(date.getTime() - tzOffset)
    .toISOString()
    .split("T")[0];
  return localeISODate;
};

export default toLocaleISODate;
