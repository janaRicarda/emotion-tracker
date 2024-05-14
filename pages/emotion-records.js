import EmotionRecordsList from "@/components/EmotionRecordsList";
import {
  StyledFlexColumnWrapper,
  StyledButton,
  StyledStandardLink,
} from "@/SharedStyledComponents";
import styled from "styled-components";
import SearchBar from "@/components/SearchBar";
import { useState, useEffect } from "react";
import Fuse from "fuse.js";
import { DayPicker } from "react-day-picker";
import CalendarIcon from "/public/calendar.svg";

const StyledCalendarIcon = styled(CalendarIcon)`
  width: 1.5rem;
  display: inline;
  vertical-align: bottom;
`;

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

const StyledTextMessage = styled.p`
  margin-top: 150px;
  text-align: center;
  line-height: 3;
`;

const StyledLink = styled(StyledStandardLink)`
  padding: 0.5rem;
  background-color: var(--button-background);
`;

const StyledFilterButton = styled(StyledButton)`
  background-color: ${({ $active }) =>
    $active ? "var(--button-background)" : "var(--main-bright)"};
  margin: 0;
  padding: 0.2rem;
  width: auto;
`;

const StyledEmotionRecordsTitle = styled.h1`
  font-weight: 600;
`;

const StyledButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  padding: 0.6rem;
  width: 90vw;
  gap: 10px;
`;

// styles for DayPicker
const StyledBackground = styled.div`
  background-color: black;
  opacity: 0.5;
  position: fixed;
  inset: 0;
  z-index: 2;
`;

const WrapperForDayPicker = styled.section`
  position: fixed;
  right: calc(50% - 170px);
  top: 9rem;
  width: 340px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 4;
  background-color: var(--main-bright);
  border-radius: 6px;
  padding: 1rem;
`;

const WrapperForNavigation = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  padding: 0.5rem;
`;

const StyledNavButton = styled(StyledButton)`
  width: 5rem;
  padding: 0.2rem;
  margin: 0.5rem;
  opacity: ${(props) => (props.disabled ? "0.25" : "1")};
`;

const StyledParagraph = styled.p`
  text-align: center;
  padding: 0.5rem;
`;

