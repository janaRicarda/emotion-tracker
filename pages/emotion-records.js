import EmotionRecordsList from "@/components/EmotionRecordsList";
import styled from "styled-components";
import { useState } from "react";

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
  padding: 1rem;
  background-color: var(--main-bright);
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
  const [showHighlighted, setShowHighlighted] = useState(false);

  function handleShowHighlighted() {
    setShowHighlighted(!showHighlighted);
  }
  return (
    <StyledWrapper>
      <StyledTitle>
        Recorded Emotions{" "}
        <span>
          <StyledHighlightButton onClick={handleShowHighlighted}>
            {showHighlighted ? "Show all Entries" : "Show highlighted Entries"}
          </StyledHighlightButton>
        </span>
      </StyledTitle>

      <EmotionRecordsList
        onDeleteEmotionEntry={onDeleteEmotionEntry}
        emotionEntries={
          showHighlighted
            ? emotionEntries.filter((entry) => entry.highlighted)
            : emotionEntries
        }
        toggleHighlight={toggleHighlight}
      />
    </StyledWrapper>
  );
}
