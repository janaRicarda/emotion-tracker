import { StyledTitle, StyledStandardLink } from "@/SharedStyledComponents";
import styled, { css } from "styled-components";
import FilterEmotionEntries from "@/components/FilterEmotionEntries";
import { useState, useCallback, useEffect, useRef } from "react";
import HeartOutlineIcon from "../public/heart-outline.svg";
import CalendarIcon from "/public/calendar.svg";
import EmotionRecordsList from "../components/EmotionRecordsList";
import Tooltip from "@/components/Tooltip";
import SmallFilterPanel from "@/components/SmallFilterPanel";

// used for all transitions
const transition = css`
  transition: all 300ms ease;
`;

const GridWrapper = styled.section`
  width: 100%;
  position: fixed;
  top: 155px;
  display: grid;
  grid-template-rows: ${({ $scrollPosition }) =>
    $scrollPosition === 0 ? "1fr" : "0fr"};
  ${transition}
  background-color: var(--main-bright);
  z-index: 1;
`;

const ControllOverflow = styled.div`
  overflow: hidden;
`;

const ControlPadding = styled.div`
  margin-top: 2rem;
  padding-top: ${({ $paddingTop, $scrollPosition }) =>
    $scrollPosition === 0 ? `${$paddingTop}px` : "2rem"};
  ${transition}
`;

const StyledHeading = styled(StyledTitle)`
  width: 100%;
  padding: 1rem 0 0;
  position: fixed;
  top: ${({ $isScrollDown }) => ($isScrollDown ? "65px" : "110px")};
  ${transition}
  background-color: var(--main-bright);
  z-index: 1;
`;

const AnimatedPanel = styled.div`
  width: 100vw;
  background-color: var(--main-bright);
  position: fixed;
  overflow: hidden;
  height: ${({ $scrollPosition }) => ($scrollPosition === 0 ? "0" : "55px")};
  top: ${({ $isScrollDown }) => ($isScrollDown ? "110px" : "155px")};
  ${transition}
  box-shadow: 0px 5px 5px -1px rgba(0, 0, 0, 0.2);
  z-index: 1;
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
  display: ${({ $scrollPosition }) =>
    $scrollPosition === 0 ? "block" : "none"};
`;

const StyledDateSpan = styled.span`
  background-color: var(--button-background);
  border-radius: 50px;
  padding: 0 0.5rem;
`;

export default function EmotionRecords({
  emotionEntries,
  onDeleteEmotionEntry,
  toggleHighlight,
  handleToolTip,
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

  const [scrollPosition, setScrollPosition] = useState(0);
  const [isScrollDown, setIsScrollDown] = useState(false);

  const [paddingTop, setPaddingTop] = useState();

  const filterSection = useRef();

  useEffect(() => {
    handleToolTip({
      text: "Navigate through your emotion records list, a comprehensive compilation of all your added emotion entries. You can easily search for specific entries, edit or delete them, and even highlight important moments. Also, you can search through your entries or filter them by the following options: today, last week, or last month.",
    });
  }, []);

  useEffect(() => {
    const height = filterSection.current.getBoundingClientRect().height;
    setPaddingTop(height);
  }, []);

  useEffect(() => {
    function handleScroll() {
      const pageHeight = document.documentElement.offsetHeight;
      const windowHeight = window.innerHeight;

      // stops resizing of elements and prevents resizing-loops when there is not enough space on the page
      const enoughSpace = pageHeight - windowHeight > 400;

      console.log(enoughSpace);
      const currentScroll = document.documentElement.scrollTop;

      if (!enoughSpace) {
        setIsScrollDown(false);
        return;
      }
      if (currentScroll < scrollPosition) {
        setIsScrollDown(false);
      } else if (currentScroll > scrollPosition) {
        setIsScrollDown(true);
      }
      setScrollPosition(document.documentElement.scrollTop);
    }

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  });

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

  function DisplayDate({ textAlign, scrollPosition }) {
    return (
      <StyledParagraph $scrollPosition={scrollPosition} $textAlign={textAlign}>
        Date selected:<br></br>
        <StyledDateSpan>
          {getFormattedDate(selectedTime.from)}
          {selectedTime.to &&
            selectedTime.from.toString() !== selectedTime.to.toString() &&
            " - " + getFormattedDate(selectedTime.to)}
        </StyledDateSpan>
      </StyledParagraph>
    );
  }

  // Navigate through your emotion records list, a comprehensive compilation
  // of all your added emotion entries. You can easily search for specific
  // entries, edit or delete them, and even highlight important moments.
  // Also, you can search through your entries or filter them by the
  // following options: today, last week, or last month.

  return (
    <>
      <StyledHeading $isScrollDown={isScrollDown}>
        Recorded Emotions
      </StyledHeading>
      <GridWrapper
        $isScrollDown={isScrollDown}
        $scrollPosition={scrollPosition}
      >
        <ControllOverflow ref={filterSection}>
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
        </ControllOverflow>
      </GridWrapper>
      <AnimatedPanel
        $scrollPosition={scrollPosition}
        $isScrollDown={isScrollDown}
      >
        <SmallFilterPanel
          isScrollDown={isScrollDown}
          buttonState={buttonState}
          searchTerm={searchTerm}
          DisplayDate={DisplayDate}
          selectedTime={selectedTime}
        />
      </AnimatedPanel>
      {buttonState.datePicker ? (
        selectedTime ? (
          <DisplayDate scrollPosition={scrollPosition} textAlign="center" />
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
        <ControlPadding
          $scrollPosition={scrollPosition}
          $paddingTop={paddingTop}
        >
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
