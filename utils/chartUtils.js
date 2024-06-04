export function countEmotions(entries) {
  const joyEntries = entries.filter((entry) => entry.emotion === "Joy");
  const angerEntries = entries.filter((entry) => entry.emotion === "Anger");
  const fearEntries = entries.filter((entry) => entry.emotion === "Fear");
  const contemptEntries = entries.filter(
    (entry) => entry.emotion === "Contempt"
  );
  const surpriseEntries = entries.filter(
    (entry) => entry.emotion === "Surprise"
  );
  const disgustEntries = entries.filter((entry) => entry.emotion === "Disgust");
  const sadnessEntries = entries.filter((entry) => entry.emotion === "Sadness");
  const countResult = [
    { emotion: "Joy", count: joyEntries.length, foundEntries: joyEntries },
    {
      emotion: "Anger",
      count: angerEntries.length,
      foundEntries: angerEntries,
    },
    {
      emotion: "Fear",
      count: fearEntries.length,
      foundEntries: fearEntries,
    },
    {
      emotion: "Contempt",
      count: contemptEntries.length,
      foundEntries: contemptEntries,
    },
    {
      emotion: "Surprise",
      count: surpriseEntries.length,
      foundEntries: surpriseEntries,
    },
    {
      emotion: "Disgust",
      count: disgustEntries.length,
      foundEntries: disgustEntries,
    },
    {
      emotion: "Sadness",
      count: sadnessEntries.length,
      foundEntries: sadnessEntries,
    },
  ];
  return countResult;
}

export function doTensionChartData(entries) {
  function compare(a, b) {
    if (a.isoDate < b.isoDate) {
      return -1;
    }
    if (a.isoDate > b.isoDate) {
      return 1;
    }
    return 0;
  }
  const filteredData = entries.toSorted(compare);
  const lastIndex = filteredData.length - 1;
  const difference =
    (filteredData[lastIndex]?.timeStamp - filteredData[0]?.timeStamp) / 3600000;

  const tensionXValues =
    difference < 48
      ? filteredData.map((entry) => entry.timeAndDate.slice(-5))
      : filteredData.map((entry) => new Date(entry.timeStamp));
  const tensionYValues = filteredData.map((entry) => entry.tensionLevel);
  const tensionChartData = { xValues: tensionXValues, yValues: tensionYValues };
  return tensionChartData;
}

export const chartPresets = {
  tension: {
    title: "Tension Chart",
    xTitle: "time",
    yTitle: "tension",
    type: "scatter",
  },
  emotionShares: {
    title: "Emotion Shares",
    xTitle: "emotion",
    yTitle: "number of entries",
    type: "bar",
  },
  emotionIntensity: {
    title: "Average Intensities of Emotions",
    xTitle: "emotion",
    yTitle: "average intensity",
    type: "bar",
  },
};
