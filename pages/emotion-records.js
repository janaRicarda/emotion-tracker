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
  //border: 1px solid black;
  background: linear-gradient(transparent 5%, var(--main-bright), transparent);
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
