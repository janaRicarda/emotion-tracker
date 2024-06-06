import { StyledTitle, StyledStandardLink } from "@/SharedStyledComponents";
import styled, { css } from "styled-components";
import FilterEmotionEntries from "@/components/FilterEmotionEntries";
import ToggleSwitch from "@/components/ToggleSwitch";
import { useState, useCallback, useEffect, useRef } from "react";
import HeartOutlineIcon from "../public/icons/heart-outline.svg";
import CalendarIcon from "/public/icons/calendar.svg";
import EmotionRecordsList from "../components/EmotionRecordsList";
import SmallFilterPanel from "@/components/SmallFilterPanel";
import ChartContainer from "@/components/ChartContainer";
import Icon from "@mdi/react";
import { mdiChartLine, mdiFormatListBulleted } from "@mdi/js";
import { breakpoints } from "@/utils/breakpoints";
import Head from "next/head";

// used for all transitions
const transition = css`
  transition: all 300ms ease;
`;

const GridWrapper = styled.section`
  box-shadow: ${({ $show }) => ($show ? "var(--box-shadow-filter)" : null)};
  position: fixed;
  padding: ${({ $show }) => ($show ? "1rem" : "0")};
  border-radius: 1rem;
  top: 200px;
  margin-top: 1rem;
  max-width: 500px;
  display: grid;
  grid-template-rows: ${({ $show }) => ($show ? "1fr" : "0fr")};
  ${transition}
  background-color: var(--section-background-contrast);
  z-index: 2;
  @media ${breakpoints.mobileLandscape} {
    top: 100px;
  }
  @media ${breakpoints.tablet} {
    display: block;
    box-shadow: none;
    padding: 1rem;
    top: 200px;
    left: 3rem;
    width: 25%;
  }
  @media ${breakpoints.laptop} {
    display: block;
    box-shadow: none;
    padding: 1rem;
    left: 5rem;
    width: 30%;
  }
`;

const ControllOverflow = styled.div`
  overflow: hidden;
`;

const ControlPadding = styled.div`
  margin-top: 5rem;
`;

const StyledHeading = styled(StyledTitle)`
  width: 100%;
  padding: 1rem 0;
  position: fixed;
  top: ${({ $isScrollDown }) => ($isScrollDown ? "65px" : "100px")};
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
  width: 92vw;
  margin: 0 0.5rem;
  border-top: 1px solid var(--main-dark);
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
  @media ${breakpoints.laptop} {
    margin-left: 10%;
  }
`;

const StyledLink = styled(StyledStandardLink)`
  padding: 0.5rem;
  background-color: var(--button-background);
  color: var(--contrast-text);
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

const SwitchSizer = styled.span`
  transform: scale(0.6);
`;

const GraphToggleWrapper = styled.div`
  display: flex;
  flex-flow: row;
  position: relative;
  top: -36px;
  left: 200px;
  width: 8rem;
  height: 26px;
  padding: 0.3rem;
  gap: 0.1rem;
  justify-content: space-between;
  margin: 0;
  z-index: 2;
  @media ${breakpoints.mobileLandscape} {
    top: 80px;
  }
  @media ${breakpoints.tablet} {
    right: 10%;
  }
  @media ${breakpoints.laptop} {
    right: 13%;
  }
`;

export default function EmotionRecords({
  emotionEntries,
  onDeleteEmotionEntry,
  toggleHighlight,
  handleToolTip,
  isScrollDown,
  theme,
  useExampleData,
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

  const [showFilter, setShowFilter] = useState(false);
  const [chartIsShown, setChartIsShown] = useState(false);

  useEffect(() => {
    handleToolTip({
      text: "Navigate through your emotion records list, a comprehensive compilation of all your added emotion entries. You can easily search for specific entries, edit or delete them, and even highlight important moments. Also, you can search through your entries or filter them by the following options: today, last week, or last month. Above the list to the right is a switch to display the data as chart instead of the list.",
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

  function handleChart() {
    setChartIsShown(!chartIsShown);
  }

  return (
    <>
      <Head>
        <title>Emotion Records</title>
      </Head>
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
        <GraphToggleWrapper>
          <Icon path={mdiFormatListBulleted} size={1} />
          <SwitchSizer>
            <ToggleSwitch
              handleSwitch={handleChart}
              isChecked={chartIsShown}
              useButtonColor={true}
            />
          </SwitchSizer>
          <Icon path={mdiChartLine} size={1} />
        </GraphToggleWrapper>
      </AnimatedPanel>

      {chartIsShown && (
        <ChartContainer shownEntries={shownEntries} theme={theme} />
      )}

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

      {shownEntries.length !== 0 && !chartIsShown && (
        <ControlPadding>
          <EmotionRecordsList
            onDeleteEmotionEntry={onDeleteEmotionEntry}
            toggleHighlight={toggleHighlight}
            shownEntries={shownEntries}
            filteredEntries={filteredEntries}
            useExampleData={useExampleData}
          />
        </ControlPadding>
      )}
    </>
  );
}
