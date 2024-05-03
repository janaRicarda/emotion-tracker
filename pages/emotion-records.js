import EmotionRecordsList from "@/components/EmotionRecordsList";
import styled from "styled-components";
import SearchBar from "@/components/SearchBar";

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
  const filteresEmotionEntries = emotionEntries.filter(
    (entry) => entry.searchTerm
  );

  return (
    <StyledWrapper>
      <StyledTitle>Recorded Emotions</StyledTitle>
      <SearchBar />
      <EmotionRecordsList
        onDeleteEmotionEntry={onDeleteEmotionEntry}
        emotionEntries={emotionEntries}
      />
    </StyledWrapper>
  );
}
