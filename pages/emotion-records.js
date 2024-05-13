import EmotionRecordsList from "@/components/EmotionRecordsList";
import styled from "styled-components";
import SearchBar from "@/components/SearchBar";
import { useState, useEffect } from "react";
import Link from "next/link";
import Fuse from "fuse.js";
import { DayPicker } from "react-day-picker";

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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

const StyledTitle = styled.h1`
  font-weight: 500;
`;
const StyledTextMessage = styled.p`
  margin-top: 150px;
  text-align: center;
  line-height: 3;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  border: 1px solid var(--main-dark);
  padding: 0.5rem;
  background-color: var(--button-background);
  border-radius: 6px;
  color: var(--main-dark);
`;

const StyledFilterButton = styled.button`
  font-size: 1rem;
  border: 1px solid var(--main-dark);
  border-radius: 6px;
  background-color: var(--main-bright);
  background-color: ${({ $active }) =>
    $active ? "var(--button-background)" : "var(--main-bright)"};
  color: var(--main-dark);
`;

const StyledButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  padding: 0.6rem;
  width: 80vw;
  gap: 10px;
`;

const StyledNavButton = styled.button`
  border: 1px solid var(--main-dark);
  border-radius: 6px;
  margin: 0.5rem;
  background-color: var(--button-background);
  opacity: ${(props) => (props.disabled ? "0.25" : "1")};
  color: var(--main-dark);
`;

const WrapperForNavigation = styled.div`
  display: flex;
  flex-direction: row;
