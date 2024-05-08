import EmotionRecordsList from "@/components/EmotionRecordsList";
import {
  StyledFlexColumnWrapper,
  StyledTitle,
  StyledButton,
} from "@/SharedStyledComponents";
import styled from "styled-components";
import { useState } from "react";

const StyledHighlightButton = styled(StyledButton)`
  font-size: 1rem;
  border: 1px solid var(--main-dark);
  width: fit-content;
  margin: 0;
  padding: 0.3rem;
`;

export default function EmotionRecords({
  emotionEntries,
  onDeleteEmotionEntry,
  toggleHighlight,
}) {
  const [isHighlighted, setIsHighlighted] = useState(false);

  function handleShowHighlighted() {
    setIsHighlighted(!isHighlighted);
  }
  return (
    <StyledFlexColumnWrapper>
      <StyledTitle>
        Recorded Emotions
        <span>
          <StyledHighlightButton onClick={handleShowHighlighted}>
            {isHighlighted ? "Show all Entries" : "Show highlighted Entries"}
          </StyledHighlightButton>
        </span>
      </StyledTitle>

      <EmotionRecordsList
        onDeleteEmotionEntry={onDeleteEmotionEntry}
        emotionEntries={
          isHighlighted
            ? emotionEntries.filter((entry) => entry.isHighlighted)
            : emotionEntries
        }
        toggleHighlight={toggleHighlight}
      />
    </StyledFlexColumnWrapper>
  );
}
