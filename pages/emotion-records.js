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

export default function EmotionRecords({
  emotionEntries,
  onDeleteEmotionEntry,
}) {
  const [shownEntries, SetShownEntries] = useState(emotionEntries);

  return (
    <StyledWrapper>
      <StyledTitle>Recorded Emotions</StyledTitle>
      <SearchBar
        SetShownEntries={SetShownEntries}
        emotionEntries={emotionEntries}
      />

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
    </StyledWrapper>
  );
}
