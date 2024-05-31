import {
  StyledTitle,
  StyledFlexColumnWrapper,
  StyledStandardLink,
  StyledButton,
  StyledWrapper,
} from "@/SharedStyledComponents";
import styled, { css } from "styled-components";
import FilterEmotionEntries from "@/components/FilterEmotionEntries";
import { useState, useCallback, useEffect, useRef } from "react";
import HeartOutlineIcon from "../public/heart-outline.svg";
import CalendarIcon from "/public/calendar.svg";
import EmotionRecordsList from "../components/EmotionRecordsList";
import SmallFilterPanel from "@/components/SmallFilterPanel";

// used for all transitions
const transition = css`
  transition: all 300ms ease;
`;
import Loader from "@/components/Loader";
import dynamic from "next/dynamic";
import ErrorMessage from "@/components/ErrorMessage";

const EmotionChart = dynamic(() => import("../components/EmotionChart"), {
  ssr: false,
  loading: () => <Loader itemText="... loading" />,
});

const GridWrapper = styled.section`
  box-shadow: ${({ $show }) => ($show ? "var(--box-shadow-filter)" : null)};
  position: fixed;
  padding: ${({ $show }) => ($show ? "1rem" : "0")};
  border-radius: 1rem;
  top: 200px;
  max-width: 500px;
  display: grid;
  grid-template-rows: ${({ $show }) => ($show ? "1fr" : "0fr")};
  ${transition}
  background-color: var(--section-background-contrast);
  //color: var(--text-on-bright);
  z-index: 2;
`;

const ControllOverflow = styled.div`
  overflow: hidden;
`;

const ControlPadding = styled.div`
  margin-top: 5rem;
  /* z-index: -1; */
`;

const StyledHeading = styled(StyledTitle)`
  width: 100%;
  padding: 1rem 0;
  position: fixed;
  top: ${({ $isScrollDown }) => ($isScrollDown ? "65px" : "110px")};
  ${transition}
  background-color: var(--main-bright);
  z-index: 1;
`;

const Background = styled.div`
  inset: 0;
  position: absolute;
  background: transparent;
  display: ${({ $show }) => ($show ? "block" : "none")};
  z-index: 2;
`;
const AnimatedPanel = styled.div`
  width: 90vw;
  margin: 0.5rem;
  border-top: 1px solid black;
  background-color: var(--main-bright);
  position: fixed;
  top: ${({ $isScrollDown }) => ($isScrollDown ? "121px" : "166px")};
  ${transition}
  z-index: 1;
`;

const StyledTextMessage = styled.article`
  margin-top: 8rem;
  text-align: center;
  line-height: 3;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledLink = styled(StyledStandardLink)`
  padding: 0.5rem;
  background-color: var(--button-background);
  color: var(--contrast-text);
`;

const StyledGraphButton = styled(StyledButton)`
  width: fit-content;
  padding: 0.5rem;
  border-style: none;
`;

const StyledHeartSymbol = styled(HeartOutlineIcon)`
  width: 1.4rem;
  display: inline;
  position: relative;
  fill: var(--main-dark);
  top: 5px;
`;

const StyledCalendarIcon = styled(CalendarIcon)`
  width: 1.5rem;
  display: inline;
  vertical-align: bottom;
  fill: var(--main-dark);
`;

const StyledDateIndicator = styled.article`
  margin: 2rem auto 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledParagraph = styled.p`
  text-align: center;
`;

const StyledDateSpan = styled.span`
  background-color: var(--button-background);
  border-radius: 50px;
  padding: 0 0.5rem;
`;

const StyledButtonWrapper = styled(StyledWrapper)`
  width: 30vw;
  align-items: center;
`;

