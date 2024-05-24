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

const StyledAnimatedTitle = styled(StyledTitle)`
  background-color: var(--main-bright);
  padding: 0;
  width: 100%;
  position: sticky;
  top: 125px;
  transform: translateY(
    ${({ $isScrollDown }) => ($isScrollDown ? "-300px" : "0")}
  );
  transition: transform 700ms ease-in-out;
`;

const StyledTextMessage = styled.p`
  margin-top: 4rem;
  text-align: center;
  line-height: 3;
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
  top: 5px;
`;

const StyledCalendarIcon = styled(CalendarIcon)`
  width: 1.5rem;
  display: inline;
  vertical-align: bottom;
  fill: var(--main-dark);
`;

const StyledDateIndicator = styled.p`
  text-align: center;
  margin: 2rem auto 1rem;
`;

const StyledParagraph = styled.p`
  text-align: ${({ $textAlign }) => $textAlign};
  padding: 0.5rem;
`;

export default function EmotionRecords({
  emotionEntries,
  onDeleteEmotionEntry,
  toggleHighlight,
  handleToggleTooltip,
  isScrollDown,
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

  function DisplayDate({ textAlign }) {
    return (
      <StyledParagraph $textAlign={textAlign}>
        Date selected:<br></br>
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
      <>
        <StyledAnimatedTitle $isScrollDown={isScrollDown}>
          Recorded Emotions
        </StyledAnimatedTitle>
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
          isScrollDown={isScrollDown}
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
          <>
            <EmotionRecordsList
              onDeleteEmotionEntry={onDeleteEmotionEntry}
              toggleHighlight={toggleHighlight}
              shownEntries={shownEntries}
              filteredEntries={filteredEntries}
            />
          </>
        )}
      </>
    </>
  );
}
