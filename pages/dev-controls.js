import styled from "styled-components";
import { useState } from "react";
import EmotionRecordsList from "@/components/EmotionRecordsList";
import {
  StyledButton,
  StyledFlexColumnWrapper,
} from "@/SharedStyledComponents";
import DataGenerator from "../components/DataGenerator";

const StyledPageHeader = styled.section`
  width: 100%;
  background-color: var(--main-bright);
  padding: 2rem 0.5rem 0.5rem;
  margin: 1rem 1rem 8rem;
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 80px;
  height: fit-content;
  z-index: 1;
`;

const StyledSpacer = styled.p`
  margin: 5rem;
`;

const StyledHighlightButton = styled(StyledButton)`
  font-size: 1rem;
  width: fit-content;
  margin: 0;
  padding: 0.3rem;
`;

export default function GenerateAndDisplay({
  toggleHighlight,
  emotionEntries,
  onDeleteAll,
  onReplaceUserData,
  backupEntries,
  onDeleteEmotionEntry,
}) {
  const [shownEntries, setShownEntries] = useState(emotionEntries);
  const [showDetails, setShowDetails] = useState({});
  const [showConfirmMessage, setShowConfirmMessage] = useState(false);
  const [isHighlighted, setIsHighlighted] = useState(false);

  function handleShowHighlighted() {
    setIsHighlighted(!isHighlighted);
  }

  function handleShowDetails(id) {
    setShowDetails((prevShow) => ({
      ...prevShow,
      [id]: !prevShow[id],
    }));
  }
  function updateWithGeneratedData(newData) {
    setShownEntries(newData);
  }

  function handleRestoreShown() {
    setShownEntries(backupEntries);
  }

  function handleDeleteShown() {
    onDeleteAll();
    setShownEntries([]);
  }

  return (
    <StyledFlexColumnWrapper>
      <StyledPageHeader>
        <DataGenerator
          onGenerate={updateWithGeneratedData}
          onDeleteAll={handleDeleteShown}
          onReplaceUserData={onReplaceUserData}
          onRestore={handleRestoreShown}
          backupEntries={backupEntries}
          shownEntries={shownEntries}
          emotionEntries={emotionEntries}
          // setEmotionEntries={setEmotionEntries}
        />

        {shownEntries.length !== 0 && (
          <>
            <StyledHighlightButton onClick={handleShowHighlighted}>
              {isHighlighted ? "Show all Entries" : "Show highlighted Entries"}
            </StyledHighlightButton>
          </>
        )}
      </StyledPageHeader>
      <StyledSpacer></StyledSpacer>
      {shownEntries.length !== 0 && (
        <EmotionRecordsList
          emotionEntries={shownEntries}
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
    </StyledFlexColumnWrapper>
  );
}
