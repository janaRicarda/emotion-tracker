import { uid } from "uid";
import Chance from "chance";
import styled from "styled-components";
import { exampleData } from "@/lib/db";
import {
  StyledButton,
  StyledFlexColumnWrapper,
} from "@/SharedStyledComponents";
import { useState } from "react";

const StyledFlexWrapper = styled(StyledFlexColumnWrapper)`
  flex-direction: row;
  gap: 1rem;
  margin: 1rem;
`;

const StyledGeneratorTitle = styled.h1`
  font-weight: 600;
`;

const StyledDevButton = styled(StyledButton)`
  width: fit-content;
  margin: 0;
  padding: 0.3rem;
`;

const StyledRedButton = styled(StyledDevButton)`
  background-color: red;
`;

const StyledSubTitle = styled.h2`
  padding: 0.2rem;
  margin: 0.2rem;
  font-size: 1.3rem;
  font-weight: 600;
`;

const StyledNote = styled.p`
  font-size: 0.8rem;
  padding: 0.8rem;
`;

const StyledSmallMessage = styled(StyledNote)`
  font-weight: 500;
  text-align: center;

  color: red;
  width: 90vw;
  border-radius: 6px;
  background-color: var(--main-bright);
  border: 1px solid var(--main-dark);
  position: fixed;
  right: calc(50% - 45vw);
  top: 15rem;
  z-index: 2;
`;

const chance = new Chance();

const dateOptions = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};

// generating random emotion entries for a day, takes endhour and daysTimestamp as paramaters;
// math model: sin
function generateDaysEntries(endHour, daysTimestamp) {
  const fullDate = new Date(daysTimestamp);

  const date = new Intl.DateTimeFormat("en-US", dateOptions).format(fullDate);

  //variables for sinus curve
  const a = chance.integer({ min: -50, max: 50 });
  const b = chance.floating({ min: -3, max: 3 });
  const c = chance.floating({ min: 4, max: 8 });
  const d = chance.integer({ min: 30, max: 60 });
  //building array for sensible hours
  const basicArray = [...Array(endHour + 1).keys()];
  const hoursToFill = basicArray.slice(5);

  const hourlyEntries = hoursToFill.map((hour) => {
    const minutes = chance.integer({ min: 0, max: 59 });
    const time = hour + ":" + minutes.toString().padStart(2, "0");

    const object = {
      id: uid(),
      date,
      time,
      timeAndDate: date + ", " + time,
      timeStamp: daysTimestamp + hour * 3600000 + minutes * 60000,
      tensionLevel: Math.max(
        chance.integer({ min: 0, max: 15 }),
        Math.min(
          chance.integer({ min: 85, max: 100 }),
          Math.round(
            a * Math.sin(hour / c - b) +
              d +
              chance.integer({ min: -10, max: 10 })
          )
        )
      ),
      toBeDeleted:
        hour < 7
          ? chance.bool({ likelihood: 20 })
          : chance.bool({ likelihood: 5 }),

      toBeDetailed: chance.bool({ likelihood: 20 }),
    };

    return object;
  });

  const daysEntries = hourlyEntries
    //elimination of elements according to probability
    .filter((entry) => entry.toBeDeleted !== true)
    //adding isoDatestring for Filters and add details to some entries
    .map((entry) => {
      const isoDate = new Date(entry.timeStamp).toISOString();
      entry.toBeDetailed === true
        ? (entry = { ...generateDetailedEntry(), ...entry })
        : entry;
      const object = { ...entry, isoDate };

      return object;
    });

  return daysEntries;
}

function generateDetailedEntry() {
  const id = uid();
  const randomEmotionNumber = chance.integer({ min: 0, max: 6 });
  const randomStory = chance.integer({ min: 0, max: 2 });
  const detailedEntry = {
    id,
    tensionLevel:
      exampleData[randomEmotionNumber].stories[randomStory].tensionLevel,
    emotion: exampleData[randomEmotionNumber].emotion,
    intensity: chance.integer({ min: 40, max: 100 }),
    category: exampleData[randomEmotionNumber].stories[randomStory].category,
    trigger: exampleData[randomEmotionNumber].stories[randomStory].trigger,
    notes: exampleData[randomEmotionNumber].stories[randomStory].notes,
    isHighlighted: chance.bool({ likelihood: 90 }),
  };

  return detailedEntry;
}

function generateCompleteData(daysGoingBack) {
  const currentFullDate = new Date();
  currentFullDate.setHours(0);
  const daysTimestamp = currentFullDate.valueOf();

  const daysToFill = [...Array(Number(daysGoingBack)).keys()];
  const dailyEntries = daysToFill.flatMap((day) => {
    const timeStamp = daysTimestamp - (daysGoingBack - 1 - day) * 24 * 3600000;
    const array = [...generateDaysEntries(23, timeStamp)];
    return array;
  });

  function compare(a, b) {
    if (a.timeStamp < b.timeStamp) {
      return -1;
    }
    if (a.timeStamp > b.timeStamp) {
      return 1;
    }
    return 0;
  }

  const completeSortedEntries = dailyEntries.sort(compare).reverse();
  return completeSortedEntries;
}

export default function DataGenerator({
  shownEntries,
  onGenerate,
  onDeleteAll,
  onReplaceUserData,
  onRestore,
}) {
  const [daysGoingBack, setDaysGoingBack] = useState(1);
  const [smallMessage, setSmallMessage] = useState(null);

  setTimeout(() => {
    setSmallMessage(null);
  }, 3500);

  function handleGenerate() {
    const newData = generateCompleteData(daysGoingBack);
    onGenerate(newData);

    const dayZ = daysGoingBack === 1 ? "day" : "days";
    setSmallMessage(`Generated data for ${daysGoingBack} ${dayZ}`);
  }

  function handleDeleteAll() {
    onDeleteAll();
    setSmallMessage("Deleted all user Data. No Backup, no pity.");
  }

  function handleReplaceUserData(generatedData) {
    onReplaceUserData(generatedData);
    setSmallMessage(
      "Replaced user data with randomly generated data. You can restore the user data with 'Get backup'."
    );
  }

  function handleRestore() {
    onRestore();
    setSmallMessage("Restored previous backup.");
  }

  return (
    <>
      <StyledGeneratorTitle>Data Generator</StyledGeneratorTitle>

      <StyledFlexWrapper>
        <p>Generate data for</p>
        <label htmlFor="daysGoingBack">
          <input
            type="number"
            id="daysGoingBack"
            value={daysGoingBack}
            min={1}
            max={150}
            onChange={(event) => setDaysGoingBack(event.target.value)}
          />
          Days
        </label>
        <StyledDevButton type="button" onClick={handleGenerate}>
          Generate
        </StyledDevButton>
        <StyledDevButton
          type="button"
          onClick={() => handleReplaceUserData(shownEntries)}
        >
          Replace userdata
        </StyledDevButton>
        <StyledDevButton type="button" onClick={handleRestore}>
          Get backup
        </StyledDevButton>
        <StyledRedButton type="button" onClick={handleDeleteAll}>
          Reset
        </StyledRedButton>
      </StyledFlexWrapper>
      <StyledNote>
        Note: Delete and edit will only work if you replace userdata with
        generated data!
      </StyledNote>
      {smallMessage && <StyledSmallMessage>{smallMessage}</StyledSmallMessage>}
      <StyledSubTitle>Recorded Emotions (generated)</StyledSubTitle>
    </>
  );
}
export { generateCompleteData };
