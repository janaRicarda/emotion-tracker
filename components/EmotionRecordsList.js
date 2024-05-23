import { useState } from "react";
import styled from "styled-components";
import TrashIcon from "../public/trash-icon.svg";
import PencilIcon from "../public/pencil.svg";
import ConfirmMessage from "./ConfirmMessage";
import { useRouter } from "next/router";
import { StyledList } from "@/SharedStyledComponents";
import HeartOutlineIcon from "../public/heart-outline.svg";
import HeartFilledIcon from "../public/heart-filled.svg";

const StyledRecordsList = styled(StyledList)`
  padding: 0;
  margin: 1rem auto;
  text-align: left;
  z-index: -1;
`;

const StyledRecordListItem = styled.li`
  position: relative;
`;

const StyledParagraph = styled.p`
  color: var(--main-dark);
  border: 1px solid var(--main-dark);
  border-radius: 6px;
  margin: 0.5rem auto;
  padding: 1rem;
  width: 80vw;
  cursor: pointer;
`;

const StyledDetails = styled(StyledList)`
  display: ${({ $showDetails }) => ($showDetails ? "block" : "none")};
  padding: 0 1rem;
  margin-bottom: 2rem;
`;

const StyledDeleteButton = styled(TrashIcon)`
  width: 1.6rem;
  position: absolute;
  top: calc(50% - 0.8rem);
  right: 0.2rem;
  fill: var(--main-dark);
  &:hover {
    cursor: pointer;
  }
`;

const StyledEditButton = styled(PencilIcon)`
  width: 1.6rem;
  position: absolute;
  top: calc(50% - 0.8rem);
  right: 2rem;
  fill: var(--main-dark);
  &:hover {
    cursor: pointer;
  }
`;

const StyledOutlineButton = styled(HeartOutlineIcon)`
  width: 1.6rem;
  position: absolute;
  top: calc(50% - 2.4rem);
  right: -0.6rem;
  fill: var(--main-dark);
  &:hover {
    cursor: pointer;
  }
`;

const StyledFilledButton = styled(HeartFilledIcon)`
  width: 1.6rem;
  position: absolute;
  top: calc(50% - 2.4rem);
  right: -0.6rem;
  fill: var(--main-dark);
  &:hover {
    cursor: pointer;
  }
`;

export default function EmotionRecordsList({
  shownEntries,
  onDeleteEmotionEntry,
  toggleHighlight,
  editFromDevControls,
}) {
  const [showDetails, setShowDetails] = useState({});

  const [showConfirmMessage, setShowConfirmMessage] = useState(false);

  const router = useRouter();

  function handleShowDetails(id) {
    setShowDetails((prevShow) => ({
      ...prevShow,
      [id]: !prevShow[id],
    }));
  }

  function handleShowConfirmMessage(id) {
    setShowConfirmMessage((prevShow) => ({
      ...prevShow,
      [id]: !prevShow[id],
    }));
  }

  return (
    <>
      <StyledRecordsList>
        {shownEntries.length !== 0 && <p>Results: {shownEntries.length}</p>}
        {shownEntries.map(
          ({
            id,
            timeAndDate,
            tensionLevel,
            trigger,
            intensity,
            notes,
            category,
            emotion,
            subemotion,
            isHighlighted,
          }) => {
            return (
              <section key={id}>
                <StyledRecordListItem>
                  <StyledParagraph onClick={() => handleShowDetails(id)}>
                    {timeAndDate}
                  </StyledParagraph>
                  <StyledEditButton
                    aria-label="Edit emotion entry"
                    onClick={() =>
                      editFromDevControls
                        ? router.push(`edit/${id}`)
                        : router.push(`./edit/${id}`)
                    }
                  />
                  <StyledDeleteButton
                    type="button"
                    aria-label="Delete Emotion Entry"
                    onClick={() => {
                      handleShowConfirmMessage(id);
                    }}
                  />
                  {isHighlighted ? (
                    <StyledFilledButton onClick={() => toggleHighlight(id)} />
                  ) : (
                    <StyledOutlineButton onClick={() => toggleHighlight(id)} />
                  )}
                </StyledRecordListItem>
                {showConfirmMessage[id] && (
                  <ConfirmMessage
                    toggleMessage={handleShowConfirmMessage}
                    itemId={id}
                    itemText={timeAndDate}
                    confirmFunction={onDeleteEmotionEntry}
                    cancelButtonText={"Keep it!"}
                    confirmButtonText={"Delete it!"}
                    cancelButtonColor={"var(--green)"}
                    confirmButtonColor={"var(--red)"}
                  >
                    Do you want to delete this entry?
                  </ConfirmMessage>
                )}
                <StyledDetails $showDetails={showDetails[id]}>
                  <li>Tension Level: {tensionLevel}%</li>
                  {emotion && <li>Emotion: {emotion}</li>}
                  {subemotion && <li>Subemotion: {subemotion}</li>}
                  {intensity && <li>Intensity: {intensity}%</li>}
                  {category && <li>Pleasantness: {category}%</li>}
                  {trigger && <li>Trigger: {trigger}</li>}
                  {notes && <li>Notes: {notes}</li>}
                </StyledDetails>
              </section>
            );
          }
        )}
      </StyledRecordsList>
    </>
  );
}
