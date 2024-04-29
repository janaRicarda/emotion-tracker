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
  z-index: 2;
  padding-bottom: 1rem;
  background: linear-gradient(transparent, var(--main-bright), transparent);
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
