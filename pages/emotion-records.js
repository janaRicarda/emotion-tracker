import dynamic from "next/dynamic";

const EmotionRecordsList = dynamic(
  () => import("../components/EmotionRecordsList"),
  { ssr: false }
);
import {
  StyledTitle,
  StyledFlexColumnWrapper,
  StyledStandardLink,
} from "@/SharedStyledComponents";
import styled from "styled-components";
import SearchBar from "@/components/SearchBar";
import { useState, useEffect } from "react";
import Fuse from "fuse.js";
import Tooltip from "@/components/Tooltip";

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledTopSection = styled(StyledFlexColumnWrapper)`
  position: sticky;
  top: 100px;
  background-color: var(--main-bright);
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
  const [isHighlighted, setIsHighlighted] = useState(false);
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);

  useEffect(() => {
    if (!searchTerm) {
      setShownEntries(emotionEntries);
      return;
    }

    const fuse = new Fuse(emotionEntries, {
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
  }, [emotionEntries, searchTerm]);

  function handleSetSelectedTime(time) {
    setSelectedTime(time);
  }

  function handleSearch(input) {
    setSearchTerm(input);
  }

  function handleToggleTooltip() {
    setIsTooltipOpen(!isTooltipOpen);
  }

  return (
    <StyledFlexColumnWrapper>
      <Tooltip onToggleTooltip={handleToggleTooltip} show={isTooltipOpen}>
        <>
          Navigate through your emotion records list, a comprehensive
          compilation of all your added emotion entries. You can easily search
          for specific entries, edit or delete them, and even highlight
          important moments. Also, you can search through your entries or filter
          them by the following options: today, last week, or last month.
        </>
      </Tooltip>
      <StyledTopSection>
        <StyledTitle>Recorded Emotions</StyledTitle>

        {emotionEntries.length !== 0 && (
          <>
            <SearchBar onSearch={handleSearch} />

            <StyledHeartSymbol onClick={handleShowHighlighted}>
              {isHighlighted ? "Show all Entries" : "Show highlighted Entries"}
            </StyledHeartSymbol>
          </>
        )}
      </StyledTopSection>
      {emotionEntries.length === 0 && (
        <StyledTextMessage>
          You haven&apos;t made any Entries yet.<br></br>
          <StyledLink href="./">add Entry &rarr;</StyledLink>
        </StyledTextMessage>
      )}

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
  );
}
