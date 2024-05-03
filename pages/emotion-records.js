import EmotionRecordsList from "@/components/EmotionRecordsList";
import styled from "styled-components";

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

export default function EmotionRecords({
  emotionEntries,
  onDeleteEmotionEntry,
}) {
  return (
    <StyledWrapper>
      <StyledTitle>Recorded Emotions</StyledTitle>
      <EmotionRecordsList
        onDeleteEmotionEntry={onDeleteEmotionEntry}
        emotionEntries={emotionEntries}
      />
    </StyledWrapper>
  );
}
