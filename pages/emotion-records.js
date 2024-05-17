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
import Tooltip from "@/components/Tooltip";

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

const StyledTextMessage = styled.p`
  margin-top: 150px;
  text-align: center;
  line-height: 3;
`;

const StyledLink = styled(StyledStandardLink)`
  padding: 0.5rem;
  background-color: var(--button-background);
`;

const StyledHighlightButton = styled(StyledButton)`
  font-size: 1rem;
  width: fit-content;
  margin: 0;
  padding: 0.3rem;
`;

const StyledEmotionRecordsTitle = styled.h1`
  font-weight: 600;
`;

export default function EmotionRecords({
  emotionEntries,
  onDeleteEmotionEntry,
  toggleHighlight,
}) {
  const [searchTerm, setSearchTerm] = useState();
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

  function handleShowHighlighted() {
    setIsHighlighted(!isHighlighted);
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
      <StyledPageHeader>
        <StyledEmotionRecordsTitle>Recorded Emotions</StyledEmotionRecordsTitle>

        {emotionEntries.length !== 0 && (
          <>
            <SearchBar onSearch={handleSearch} />

            <StyledHighlightButton onClick={handleShowHighlighted}>
              {isHighlighted ? "Show all Entries" : "Show highlighted Entries"}
            </StyledHighlightButton>
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
          onDeleteEmotionEntry={onDeleteEmotionEntry}
          shownEntries={
            isHighlighted
              ? shownEntries.filter((entry) => entry.isHighlighted)
              : shownEntries
          }
          toggleHighlight={toggleHighlight}
          isHighlighted={isHighlighted}
        />
      )}
    </StyledFlexColumnWrapper>
  );
}
