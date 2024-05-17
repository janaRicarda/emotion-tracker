import styled from "styled-components";
import { useState, useEffect } from "react";
import Magnifier from "../public/magnify.svg";
import { DayPicker } from "react-day-picker";
import CalendarIcon from "/public/calendar.svg";
import Fuse from "fuse.js";
import { StyledButton } from "@/SharedStyledComponents";

const StyledContainer = styled.div`
  height: auto;
  display: flex;
  position: relative;
  margin: 0.5rem;
`;

const StyledMagnifier = styled(Magnifier)`
  width: 1.8rem;
  fill: var(--main-dark);
  position: absolute;
  top: calc(50% - 15px);
  left: 3px;
`;

const StyledInput = styled.input`
  width: ${({ $showSearchBar }) => ($showSearchBar ? "80vw" : "35px")};
  height: 35px;
  padding-left: 2rem;
  background-color: var(--main-bright);
  color: var(--main-dark);
  border-radius: ${({ $showSearchBar }) => ($showSearchBar ? "20px" : "18px")};
  font-size: 0.8rem;
  border: 1px solid var(--main-dark);
  transition: width 600ms linear;
`;

// Styles for Filter-Buttons
const StyledFilterSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: center;
  align-items: center;
`;

const StyledFilterButton = styled(StyledButton)`
  background-color: ${({ $active }) =>
    $active ? "var(--button-background)" : "var(--main-bright)"};
  margin: 0;
  padding: 0.2rem;
  border-color: ${({ $active }) =>
    $active ? "var(--button-background)" : "var(--main-dark)"};
  width: auto;
  color: ${({ $active }) =>
    $active ? "var(--contrast-text)" : "var(--main-dark)"};
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
  padding: 0.4rem;
`;

const StyledCalendarIcon = styled(CalendarIcon)`
  width: 1.5rem;
  display: inline;
  vertical-align: bottom;
  fill: var(--main-dark);
`;

export default function FilterEmotionEntries({
  onSearch,
  emotionEntries,
  searchTerm,
  filteredEntries,
  buttonState,
  changeFilterEntries,
  changeButtonState,
  changeShownEntries,
  DisplayDate,
  changeSelectedTime,
  selectedTime,
}) {
  const [showSearchBar, SetShowSearchBar] = useState(false);
  const [showDayPicker, setShowDayPicker] = useState(false);
  const [month, setMonth] = useState(new Date());

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

  // sets filteredEntries useState in emotion-records.js according to buttonState; reacts to changes of emotionEntries e.g. deletion
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

    changeFilterEntries(() => {
      if (
        buttonState.todayButton ||
        buttonState.yesterdayButton ||
        buttonState.weekButton ||
        buttonState.monthButton
      ) {
        const todayOrEarlier = getDate(daysAgo);
        const today = getDate(0);

        const buttonFilteredEntries = getFilteredEntries(
          singleComparison,
          todayOrEarlier,
          today
        );
        return buttonFilteredEntries;
      }
      if (buttonState.highlightedButton) {
        const highlightedEntries = emotionEntries.filter(
          (entry) => entry.isHighlighted
        );
        return highlightedEntries;
      }
      if (buttonState.datePicker) {
        if (!selectedTime) {
          return [];
        } else {
          const selectedStartDate = new Date(
            selectedTime.from.toDateString()
          ).getTime();

          const selectedEndDate =
            selectedTime.to &&
            new Date(selectedTime.to.toDateString()).getTime();

          const secondDateNotSelected = !selectedEndDate;

          const customFilteredEntries = getFilteredEntries(
            secondDateNotSelected,
            selectedStartDate,
            selectedEndDate
          );

          return customFilteredEntries;
        }
      } else {
        return emotionEntries;
      }
    });
  }, [buttonState, emotionEntries, selectedTime, changeFilterEntries]);

  // searches filteredEntries and sets shownEntries accordingly in emotion-records.js to be rendered
  useEffect(() => {
    if (!searchTerm) {
      changeShownEntries(filteredEntries);
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
    changeShownEntries(items);
  }, [searchTerm, filteredEntries, changeShownEntries]);

  function handleShowSearchBar() {
    SetShowSearchBar(!showSearchBar);
  }

  return (
    <>
      <StyledFilterSection>
        <StyledContainer>
          <StyledInput
            $showSearchBar={showSearchBar}
            aria-label="Search"
            type="search"
            id="searchTerm"
            name="searchTerm"
            placeholder="Search for Tensionlevel, Emotion, Trigger..."
            aria-placeholder="Search for Tensionlevel, Emotion, Trigger..."
            onChange={(event) => onSearch(event.target.value)}
          />
          <StyledMagnifier onClick={handleShowSearchBar} />
        </StyledContainer>
        <StyledButtonGroup>
          {filterButtons.map(
            ({ name, label, singleComparison, daysAgo, setShow, icon }) => (
              <StyledFilterButton
                key={name}
                $active={buttonState[name] && true}
                onClick={() => {
                  changeButtonState({
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
      </StyledFilterSection>

      {showDayPicker && (
        <>
          <StyledBackground />
          <WrapperForDayPicker>
            <DayPicker
              mode="range"
              selected={selectedTime}
              onSelect={changeSelectedTime}
              toDate={new Date()}
              month={month}
              onMonthChange={setMonth}
            />
            {selectedTime ? (
              <DisplayDate />
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
                onClick={() => changeSelectedTime()}
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
    </>
  );
}