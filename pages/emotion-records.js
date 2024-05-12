import EmotionRecordsList from "@/components/EmotionRecordsList";
import styled from "styled-components";
import SearchBar from "@/components/SearchBar";
import { useState, useEffect, use } from "react";
import Link from "next/link";
import Fuse from "fuse.js";

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
  background-color: ${({ $active }) => $active && "var(--button-background)"};
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
        return emotionEntries;
      }
      if (buttonState.todayButton) {
        const entriesFromToday = emotionEntries.filter((entry) => {
          const entrieDate = entry.isoDate.slice(0, 10);
          const result = entrieDate == today;
          return result;
        });
        return entriesFromToday;
      }
      if (buttonState.yesterdayButton) {
        const entriesFromYesterday = emotionEntries.filter((entry) => {
          const entrieDate = entry.isoDate.slice(0, 10);
          const result = entrieDate == yesterday;
          return result;
        });
        return entriesFromYesterday;
      }
      if (buttonState.weekButton) {
        const entriesFromLastSevenDays = emotionEntries.filter((entry) => {
          const entrieDate = entry.isoDate.slice(0, 10);
          const result = entrieDate >= sevenDaysAgo && entrieDate <= today;
          return result;
        });

        return entriesFromLastSevenDays;
      }
      if (buttonState.monthButton) {
        const entriesFromLastThirtyDays = emotionEntries.filter((entry) => {
          const entrieDate = entry.isoDate.slice(0, 10);
          const result = entrieDate >= thirtyDaysAgo && entrieDate <= today;
          return result;
        });

        return entriesFromLastThirtyDays;
      }
      if (buttonState.highlightedButton) {
        const highlightedEntries = emotionEntries.filter(
          (entry) => entry.isHighlighted
        );
        return highlightedEntries;
      } else return;
    }

    setFilteredEntries(getFilteredEntries());
  }, [buttonState, emotionEntries]);

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
  ];

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
                  onClick={() => setButtonState({ [name]: true, test: "test" })}
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
        <EmotionRecordsList
          filterdEntries={filterdEntries}
          buttonState={buttonState}
          onDeleteEmotionEntry={onDeleteEmotionEntry}
          shownEntries={shownEntries}
          toggleHighlight={toggleHighlight}
        />
      )}
    </StyledWrapper>
  );
}
