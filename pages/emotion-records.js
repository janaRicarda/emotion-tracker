import EmotionRecordsList from "@/components/EmotionRecordsList";
import styled from "styled-components";
import SearchBar from "@/components/SearchBar";
import { useState, useEffect } from "react";
import Link from "next/link";
import Fuse from "fuse.js";

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledPageHeader = styled.section`
  width: 100%;
  background-color: var(--main-bright);
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 100px;
  z-index: 1;
`;

const StyledTitle = styled.h1`
  font-weight: 500;
`;
const StyledTextMessage = styled.p`
  margin-top: 150px;
  text-align: center;
  line-height: 3;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  border: 1px solid var(--main-dark);
  padding: 0.5rem;
  background-color: var(--button-background);
  border-radius: 6px;
  color: var(--main-dark);
`;

const StyledToggleButton = styled.button`
  font-size: 1rem;
  width: 100px;
  border: 1px solid var(--main-dark);
  border-radius: 6px;
  background-color: ${({ $active }) => $active && "var(--button-background)"};
  color: var(--main-dark);
`;

const StyledButtonGroup = styled.div`
  display: flex;
  gap: 10px;
`;

export default function EmotionRecords({
  emotionEntries,
  onDeleteEmotionEntry,
  toggleHighlight,
}) {
  const [searchTerm, setSearchTerm] = useState();
  const [shownEntries, setShownEntries] = useState(emotionEntries);
  const [isHighlighted, setIsHighlighted] = useState("All");

  useEffect(() => {
    if (!searchTerm) {
      setShownEntries(emotionEntries);
      return;
    }

    const fuse = new Fuse(emotionEntries, {
      includeScore: true,
      threshold: 0.4,
      keys: [
        "date",
        "tensionLevel",
        "trigger",
        "intensity",
        "notes",
        "category",
        "emotion",
        "subemotion",
      ],
    });

    const results = fuse.search(searchTerm);
    const items = results.map((result) => result.item);
    setShownEntries(items);
  }, [emotionEntries, searchTerm]);

  function handleShowHighlighted() {
    setIsHighlighted(!isHighlighted);
  }

  function handleSearch(input) {
    setSearchTerm(input);
  }

  return (
    <StyledWrapper>
      <StyledPageHeader>
        <StyledTitle>Recorded Emotions</StyledTitle>

        {emotionEntries.length !== 0 && (
          <>
            <SearchBar onSearch={handleSearch} />
            <StyledButtonGroup>
              <StyledToggleButton
                $active={isHighlighted === "All" ? true : false}
                onClick={() => setIsHighlighted("All")}
              >
                All
              </StyledToggleButton>
              <StyledToggleButton
                $active={isHighlighted === "Yesterday" ? true : false}
                onClick={() => setIsHighlighted("Yesterday")}
              >
                Yesterday
              </StyledToggleButton>
              <StyledToggleButton
                $active={isHighlighted === "Highlighted" ? true : false}
                onClick={() => {
                  handleShowHighlighted;
                  setIsHighlighted("Highlighted");
                }}
              >
                Highlighted
              </StyledToggleButton>
            </StyledButtonGroup>
          </>
        )}
      </StyledPageHeader>
      {emotionEntries.length === 0 && (
        <StyledTextMessage>
          You haven&apos;t made any Entries yet.<br></br>
          <StyledLink href="./">add Entry &rarr;</StyledLink>
        </StyledTextMessage>
      )}

      {emotionEntries.length !== 0 && (
        <EmotionRecordsList
          onDeleteEmotionEntry={onDeleteEmotionEntry}
          shownEntries={
            isHighlighted
              ? shownEntries.filter((entry) => entry.isHighlighted)
              : shownEntries
          }
          toggleHighlight={toggleHighlight}
          isHighlighted={isHighlighted}
        />
      )}
    </StyledWrapper>
  );
}