`;

export default function EmotionRecords({
  emotionEntries,
  onDeleteEmotionEntry,
  toggleHighlight,
}) {
  const [searchTerm, setSearchTerm] = useState();
  const [filterdEntries, setFilteredEntries] = useState(emotionEntries);
  const [shownEntries, setShownEntries] = useState(emotionEntries);
  const [buttonState, setButtonState] = useState({
    todayButton: true,
  });

  //useStates for DayPicker
  const [month, setMonth] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState();
  const [showDayPicker, setShowDayPicker] = useState(false);

  // sets filteredEntries depending on buttonState; reacts to changing of emotionEntrie in case of e.g. deletion
  useEffect(() => {
    function getFilteredEntries() {
      //bundled variables using currentTime
      const currentTime = new Date();
      const today = new Date().toISOString().slice(0, 10);
      const yesterday = new Date(currentTime.setDate(currentTime.getDate() - 1))
        .toISOString()
        .slice(0, 10);
      const sevenDaysAgo = new Date(
        currentTime.setDate(currentTime.getDate() - 7)
      )
        .toISOString()
        .slice(0, 10);
      const thirtyDaysAgo = new Date(
        currentTime.setDate(currentTime.getDate() - 30)
      )
        .toISOString()
        .slice(0, 10);

      // bundled filter functions dependend on buttonState
      if (buttonState.allButton) {
        setShowDayPicker(false);
        return emotionEntries;
      }
      if (buttonState.todayButton) {
        setShowDayPicker(false);
        const entriesFromToday = emotionEntries.filter((entry) => {
          const entrieDate = entry.isoDate.slice(0, 10);
          const result = entrieDate == today;
          return result;
        });
        return entriesFromToday;
      }
      if (buttonState.yesterdayButton) {
        setShowDayPicker(false);
        const entriesFromYesterday = emotionEntries.filter((entry) => {
          const entrieDate = entry.isoDate.slice(0, 10);
          const result = entrieDate == yesterday;
          return result;
        });
        return entriesFromYesterday;
      }
      if (buttonState.weekButton) {
        setShowDayPicker(false);
        const entriesFromLastSevenDays = emotionEntries.filter((entry) => {
          const entrieDate = entry.isoDate.slice(0, 10);
          const result = entrieDate >= sevenDaysAgo && entrieDate <= today;
          return result;
        });

        return entriesFromLastSevenDays;
      }
      if (buttonState.monthButton) {
        setShowDayPicker(false);
        const entriesFromLastThirtyDays = emotionEntries.filter((entry) => {
          const entrieDate = entry.isoDate.slice(0, 10);
          const result = entrieDate >= thirtyDaysAgo && entrieDate <= today;
          return result;
        });

        return entriesFromLastThirtyDays;
      }
      if (buttonState.highlightedButton) {
        setShowDayPicker(false);
        const highlightedEntries = emotionEntries.filter(
          (entry) => entry.isHighlighted
        );
        return highlightedEntries;
      }
      if (buttonState.datePicker) {
        setShowDayPicker(true);
        if (!selectedTime) {
          return emotionEntries;
        } else {
          const selectedStartDate = new Date(
            selectedTime.from.toDateString()
          ).getTime();
          const selectedEndDate =
            selectedTime.to &&
            new Date(selectedTime.to.toDateString()).getTime();
          // entrieDate >= selectedStartDate && entrieDate <= selectedEndDate

          const entriesFromTimeRange = emotionEntries.filter((entry) => {
            const entrieDate = new Date(
              new Date(entry.isoDate).toDateString()
            ).getTime();

            const result = selectedTime.to
              ? entrieDate >= selectedStartDate && entrieDate <= selectedEndDate
              : selectedStartDate === entrieDate;
            return result;
          });
          return entriesFromTimeRange;
        }
      }
    }

    setFilteredEntries(getFilteredEntries());
  }, [buttonState, emotionEntries, selectedTime]);

  // searches only filteredEntries and sets shownEntries accordingly
  useEffect(() => {
    if (!searchTerm) {
      setShownEntries(filterdEntries);
      return;
    }

    const fuse = new Fuse(filterdEntries, {
      includeScore: true,
      threshold: 0.4,
      keys: [
        "date",
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
  }, [searchTerm, filterdEntries]);

  function handleSearch(input) {
    setSearchTerm(input);
  }

  const filterButtons = [
    { name: "allButton", label: "All" },
    { name: "todayButton", label: "Today" },
    { name: "yesterdayButton", label: "Yesterday" },
    { name: "weekButton", label: "Week" },
    { name: "monthButton", label: "Month" },
    { name: "highlightedButton", label: "Highlighted" },
    { name: "datePicker", label: "Custom 📅" },
  ];

  function getDate(date) {
    const selectedDate = new Intl.DateTimeFormat(`de`, {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(date);

    return selectedDate;
  }

  return (
    <StyledWrapper>
      <StyledPageHeader>
        <StyledTitle>Recorded Emotions</StyledTitle>

        {emotionEntries.length !== 0 && (
          <>
            <SearchBar onSearch={handleSearch} />
            <StyledButtonGroup>
              {filterButtons.map(({ name, label }) => (
                <StyledFilterButton
                  key={name}
                  $active={buttonState[name] && true}
                  onClick={() => setButtonState({ [name]: true })}
                >
                  {label}
                </StyledFilterButton>
              ))}
            </StyledButtonGroup>
          </>
        )}
      </StyledPageHeader>
      {emotionEntries.length === 0 && (
        <StyledTextMessage>
          You haven&apos;t made any Entries yet.<br></br>
          <StyledLink href="./">add Entry &rarr;</StyledLink>
        </StyledTextMessage>
      )}

      {emotionEntries.length !== 0 && (
        <>
          {showDayPicker && (
            <>
              <DayPicker
                mode="range"
                selected={selectedTime}
                onSelect={setSelectedTime}
                toDate={new Date()}
                month={month}
                onMonthChange={setMonth}
              />
              {selectedTime ? (
                <p style={{ textAlign: "center" }}>
                  Your Selection:<br></br>
                  {getDate(selectedTime.from)}
                  {selectedTime.to &&
                    selectedTime.from.toString() !==
                      selectedTime.to.toString() &&
                    " - " + getDate(selectedTime.to)}
                </p>
              ) : (
                <p>Select a single date or a range of dates</p>
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
                  Hide
                </StyledNavButton>
              </WrapperForNavigation>
            </>
          )}
          <EmotionRecordsList
            filterdEntries={filterdEntries}
            buttonState={buttonState}
            onDeleteEmotionEntry={onDeleteEmotionEntry}
            shownEntries={shownEntries}
            toggleHighlight={toggleHighlight}
          />
        </>
      )}
    </StyledWrapper>
  );
}
