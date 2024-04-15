const weekDay = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const month = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function getCurrentTimeAndDate() {
  const fullDate = new Date();
  const currentTimeAndDate =
    weekDay[fullDate.getDay()] +
    ", " +
    fullDate.getDate() +
    ". " +
    month[fullDate.getMonth()] +
    " " +
    fullDate.getFullYear() +
    ", " +
    fullDate.getHours() +
    ":" +
    fullDate.getMinutes();
  return currentTimeAndDate;
}
