import EmotionRecordsList from "@/components/EmotionRecordsList";
import styled from "styled-components";
import SearchBar from "@/components/SearchBar";
import { useState } from "react";
import Link from "next/link";

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

const StyledHighlightButton = styled.button`
  font-size: 1rem;
  border: 1px solid var(--main-dark);
  border-radius: 6px;
  background: var(--button-background);
  color: var(--main-dark);
`;

export default function EmotionRecords({
  emotionEntries,
  onDeleteEmotionEntry,
  toggleHighlight,
}) {
  const [shownEntries, SetShownEntries] = useState(emotionEntries);
  const [isHighlighted, setIsHighlighted] = useState(false);

  function handleShowHighlighted() {
    setIsHighlighted(!isHighlighted);
  }

  return (
    <StyledWrapper>
      <StyledPageHeader>
        <StyledTitle>Recorded Emotions</StyledTitle>

        {emotionEntries.length !== 0 && (
          <>
            <SearchBar
              SetShownEntries={SetShownEntries}
              emotionEntries={emotionEntries}
            />

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
    </StyledWrapper>
  );
}
