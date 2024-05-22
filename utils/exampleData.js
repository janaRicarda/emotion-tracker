// Start date: 3 months ago from today
export default function generateExampleData() {
  let exampleData = [];
  const startDate = new Date();
  startDate.setMonth(startDate.getMonth() - 3);

  // Generate 90 entries, one for each day
  for (let i = 0; i < 90; i++) {
    const currentDate = new Date(startDate);
    currentDate.setDate(currentDate.getDate() + i);

    const dateString = currentDate.toLocaleString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: false,
    });

    const isoDateString = currentDate.toISOString();

    const entry = {
      timeAndDate: dateString.replace(" at", ","),
      id: generateRandomId(),
      isoDate: isoDateString,
      tensionLevel: getRandomTensionLevel(),
    };

    exampleData.push(entry);
  }

  function generateRandomId() {
    return Math.random().toString(36).substring(2, 12);
  }

  function getRandomTensionLevel() {
    // Generate a random tension level between 0 and 100
    return Math.floor(Math.random() * 100).toString();
  }

  const sortedExampleDate = exampleData.toSorted((a, b) => {
    if (a.isoDate > b.isoDate) {
      return -1;
    }
    if (a.isoDate < b.isoDate) {
      return 1;
    }
    return 0;
  });

  return sortedExampleDate;
}
