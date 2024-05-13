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
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 100px;
  z-index: 1;
`;

const StyledEmotionRecordsTitle = styled.h1`
  font-weight: 600;
`;

const StyledHighlightButton = styled(StyledButton)`
  font-size: 1rem;
  width: fit-content;
  margin: 0;
  padding: 0.3rem;
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
    };

    return container;
  });
  //pushing date
  //elimination of elements according to probability
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
    .filter((entry) => entry.toBeDeleted !== true);
  return tensionEntries;
}

function generateDetailedEntry() {
  const id = uid();
  const randomEmotionNumber = chance.integer({ min: 0, max: 6 });
  const randomStory = chance.integer({ min: 0, max: 2 });
  const detailedEntry = {
    id,
    tensionLevel: chance.integer({ min: 0, max: 100 }),
    emotion: exampleData[randomEmotionNumber].emotion,
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
    <section>
      <h1>Data Generator</h1>
      <p>Timespan for data </p>
      <p>
        <label htmlFor="daysback">
          Days
          <input
            type="number"
            id="daysGoingback"
            value={daysGoingBack}
            max={100}
            onChange={(event) => setDaysGoingBack(event.target.value)}
          />
        </label>
      </p>

      <button
        type="button"
        onClick={() => setSimulatedEntries(generateCompleteData(daysGoingBack))}
      >
        Generate
      </button>

      <StyledFlexColumnWrapper>
        <StyledPageHeader>
          <StyledEmotionRecordsTitle>
            Recorded Emotions (generated)
          </StyledEmotionRecordsTitle>

          {simulatedEntries.length !== 0 && (
            <>
              {/* <SearchBar onSearch={handleSearch} /> */}

              <StyledHighlightButton onClick={handleShowHighlighted}>
                {isHighlighted
                  ? "Show all Entries"
                  : "Show highlighted Entries"}
              </StyledHighlightButton>
            </>
          )}
        </StyledPageHeader>

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
    </section>
  );
}
