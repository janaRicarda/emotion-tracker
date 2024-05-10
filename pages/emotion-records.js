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

const StyledToggleButton = styled.button`
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
  const [isActive, setIsActive] = useState({
    all: true,
    today: false,
    yesterday: false,
    week: false,
    month: false,
    highlighted: false,
  });

  // sets filteredEntries useState; able to react to deletion of entries
  useEffect(() => {
    isActive.all && setShownEntries(emotionEntries);
    isActive.today && getEntriesFromToday(emotionEntries);
    isActive.yesterday && getEntriesFromYesterday(emotionEntries);
    isActive.week && getEntriesFromLastWeek(emotionEntries);
    isActive.month && getEntriesFromLastMonth(emotionEntries);
    isActive.highlighted && getHighlightedEntries(emotionEntries);
  }, [isActive, emotionEntries]);

  // searches filteredEntries and sets shownEntries useState accordingly
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

  function getEntriesFromToday(arrayToFilter) {
    const today = new Date().toISOString().slice(0, 10);

    const entriesFromToday = arrayToFilter.filter((entry) => {
      const entrieDate = entry.isoDate.slice(0, 10);
      const result = entrieDate == today;
      return result;
    });
    setFilteredEntries(entriesFromToday);
  }

  function getEntriesFromYesterday(arrayToFilter) {
    const currentTime = new Date();
    const yesterday = new Date(currentTime.setDate(currentTime.getDate() - 1))
      .toISOString()
      .slice(0, 10);

    const entriesFromYesterday = arrayToFilter.filter((entry) => {
      const entrieDate = entry.isoDate.slice(0, 10);
      const result = entrieDate == yesterday;
      return result;
    });
    setFilteredEntries(entriesFromYesterday);
  }

  function getEntriesFromLastWeek(arrayToFilter) {
    const currentTime = new Date();
    const sevenDaysAgo = new Date(
      currentTime.setDate(currentTime.getDate() - 7)
    )
      .toISOString()
      .slice(0, 10);
    const today = new Date().toISOString().slice(0, 10);

    const entriesFromLastSevenDays = arrayToFilter.filter((entry) => {
      const entrieDate = entry.isoDate.slice(0, 10);
      const result = entrieDate >= sevenDaysAgo && entrieDate <= today;
      return result;
    });

    setFilteredEntries(entriesFromLastSevenDays);
  }

  function getEntriesFromLastMonth(arrayToFilter) {
    const currentTime = new Date();
    const today = new Date().toISOString().slice(0, 10);
    const thirtyDaysAgo = new Date(
      currentTime.setDate(currentTime.getDate() - 30)
    )
      .toISOString()
      .slice(0, 10);

    const entriesFromLastThirtyDays = arrayToFilter.filter((entry) => {
      const entrieDate = entry.isoDate.slice(0, 10);
      const result = entrieDate >= thirtyDaysAgo && entrieDate <= today;
      return result;
    });

    setFilteredEntries(entriesFromLastThirtyDays);
  }

  function getHighlightedEntries(arrayToFilter) {
    const highlightedEntries = arrayToFilter.filter(
      (entry) => entry.isHighlighted
    );
    setFilteredEntries(highlightedEntries);
  }

  return (
    <StyledWrapper>
      <StyledPageHeader>
        <StyledTitle>Recorded Emotions</StyledTitle>

        {emotionEntries.length !== 0 && (
          <>
            <SearchBar onSearch={handleSearch} />
            <StyledButtonGroup>
              <StyledToggleButton
                $active={isActive.all && true}
                onClick={() => {
                  setIsActive({
                    all: true,
                    today: false,
                    yesterday: false,
                    week: false,
                    month: false,
                    highlighted: false,
                  });
                  setShownEntries(emotionEntries);
                }}
              >
                All
              </StyledToggleButton>
              <StyledToggleButton
                $active={isActive.today && true}
                onClick={() => {
                  setIsActive({
                    all: false,
                    today: true,
                    yesterday: false,
                    week: false,
                    month: false,
                    highlighted: false,
                  });
                }}
              >
                Today
              </StyledToggleButton>
              <StyledToggleButton
                $active={isActive.yesterday && true}
                onClick={() => {
                  setIsActive({
                    all: false,
                    today: false,
                    yesterday: true,
                    week: false,
                    month: false,
                    highlighted: false,
                  });
                }}
              >
                Yesterday
              </StyledToggleButton>
              <StyledToggleButton
                $active={isActive.week && true}
                onClick={() => {
                  setIsActive({
                    all: false,
                    today: false,
                    yesterday: false,
                    week: true,
                    month: false,
                    highlighted: false,
                  });
                }}
              >
                Week
              </StyledToggleButton>
              <StyledToggleButton
                $active={isActive.month && true}
                onClick={() => {
                  setIsActive({
                    all: false,
                    today: false,
                    yesterday: false,
                    week: false,
                    month: true,
                    highlighted: false,
                  });
                }}
              >
                Month
              </StyledToggleButton>
              <StyledToggleButton
                $active={isActive.highlighted && true}
                onClick={() => {
                  setIsActive({
                    all: false,
                    today: false,
                    yesterday: false,
                    week: false,
                    month: false,
                    highlighted: true,
                  });
                }}
              >
                Highlighted
              </StyledToggleButton>
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
          isActive={isActive}
          onDeleteEmotionEntry={onDeleteEmotionEntry}
          shownEntries={shownEntries}
          toggleHighlight={toggleHighlight}
        />
      )}
    </StyledWrapper>
  );
}
