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
  padding-bottom: 0.5rem;
  background: linear-gradient(var(--main-bright) 90%, transparent);
`;

export default function EmotionRecords({ emotionEntries }) {
  return (
    <>
      <StyledWrapper>
        <StyledTitle>Recorded Emotions</StyledTitle>
        <EmotionRecordsList emotionEntries={emotionEntries} />
      </StyledWrapper>
    </>
  );
}
