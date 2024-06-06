import { emotionData } from "@/lib/db";

export const chartPresets = {
  tension: {
    title: "Tension Chart",
    xTitle: "time",
    yTitle: "tension",
    scatter: true,
  },
  emotionShares: {
    title: "Emotion Shares",
    xTitle: "emotion",
    yTitle: "percentage",
    scatter: false,
  },
  emotionIntensity: {
    title: "Average Intensities of Emotions",
    xTitle: "emotion",
    yTitle: "average intensity",
    scatter: false,
  },
};

export function countEmotions(entries) {
  const emotionsToCount = emotionData.map((element) => element.name);
  function add(a, b) {
    return Number(a) + Number(b);
  }
  function getAverageValue(entries) {
    const averageValue =
      entries.length === 0
        ? 0
        : Math.round(
            entries.map((entry) => entry.intensity).reduce(add, 0) /
              entries.length
          );
    return averageValue;
  }
  const preResults = emotionsToCount.map((element) => {
    const foundEntries = entries.filter((entry) => entry.emotion === element);
    const object = {
      emotion: element,
      count: foundEntries.length,
      averageIntensity: getAverageValue(foundEntries),
      foundEntries,
    };
    return object;
  });
  const entriesSum = preResults.map((result) => result.count).reduce(add, 0);
  const countResults = preResults.map((result) => {
    const percentage = Math.round((result.count / entriesSum) * 100);
    const object = {
      ...result,
      percentage,
    };
    return object;
  });
  return countResults;
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
