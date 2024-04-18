export default function getCurrentTimeAndDate() {
  const fullDate = new Date();

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    hour12: false,
    minute: "numeric",
  };

  const fullFormattedDateAndTime = new Intl.DateTimeFormat(
    "en-US",
    options
  ).format(fullDate);
  return fullFormattedDateAndTime.replace(" at", ", ");
}
