import useLocalStorageState from "use-local-storage-state";
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
  margin: 4rem;
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
  setEmotionEntries,
  onDeleteAll,
  onReplaceUserData,
  onRestore,
  backupEntries,
}) {
  const [daysGoingBack, setDaysGoingBack] = useState(1);
  const [shownEntries, setShownEntries] = useState([]);
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
  function handleRestoreShown() {
    setShownEntries(backupEntries);
  }
  function nullishFunction() {
    //Yeah, it does nothing!
  }

  return (
    <StyledFlexColumnWrapper>
      <StyledPageHeader>
        <DataGenerator
          onDeleteAll={onDeleteAll}
          onReplaceUserData={onReplaceUserData}
          onRestore={onRestore}
          restoreShown={handleRestoreShown}
          daysGoingBack={daysGoingBack}
          setDaysGoingBack={setDaysGoingBack}
          backupEntries={backupEntries}
          shownEntries={shownEntries}
          setShownEntries={setShownEntries}
          emotionEntries={emotionEntries}
          setEmotionEntries={setEmotionEntries}
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
          onDeleteEmotionEntry={nullishFunction}
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
