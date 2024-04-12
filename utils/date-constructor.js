const fullDate = new Date();

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

const date =
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

export { date };
