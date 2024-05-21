import styled from "styled-components";
import { useEffect, useState } from "react";
import {
  StyledButton,
  StyledFlexColumnWrapper,
} from "@/SharedStyledComponents";
import DataGenerator from "../components/DataGenerator";
import EmotionRecordsList from "@/components/EmotionRecordsList";
// import dynamic from "next/dynamic";

// const EmotionRecordsList = dynamic(
//   () => import("../components/EmotionRecordsList"),
//   { ssr: false }
// );

EmotionRecordsList;

const StyledDevSection = styled.section`
  width: 85vw;
  background-color: var(--main-bright);
  padding: 1rem 1rem 1rem;
  margin: 1rem 1rem 3rem;
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 60px;
  height: fit-content;
  z-index: 1;
`;

const StyledSpacer = styled.div`
  width: 100%;
  margin: 2rem 2rem 7rem;
  padding: 2rem 2rem 3rem;
`;

const StyledHighlightButton = styled(StyledButton)`
  font-size: 0.8rem;
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

  const [isHighlighted, setIsHighlighted] = useState(false);

  useEffect(() => {
    setShownEntries(emotionEntries);
  }, [emotionEntries]);

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
      <StyledDevSection>
        <DataGenerator
          onGenerate={updateWithGeneratedData}
          onDeleteAll={handleDeleteShown}
          onReplaceUserData={onReplaceUserData}
          onRestore={handleRestoreShown}
          backupEntries={backupEntries}
          shownEntries={shownEntries}
          emotionEntries={emotionEntries}
        />

        {shownEntries.length !== 0 && (
          <>
            <StyledHighlightButton onClick={handleShowHighlighted}>
              {isHighlighted ? "Show all Entries" : "Show highlighted Entries"}
            </StyledHighlightButton>
          </>
        )}
      </StyledDevSection>
      <StyledSpacer />
      {shownEntries.length !== 0 && (
        <EmotionRecordsList
          emotionEntries={shownEntries}
          onDeleteEmotionEntry={onDeleteEmotionEntry}
          editFromDevControls={true}
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
