export default function getCurrentTimeAndDate(locale, date) {
  const fullDate = date || new Date();

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    hour12: false,
    minute: "numeric",
  };

  const localOption = locale === "en" ? "en-US" : "de-DE";
  const localAtWord = locale === "en" ? " at" : " um";
  const fullFormattedDateAndTime = new Intl.DateTimeFormat(
    localOption,
    options
  ).format(fullDate);
  return fullFormattedDateAndTime.replace(localAtWord, ", ");
}
