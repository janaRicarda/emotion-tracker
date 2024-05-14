import { uid } from "uid";
import Chance from "chance";
import useLocalStorageState from "use-local-storage-state";
import { exampleData } from "@/lib/db";
import styled from "styled-components";
import { useState } from "react";
import EmotionRecordsList from "@/components/EmotionRecordsList";
import {
  StyledButton,
  StyledFlexColumnWrapper,
} from "@/SharedStyledComponents";

const StyledPageHeader = styled.section`
  width: 100%;
  background-color: var(--main-bright);
  padding: 2rem 0.5rem 0.5rem;
  margin: 1rem 1rem 8rem;
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 80px;
  height: fit-content;
  z-index: 1;
`;

const StyledFlexWrapper = styled(StyledFlexColumnWrapper)`
  flex-direction: row;
  gap: 1rem;
  margin: 1rem;
`;

const StyledEmotionRecordsTitle = styled.h1`
  font-weight: 600;
`;

const StyledSpacer = styled.p`
  margin: 4rem;
`;

const StyledHighlightButton = styled(StyledButton)`
  font-size: 1rem;
  width: fit-content;
  margin: 0;
  padding: 0.3rem;
`;

const StyledDevButton = styled(StyledButton)`
  font-size: 1rem;
  width: fit-content;
  margin: 0;
  padding: 0.3rem;
`;

const StyledRedButton = styled(StyledDevButton)`
  background-color: red;
`;

const StyledSubTitle = styled.h2`
  padding: 0.5rem;
  margin: 0.5rem;
  font-size: 1.3rem;
  font-weight: 600;
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
function generateDaysTensionEntries(endHour, daysTimestamp) {
  const fullDate = new Date(daysTimestamp);

  const date = new Intl.DateTimeFormat("en-US", dateOptions).format(fullDate);

  //variables for sinus curve
  const a = chance.integer({ min: -50, max: 50 });
  const b = chance.floating({ min: -3, max: 3 });
  const c = chance.floating({ min: 4, max: 8 });
  const d = chance.integer({ min: 30, max: 60 });

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

  const daysTensionEntries = hourlyEntries
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
  console.log(daysTensionEntries);
  return daysTensionEntries;
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
  const daysTimestamp = currentFullDate.valueOf();

  const daysToFill = [...Array(Number(daysGoingBack)).keys()];
  const tensionEntries = daysToFill.map((day) => {
    const timeStamp = daysTimestamp - (daysGoingBack - 1 - day) * 24 * 3600000;
    const array = [...generateDaysTensionEntries(23, timeStamp)];
    return array;
  });

  const unsortedEntries = tensionEntries.flat();

  function compare(a, b) {
    if (a.timeStamp < b.timeStamp) {
      return -1;
    }
    if (a.timeStamp > b.timeStamp) {
      return 1;
    }
    return 0;
  }

  const completeEntries = unsortedEntries.sort(compare).reverse();
  console.log(completeEntries);
  return completeEntries;
}

export default function GenerateAndDisplay({
  toggleHighlight,
  setEmotionEntries,
  emotionEntries,
}) {
  const [daysGoingBack, setDaysGoingBack] = useState(1);
  const [backupEntries, setBackupEntries] = useLocalStorageState(
    "backupEntries",
    {
      defaultValue: [],
    }
  );
  const [shownEntries, setShownEntries] = useState(
    generateCompleteData(daysGoingBack)
  );
  const [showDetails, setShowDetails] = useState({});
  const [showConfirmMessage, setShowConfirmMessage] = useState(false);
  const [isHighlighted, setIsHighlighted] = useState(false);

  function handleShowHighlighted() {
    setIsHighlighted(!isHighlighted);
  }

  function handleShowDetails(id) {
    setShowDetails((prevShow) => ({
      ...prevShow,
      [id]: !prevShow[id],
    }));
  }

  function nullishFunction() {
    //Yeah, it does nothing!
  }

  return (
    <StyledFlexColumnWrapper>
      <StyledPageHeader>
        <StyledEmotionRecordsTitle>Data Generator</StyledEmotionRecordsTitle>

        <StyledFlexWrapper>
          <p>Generate data for</p>
          <label htmlFor="daysback">
            <input
              type="number"
              id="daysGoingback"
              value={daysGoingBack}
              min={1}
              max={150}
              onChange={(event) => setDaysGoingBack(event.target.value)}
            />
            Days
          </label>
          <StyledDevButton
            type="button"
            onClick={() => setShownEntries(generateCompleteData(daysGoingBack))}
          >
            Generate
          </StyledDevButton>
          <StyledDevButton
            type="button"
            onClick={() => {
              setBackupEntries(emotionEntries);
              setEmotionEntries(generateCompleteData(daysGoingBack));
            }}
          >
            Replace userdata
          </StyledDevButton>
          <StyledDevButton
            type="button"
            onClick={() => setEmotionEntries(backupEntries)}
          >
            Get backup
          </StyledDevButton>
          <StyledRedButton
            type="button"
            onClick={() => {
              setEmotionEntries([]);
              setShownEntries([]);
            }}
          >
            Reset
          </StyledRedButton>
        </StyledFlexWrapper>
        <StyledSubTitle>Recorded Emotions (generated)</StyledSubTitle>

        {shownEntries.length !== 0 && (
          <>
            <StyledHighlightButton onClick={handleShowHighlighted}>
              {isHighlighted ? "Show all Entries" : "Show highlighted Entries"}
            </StyledHighlightButton>
          </>
        )}
      </StyledPageHeader>
      <StyledSpacer></StyledSpacer>
      {shownEntries.length !== 0 && (
        <EmotionRecordsList
          emotionEntries={shownEntries}
          onDeleteEmotionEntry={nullishFunction}
          shownEntries={
            isHighlighted
              ? shownEntries.filter((entry) => entry.isHighlighted)
              : shownEntries
          }
          toggleHighlight={toggleHighlight}
          isHighlighted={isHighlighted}
        />
      )}
    </StyledFlexColumnWrapper>
  );
}