export default function EmotionRecords({
  emotionEntries,
  onDeleteEmotionEntry,
  toggleHighlight,
}) {
  const [searchTerm, setSearchTerm] = useState();
  const [filteredEntries, setFilteredEntries] = useState(emotionEntries);
  const [shownEntries, setShownEntries] = useState(emotionEntries);
  const [buttonState, setButtonState] = useState({
    todayButton: true,
    name: "todayButton",
    label: "Today",
    singleComparison: true,
    daysAgo: 0,
  });

  //useStates for DayPicker
  const [month, setMonth] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState();
  const [showDayPicker, setShowDayPicker] = useState(false);
  //

  const filterButtons = [
    { name: "allButton", label: "All" },
    { name: "todayButton", label: "Today", singleComparison: true, daysAgo: 0 },
    {
      name: "yesterdayButton",
      label: "Yesterday",
      singleComparison: true,
      daysAgo: 1,
    },
    { name: "weekButton", label: " Last Week", daysAgo: 7 },
    { name: "monthButton", label: "Last Month", daysAgo: 30 },
    { name: "highlightedButton", label: "Highlighted" },
    {
      name: "datePicker",
      label: `Custom`,
      icon: <StyledCalendarIcon />,
      setShow: true,
    },
  ];

  console.log(CalendarIcon);

  // sets filteredEntries depending on buttonState; reacts to changes of emotionEntrie in case of e.g. deletion

  useEffect(() => {
    // helper functions
    function getDate(daysToGoBack) {
      const currentTime = new Date();
      const date = new Date(
        new Date(
          currentTime.setDate(currentTime.getDate() - daysToGoBack)
        ).toDateString()
      ).getTime();

      return date;
    }

    function getFilteredEntries(boolean, firstDate, secondDate) {
      const filteredEntries = emotionEntries.filter((entry) => {
        const entrieDate = new Date(
          new Date(entry.isoDate).toDateString()
        ).getTime();

        const result = boolean
          ? entrieDate === firstDate
          : entrieDate >= firstDate && entrieDate <= secondDate;
        return result;
      });
      return filteredEntries;
    }

    const { daysAgo, singleComparison } = buttonState;
    //

    setFilteredEntries(() => {
      if (
        buttonState.todayButton ||
        buttonState.yesterdayButton ||
        buttonState.weekButton ||
        buttonState.monthButton
      ) {
        const todayOrEarlier = getDate(daysAgo);
        const today = getDate(0);
        return getFilteredEntries(singleComparison, todayOrEarlier, today);
      }
      if (buttonState.highlightedButton) {
        setShowDayPicker(false);
        const highlightedEntries = emotionEntries.filter(
          (entry) => entry.isHighlighted
        );
        return highlightedEntries;
      }
      if (buttonState.datePicker) {
        if (!selectedTime) {
          return emotionEntries;
        } else {
          const selectedStartDate = new Date(
            selectedTime.from.toDateString()
          ).getTime();

          const selectedEndDate =
            selectedTime.to &&
            new Date(selectedTime.to.toDateString()).getTime();

          const isSecondDateSelected = !selectedEndDate;

          return getFilteredEntries(
            isSecondDateSelected,
            selectedStartDate,
            selectedEndDate
          );
        }
      } else {
        return emotionEntries;
      }
    });
  }, [buttonState, emotionEntries, selectedTime]);

  // searches only filteredEntries and sets shownEntries accordingly
  useEffect(() => {
    if (!searchTerm) {
      setShownEntries(filteredEntries);
      return;
    }

    const fuse = new Fuse(filteredEntries, {
      includeScore: true,
      threshold: 0.4,
      keys: [
        "timeAndDate",
        "tensionLevel",
        "trigger",
        "intensity",
        "notes",
        "category",
        "emotion",
        "subemotion",
      ],
    });

    const results = fuse.search(searchTerm);
    const items = results.map((result) => result.item);
    setShownEntries(items);
  }, [searchTerm, filteredEntries]);

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

  return (
    <StyledFlexColumnWrapper>
      <StyledPageHeader>
        <StyledEmotionRecordsTitle>Recorded Emotions</StyledEmotionRecordsTitle>
        <SearchBar onSearch={handleSearch} />
        <StyledButtonGroup>
          {filterButtons.map(
            ({ name, label, singleComparison, daysAgo, setShow, icon }) => (
              <StyledFilterButton
                key={name}
                $active={buttonState[name] && true}
                onClick={() => {
                  setButtonState({
                    [name]: true,
                    singleComparison,
                    daysAgo,
                  });
                  setShow && setShowDayPicker(!showDayPicker);
                }}
              >
                {label}
                {icon}
              </StyledFilterButton>
            )
          )}
        </StyledButtonGroup>
      </StyledPageHeader>
      {emotionEntries.length !== 0 && (
        <>
          {showDayPicker && (
            <>
              <StyledBackground />
              <WrapperForDayPicker>
                <DayPicker
                  mode="range"
                  selected={selectedTime}
                  onSelect={setSelectedTime}
                  toDate={new Date()}
                  month={month}
                  onMonthChange={setMonth}
                />
                {selectedTime ? (
                  <StyledParagraph>
                    Your Selection:<br></br>
                    {getFormattedDate(selectedTime.from)}
                    {selectedTime.to &&
                      selectedTime.from.toString() !==
                        selectedTime.to.toString() &&
                      " - " + getFormattedDate(selectedTime.to)}
                  </StyledParagraph>
                ) : (
                  <StyledParagraph>
                    Select a single date or a range of dates
                  </StyledParagraph>
                )}
                <WrapperForNavigation>
                  <StyledNavButton
                    disabled={
                      month.getMonth() === new Date().getMonth() ? true : false
                    }
                    onClick={() => setMonth(new Date())}
                  >
                    Today
                  </StyledNavButton>
                  <StyledNavButton
                    disabled={selectedTime ? false : true}
                    onClick={() => setSelectedTime()}
                  >
                    Reset
                  </StyledNavButton>
                  <StyledNavButton onClick={() => setShowDayPicker(false)}>
                    Ok
                  </StyledNavButton>
                </WrapperForNavigation>
              </WrapperForDayPicker>
            </>
          )}
          <EmotionRecordsList
            onDeleteEmotionEntry={onDeleteEmotionEntry}
            toggleHighlight={toggleHighlight}
            shownEntries={shownEntries}
            filteredEntries={filteredEntries}
            buttonState={buttonState}
            searchTerm={searchTerm}
            selectedTime={selectedTime}
          />
        </>
      )}
      {emotionEntries.length === 0 && (
        <StyledTextMessage>
          You haven&apos;t made any Entries yet.<br></br>
          <StyledLink href="./">add Entry &rarr;</StyledLink>
        </StyledTextMessage>
      )}
    </StyledFlexColumnWrapper>
  );
}