export default function EmotionRecords({
  emotionEntries,
  onDeleteEmotionEntry,
  toggleHighlight,
  handleToolTip,
  isScrollDown,
  theme,
}) {
  const [searchTerm, setSearchTerm] = useState();
  const [filteredEntries, setFilteredEntries] = useState(emotionEntries);
  const [shownEntries, setShownEntries] = useState(emotionEntries);
  const [selectedTime, setSelectedTime] = useState();
  const [buttonState, setButtonState] = useState({
    todayButton: true,
    name: "todayButton",
    label: "Today",
    singleComparison: true,
    daysAgo: 0,
  });

  const [chartState, setChartState] = useState({
    chartIsShown: true,
    xTitle: "time",
    yTitle: "tension",
    title: "Tension Chart",
    type: "scatter",
    emoCount: [],
  });

  const [showFilter, setShowFilter] = useState(false);

  useEffect(() => {
    handleToolTip({
      text: "Navigate through your emotion records list, a comprehensive compilation of all your added emotion entries. You can easily search for specific entries, edit or delete them, and even highlight important moments. Also, you can search through your entries or filter them by the following options: today, last week, or last month.",
    });
  }, []);

  useEffect(() => {
    setShowFilter(false);
  }, [buttonState]);

  const handleSetFilterEntries = useCallback((filteredObject) => {
    setFilteredEntries(filteredObject);
  }, []);

  const handleSetShownEntries = useCallback((entriesObjectAfterSearch) => {
    setShownEntries(entriesObjectAfterSearch);
  }, []);

  function handleSetButtonState(buttonObject) {
    setButtonState(buttonObject);
  }

  function handleSetSelectedTime(time) {
    setSelectedTime(time);
  }

  function handleSearch(input) {
    setSearchTerm(input);
  }

  function getFormattedDate(selectedDate) {
    const date = new Intl.DateTimeFormat(`de`, {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(selectedDate);

    return date;
  }

  function DisplayDate() {
    return (
      <StyledParagraph aria-label="Selected Date">
        <StyledDateSpan>
          {getFormattedDate(selectedTime.from)}
          {selectedTime.to &&
            selectedTime.from.toString() !== selectedTime.to.toString() &&
            " - " + getFormattedDate(selectedTime.to)}
        </StyledDateSpan>
      </StyledParagraph>
    );
  }

  useEffect(() => {
    function handleEscapeKey(event) {
      if (event.code === "Escape") {
        setShowFilter(false);
      }
    }
    document.addEventListener("keydown", handleEscapeKey);
  });

  function closeOnKey(event) {
    if (event.code === "Enter") {
      setShowFilter(false);
    }
  }

  //logic for Graph

  function compare(a, b) {
    if (a.isoDate < b.isoDate) {
      return -1;
    }
    if (a.isoDate > b.isoDate) {
      return 1;
    }
    return 0;
  }
  const filteredData = shownEntries.toSorted(compare);
  const lastIndex = filteredData.length - 1;
  const difference =
    (filteredData[lastIndex]?.timeStamp - filteredData[0]?.timeStamp) / 3600000;

  const xValues =
    difference < 48
      ? filteredData.map((entry) => entry.timeAndDate.slice(-5))
      : filteredData.map((entry) => new Date(entry.timeStamp));
  const yValues = filteredData.map((entry) =>
    chartState.yTitle === "tension" ? entry.tensionLevel : entry?.intensity
  );

  function countEmotions(entries) {
    const joyEntries = entries.filter((entry) => entry.emotion === "Joy");
    const angerEntries = entries.filter((entry) => entry.emotion === "Anger");
    const fearEntries = entries.filter((entry) => entry.emotion === "Fear");
    const contemptEntries = entries.filter(
      (entry) => entry.emotion === "Contempt"
    );
    const surpriseEntries = entries.filter(
      (entry) => entry.emotion === "Surprise"
    );
    const disgustEntries = entries.filter(
      (entry) => entry.emotion === "Disgust"
    );
    const sadnessEntries = entries.filter(
      (entry) => entry.emotion === "Sadness"
    );
    const result = [
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
    return result;
  }

  function handleChart() {
    setChartState({
      ...chartState,
      chartIsShown: !chartState.chartIsShown,
      xValues: xValues,
    });
  }

  return (
    <>
      <Background $show={showFilter} onClick={() => setShowFilter(false)} />
      <StyledHeading $isScrollDown={isScrollDown}>
        Recorded Emotions
      </StyledHeading>
      <GridWrapper onKeyDown={closeOnKey} $show={showFilter}>
        <ControllOverflow>
          <FilterEmotionEntries
            emotionEntries={emotionEntries}
            filteredEntries={filteredEntries}
            buttonState={buttonState}
            searchTerm={searchTerm}
            selectedTime={selectedTime}
            onSearch={handleSearch}
            changeShownEntries={handleSetShownEntries}
            changeButtonState={handleSetButtonState}
            changeFilterEntries={handleSetFilterEntries}
            changeSelectedTime={handleSetSelectedTime}
            DisplayDate={DisplayDate}
          />
        </ControllOverflow>
      </GridWrapper>
      <AnimatedPanel
        onClick={() => setShowFilter(!showFilter)}
        $isScrollDown={isScrollDown}
      >
        <SmallFilterPanel
          buttonState={buttonState}
          searchTerm={searchTerm}
          DisplayDate={DisplayDate}
          selectedTime={selectedTime}
        />
      </AnimatedPanel>
      {xValues.length === 0 ? (
        <ErrorMessage itemText="No Data for Graph" />
      ) : chartState.chartIsShown === true ? (
        <EmotionChart
          theme={theme}
          type={chartState.type}
          xValues={xValues}
          yValues={yValues}
          xTitle={chartState.xTitle}
          yTitle={chartState.yTitle}
          title={chartState.title}
        />
      ) : null}

      <StyledButtonWrapper>
        <StyledGraphButton type="button" onClick={handleChart}>
          {chartState.chartIsShown === true ? "Hide chart" : "Show chart"}
        </StyledGraphButton>
        <StyledGraphButton
          type="button"
          onClick={() =>
            setChartState({
              ...chartState,
              type:
                chartState.type === "scatter"
                  ? "bar"
                  : chartState.type === "bar"
                  ? "scatter"
                  : "scatter",
            })
          }
        >
          Switch Type
        </StyledGraphButton>

        <StyledGraphButton
          type="button"
          onClick={() =>
            setChartState({
              ...chartState,
              yTitle: "tension",
              Title: "Tension Chart",
            })
          }
        >
          Tension
        </StyledGraphButton>

        <StyledGraphButton
          type="button"
          onClick={() =>
            setChartState({
              ...chartState,
              yTitle: "intensity",
              Title: "Intensity Chart",
            })
          }
        >
          Intensity
        </StyledGraphButton>
        <StyledGraphButton
          type="button"
          onClick={() => {
            const newEmocount = countEmotions(shownEntries);
            setChartState({ ...chartState, emoCount: newEmocount });
            console.log(chartState);
          }}
        >
          Count emotions
        </StyledGraphButton>
      </StyledButtonWrapper>
      <ul>
        {chartState.emoCount.map((element) => (
          <li key={element.emotion}>
            {element.emotion}: {element.foundEntries.length}
          </li>
        ))}
      </ul>
      <EmotionChart
        theme={theme}
        type="bar"
        title="Test Emotion chart"
        xValues={chartState.emoCount.map((element) => element.emotion)}
        yValues={chartState.emoCount.map((element) => element.count)}
        xTitle="emotions"
        yTitle="count"
      />
      {buttonState.datePicker ? (
        selectedTime ? (
          <DisplayDate textAlign="center" />
        ) : (
          <StyledDateIndicator>
            Click the calendar <StyledCalendarIcon /> and select a date
          </StyledDateIndicator>
        )
      ) : null}
      {shownEntries.length === 0 &&
        (filteredEntries.length === 0 ? (
          buttonState.highlightedButton ? (
            <StyledTextMessage>
              You haven&apos;t highlighted any Entries yet. Click the{" "}
              <StyledHeartSymbol /> on a Entry to highlight it.
            </StyledTextMessage>
          ) : buttonState.todayButton ? (
            <StyledTextMessage>
              You haven&apos;t made any Entries today.<br></br>
              <StyledLink href="./">add Entry &rarr;</StyledLink>
            </StyledTextMessage>
          ) : (
            <StyledTextMessage>sorry, nothing found</StyledTextMessage>
          )
        ) : (
          <StyledTextMessage>sorry, nothing found</StyledTextMessage>
        ))}

      {shownEntries.length !== 0 && (
        <ControlPadding>
          <EmotionRecordsList
            onDeleteEmotionEntry={onDeleteEmotionEntry}
            toggleHighlight={toggleHighlight}
            shownEntries={shownEntries}
            filteredEntries={filteredEntries}
          />
        </ControlPadding>
      )}
    </>
  );
}
