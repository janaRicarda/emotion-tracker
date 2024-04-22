import EmotionRecordsList from "@/components/EmotionRecordsList";
import Link from "next/link";
import styled from "styled-components";


const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
  margin: 1rem;
  padding: 1rem;
  border-radius: 8.5px;
  &:hover {
    background-color: lightskyblue;
  }
`;

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledTitle = styled.h1`
  margin: 1.5rem auto 1rem;
`;

export default function EmotionRecords({
  emotionEntries,
  onDeleteEmotionEntry,
}) {
  return (
    <>
      <StyledWrapper>
        <StyledTitle>Recorded Emotions</StyledTitle>
        <EmotionRecordsList
          onDeleteEmotionEntry={onDeleteEmotionEntry}
          emotionEntries={emotionEntries}
        />
      </StyledWrapper>
      <StyledLink href="/">← Back to tension entry</StyledLink>
    </>
  );
}
