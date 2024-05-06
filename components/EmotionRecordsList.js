import { useState } from "react";
import styled from "styled-components";
import TrashIcon from "../public/trash-icon.svg";
import PencilIcon from "../public/pencil.svg";
import ConfirmMessage from "./ConfirmMessage";
import { useRouter } from "next/router";
import HeartOutlineIcon from "../public/heart-outline.svg";
import HeartFilledIcon from "../public/heart-filled.svg";

const StyledList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 8rem auto 1rem;
  text-align: left;
`;

const StyledListItemWrapper = styled.div`
  position: relative;
`;

const StyledListItem = styled.li`
  margin: 0.5rem auto;
  border: 1px solid var(--main-dark);
  border-radius: 0.5rem;
  padding: 1rem;
  box-shadow: 0 0 3px 0;
  width: 80vw;
  cursor: pointer;
  &:hover {
    background-color: var(--button-background);
  }
`;

const StyledDetails = styled.ul`
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
const StyledTextMessage = styled.p`
  margin-top: 150px;
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

const StyledP = styled.p`
  margin-top: 50px;
`;

export default function EmotionRecordsList({
  emotionEntries,
  shownEntries,
  onDeleteEmotionEntry,
  toggleHighlight,
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
      {shownEntries.length === 0 && (
        <StyledTextMessage>sorry, no results</StyledTextMessage>
      )}
      {/* {shownEntries.length === 0 && <StyledP>No highlighted entries</StyledP>} */}
      <StyledList>
        {shownEntries?.map(
          ({
            id,
            date,
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
              <>
                <StyledListItemWrapper key={id}>
                  <StyledListItem onClick={() => handleShowDetails(id)}>
                    {date}
                  </StyledListItem>
                  <StyledEditButton
                    aria-label="Edit emotion entry"
                    onClick={() => router.push(`./edit/${id}`)}
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
                </StyledListItemWrapper>
                {showConfirmMessage[id] && (
                  <ConfirmMessage
                    toggleMessage={handleShowConfirmMessage}
                    itemId={id}
                    itemText={date}
                    confirmFunction={onDeleteEmotionEntry}
                    cancelButtonText={"Keep it!"}
                    confirmButtonText={"Delete it!"}
                    cancelButtonColor={"#00b400"}
                    confirmButtonColor={"#cc0100"}
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
              </>
            );
          }
        )}
      </StyledList>
    </>
  );
}
