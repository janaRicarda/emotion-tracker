import { uid } from "uid";
import Chance from "chance";
import useLocalStorageState from "use-local-storage-state";
import { emotionData, exampleData } from "@/lib/db";
import styled from "styled-components";
import { useRouter } from "next/router";
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

const timeOptions = {
  hour: "numeric",
  hour12: false,
  minute: "numeric",
};

// generating random tension entries for a day, feed with time  in hours for currentday;
// math model: sin
function simulateTensionData(time, daysTimestamp) {
  const hours = [
    5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23,
  ];
  //variables for sinus curve
  const a = chance.integer({ min: -50, max: 50 });
  const b = chance.floating({ min: -3, max: 3 });
  const c = chance.floating({ min: 4, max: 8 });
  const d = chance.integer({ min: 30, max: 60 });

  const hourlyEntries = hours.slice(0, time - 5).map((hour) => {
    const minutes = chance.integer({ min: 0, max: 59 });
    const container = {
      id: uid(),
      timeStamp: daysTimestamp + hour * 3600000 + minutes * 60000,
      time: hour + ":" + minutes.toString().padStart(2, "0"),
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

      toBeDetailed: chance.bool({ likelihood: 15 }),
    };

    return container;
  });
  //adding date
  const tensionEntries = hourlyEntries
    .map((entry) => {
      const objectDate = new Intl.DateTimeFormat("en-US", dateOptions).format(
        new Date(daysTimestamp)
      );
      const object = {
        ...entry,
        dateOfEntry: objectDate,
        date: objectDate + ", " + entry.time,
      };
      return object;
    })
    .map((entry) =>
      entry.toBeDetailed === true
        ? (entry = { ...generateDetailedEntry(), ...entry })
        : entry
    )
    //elimination of elements according to probability
    .filter((entry) => entry.toBeDeleted !== true);
  return tensionEntries;
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
    intensity: chance.integer({ min: 50, max: 100 }),
    category: exampleData[randomEmotionNumber].stories[randomStory].category,
    trigger: exampleData[randomEmotionNumber].stories[randomStory].trigger,
    notes: exampleData[randomEmotionNumber].stories[randomStory].notes,
    isHighlighted: chance.bool({ likelihood: 75 }),
  };

  return detailedEntry;
}

function generateCompleteData(daysGoingBack) {
  const currentFullDate = new Date();
  const daysTimestamp = currentFullDate.valueOf();

  const daysToFill = [...Array(Number(daysGoingBack)).keys()];
  const tensionEntries = daysToFill.map((day) => {
    const timeStamp = daysTimestamp - (daysGoingBack - 1 - day) * 24 * 3600000;
    const array = [...simulateTensionData(23, timeStamp)];
    return array;
  });

  const completeTensionEntries = tensionEntries.flat();

  const detailedEntries = daysToFill.map((day) => {
    const object = {
      timeStamp: daysTimestamp - (daysGoingBack - 1 - day) * 24 * 3600000,
      id: uid(),
    };
    const objectDate = new Intl.DateTimeFormat("en-US", dateOptions).format(
      new Date(object.timeStamp)
    );
    const objectTime = new Intl.DateTimeFormat("en-US", timeOptions).format(
      new Date(object.timeStamp)
    );
    const objectDateAndTime = objectDate + ", " + objectTime;
    const entry = {
      ...object,
      dateOfEntry: objectDate,
      time: objectTime,
      date: objectDateAndTime,
      ...generateDetailedEntry(),
    };
    return entry;
  });
  detailedEntries.reverse();

  function compare(a, b) {
    if (a.timeStamp < b.timeStamp) {
      return -1;
    }
    if (a.timeStamp > b.timeStamp) {
      return 1;
    }
    return 0;
  }

  const completeEntries = [...detailedEntries, ...completeTensionEntries]
    .sort(compare)
    .reverse();
  console.log(completeEntries);
  return completeEntries;
}

export default function GenerateAndDisplay({
  // emotionEntries,
  onDeleteEmotionEntry,
  toggleHighlight,
}) {
  const [daysGoingBack, setDaysGoingBack] = useState(1);
  const [simulatedEntries, setSimulatedEntries] = useLocalStorageState(
    "simulatedEntries",
    {
      defaultValue: [],
    }
  );
  const [shownEntries, setShownEntries] = useState(simulatedEntries);
  const [showDetails, setShowDetails] = useState({});
  const [showConfirmMessage, setShowConfirmMessage] = useState(false);
  const [isHighlighted, setIsHighlighted] = useState(false);
  const router = useRouter();

  function handleShowHighlighted() {
    setIsHighlighted(!isHighlighted);
  }

  function handleShowDetails(id) {
    setShowDetails((prevShow) => ({
      ...prevShow,
      [id]: !prevShow[id],
    }));
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
              max={100}
              onChange={(event) => setDaysGoingBack(event.target.value)}
            />
            Days
          </label>
          <button
            type="button"
            onClick={() => {
              setSimulatedEntries(generateCompleteData(daysGoingBack));
              setShownEntries(simulatedEntries);
            }}
          >
            Generate
          </button>{" "}
        </StyledFlexWrapper>
        <StyledSubTitle>Recorded Emotions (generated)</StyledSubTitle>

        {simulatedEntries.length !== 0 && (
          <>
            <StyledHighlightButton onClick={handleShowHighlighted}>
              {isHighlighted ? "Show all Entries" : "Show highlighted Entries"}
            </StyledHighlightButton>
          </>
        )}
      </StyledPageHeader>
      <StyledSpacer></StyledSpacer>
      {simulatedEntries.length !== 0 && (
        <EmotionRecordsList
          emotionEntries={simulatedEntries}
          onDeleteEmotionEntry={onDeleteEmotionEntry}
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
