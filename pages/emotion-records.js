import {
  StyledTitle,
  StyledFlexColumnWrapper,
  StyledStandardLink,
} from "@/SharedStyledComponents";
import styled from "styled-components";
import FilterEmotionEntries from "@/components/FilterEmotionEntries";
import { useState, useCallback } from "react";
import HeartOutlineIcon from "../public/heart-outline.svg";
import CalendarIcon from "/public/calendar.svg";
import EmotionRecordsList from "../components/EmotionRecordsList";
import Tooltip from "@/components/Tooltip";

const StyledTopSection = styled(StyledFlexColumnWrapper)`
  position: sticky;
  top: 99px;
  background-color: var(--main-bright);
  z-index: 1;
`;

const StyledTextMessage = styled.article`
  margin-top: 4rem;
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
  padding: 0.5rem;
`;

export default function EmotionRecords({
  emotionEntries,
  onDeleteEmotionEntry,
  toggleHighlight,
  handleToggleTooltip,
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

  // handler-functions used in a useEffect after passed to FilterEmotionEntries are wrapped into useCallback hook here

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
      <StyledParagraph>
        Your Selection:<br></br>
        {getFormattedDate(selectedTime.from)}
        {selectedTime.to &&
          selectedTime.from.toString() !== selectedTime.to.toString() &&
          " - " + getFormattedDate(selectedTime.to)}
      </StyledParagraph>
    );
  }

  return (
    <>
      <Tooltip onClick={handleToggleTooltip}>
        Navigate through your emotion records list, a comprehensive compilation
        of all your added emotion entries. You can easily search for specific
        entries, edit or delete them, and even highlight important moments.
        Also, you can search through your entries or filter them by the
        following options: today, last week, or last month.
      </Tooltip>
      <StyledFlexColumnWrapper>
        <StyledTopSection>
          <StyledTitle>Recorded Emotions</StyledTitle>
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
        </StyledTopSection>
        {buttonState.datePicker ? (
          selectedTime ? (
            <DisplayDate />
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
          <>
            <EmotionRecordsList
              onDeleteEmotionEntry={onDeleteEmotionEntry}
              toggleHighlight={toggleHighlight}
              shownEntries={shownEntries}
              filteredEntries={filteredEntries}
            />
          </>
        )}
      </StyledFlexColumnWrapper>
    </>
  );
}
