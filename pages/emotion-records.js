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

const StyledTitle = styled.h1`
  width: 100%;
  text-align: center;
  font-weight: 500;
  position: fixed;
  top: 100px;
  z-index: 1;
  padding: 0.5rem;
  background-color: var(--main-bright);
`;
const StyledTextMessage = styled.p`
  margin-top: 100px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  padding: 3px;
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
      <StyledTitle>Recorded Emotions</StyledTitle>
      <StyledHighlightButton onClick={handleShowHighlighted}>
            {isHighlighted ? "Show all Entries" : "Show highlighted Entries"}
          </StyledHighlightButton>
      <SearchBar
        SetShownEntries={SetShownEntries}
        emotionEntries={emotionEntries} />

  


      <EmotionRecordsList
        onDeleteEmotionEntry={onDeleteEmotionEntry}
        emotionEntries={
          isHighlighted
            ? emotionEntries.filter((entry) => entry.isHighlighted)
            : emotionEntries
        }
        toggleHighlight={toggleHighlight}

     

      {emotionEntries.length === 0 && (
        <StyledTextMessage>
          You haven&apos;t made any Entries yet! Make a{" "}
          <StyledLink href="./">new Entry</StyledLink>
        </StyledTextMessage>
      )}

      {emotionEntries.length !== 0 && (
        <EmotionRecordsList
          onDeleteEmotionEntry={onDeleteEmotionEntry}
          shownEntries={shownEntries}
       />
      )}
      />
    </StyledWrapper>
  );
}
