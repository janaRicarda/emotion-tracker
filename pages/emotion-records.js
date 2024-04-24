import EmotionRecordsList from "@/components/EmotionRecordsList";

import styled from "styled-components";

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledTitle = styled.h1`
  //margin: 1.5rem auto 1rem;
  position: fixed;
  padding-bottom: 0.5rem;
  //border-bottom: 1px solid black;
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
