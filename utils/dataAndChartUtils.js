import { emotionData } from "@/lib/db";
import getCurrentTimeAndDate from "./getCurrentTimeAndDate";

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

export function compareLowToHigh(a, b) {
  if (a < b) {
    return -1;
  }
  if (a > b) {
    return 1;
  }
  return 0;
}

export function compareHightToLow(a, b) {
  if (a.timeStamp < b.timeStamp) {
    return 1;
  }
  if (a.timeStamp > b.timeStamp) {
    return -1;
  }
  return 0;
}

//dashboard
export function getNewestEmotion(entries) {
  const sevenEmotions = emotionData.map((element) => element.name);
  const newestEmotionEntry = entries.find(
    (entry) => sevenEmotions.includes(entry.emotion) === true
  ) || {
    emotion: "Joy",
  };
  const { emotion } = newestEmotionEntry;
  const slug = emotionData
    .filter((element) => element.name === emotion)
    .map((element) => element.slug);
  const newestEmotionObject = {
    ...newestEmotionEntry,
    slug,
  };
  return newestEmotionObject;
}

export function getTimeSinceLastEntry(entries) {
  const lastEntryTimeStamp = entries[0].timeStamp;
  const timeStampNow = Date.now();
  const minutesSinceLastEntry = Math.abs(
    Math.round((timeStampNow - lastEntryTimeStamp) / 60000)
  );
  const hours = Math.floor(minutesSinceLastEntry / 60);
  const minutesPart = (minutesSinceLastEntry % 60).toString().padStart(2, "0");
  const timeSinceLastEntry = `${hours.toString()}:${minutesPart}`;
  return timeSinceLastEntry;
}

export function getAveragePerDay(entries) {
  const timeDifference =
    Number(entries[0]?.timeStamp) -
    Number(entries[entries.length - 1]?.timeStamp);
  const allDays = timeDifference <= 0 ? 1 : timeDifference / (24 * 3600000);
  const average = entries.length === 0 ? 0 : entries.length / allDays;
  const averageString = average.toFixed(1);
  return averageString;
}

//chart
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

export function calculateTensionChartData(entries, locale) {
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
      ? filteredData.map((entry) => {
          const dateAndTime = getCurrentTimeAndDate(locale, entry.timeStamp);
          return dateAndTime.slice(-5);
        })
      : filteredData.map((entry) => {
          const dateAndTime = getCurrentTimeAndDate(
            locale,
            entry.timeStamp,
            "chart"
          );
          return dateAndTime;
        });
  const tensionYValues = filteredData.map((entry) => entry.tensionLevel);
  const tensionChartData = { xValues: tensionXValues, yValues: tensionYValues };
  return tensionChartData;
}

//helper functions
export function getFilteredEntriesV2(chosenDate, entries) {
  const filteredEntries = entries.filter((entry) =>
    entry.isoDate.slice(0, 10) === chosenDate.slice(0, 10) ? entry : null
  );
  return filteredEntries;
}
