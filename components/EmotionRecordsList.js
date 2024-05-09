import { useState } from "react";
import styled from "styled-components";
import TrashIcon from "../public/trash-icon.svg";
import PencilIcon from "../public/pencil.svg";
import ConfirmMessage from "./ConfirmMessage";
import { useRouter } from "next/router";
import HeartOutlineIcon from "../public/heart-outline.svg";
import HeartFilledIcon from "../public/heart-filled.svg";

const StyledUnorderedList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 9rem auto 1rem;
  text-align: left;
`;

const StyledListItem = styled.li`
  position: relative;
`;

const StyledParagraph = styled.p`
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

export default function EmotionRecordsList({
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
        <StyledTextMessage>Sorry, nothing found</StyledTextMessage>
      )}
      <StyledUnorderedList>
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
                <StyledListItem key={id}>
                  <StyledParagraph onClick={() => handleShowDetails(id)}>
                    {date}
                  </StyledParagraph>
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
                </StyledListItem>
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
      </StyledUnorderedList>
    </>
  );
}
