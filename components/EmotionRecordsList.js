import { useState } from "react";
import styled from "styled-components";
import TrashIcon from "../public/trash-icon.svg";
import ConfirmMessage from "./ConfirmDeleteMessage";

const StyledList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 auto 1rem;
  text-align: left;
`;

const StyledListItemWrapper = styled.div`
  position: relative;
`;

const StyledListItem = styled.li`
  margin: 1rem auto;
  border: 1px solid black;
  border-radius: 5px;
  padding: 1rem;
  box-shadow: 0 0 3px 0;
  cursor: pointer;

  &:hover {
    background-color: lightskyblue;
  }
`;

const StyledDetails = styled.ul`
  display: ${({ $showDetails }) => ($showDetails ? "block" : "none")};
  padding: 0 1rem;
  margin-bottom: 2rem;
`;

const StyledDeleteButton = styled(TrashIcon)`
  width: 2rem;
  position: absolute;
  top: -1rem;
  right: -1rem;

  &:hover {
    cursor: pointer;
  }
`;

export default function EmotionRecordsList({
  emotionEntries,
  onDeleteEmotionEntry,
}) {
  const [showDetails, setShowDetails] = useState({});

  const [showConfirmMessage, setShowConfirmMessage] = useState(false);

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
    <StyledList>
      {emotionEntries.map(
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
        }) => {
          return (
            <>
              <StyledListItemWrapper>
                <StyledListItem key={id} onClick={() => handleShowDetails(id)}>
                  {date}
                </StyledListItem>
                <StyledDeleteButton
                  type="button"
                  aria-label="Delete Emotion Entry"
                  onClick={() => {
                    handleShowConfirmMessage(id);
                  }}
                />
              </StyledListItemWrapper>
              {showConfirmMessage[id] && (
                <ConfirmMessage
                  toggleMessage={handleShowConfirmMessage}
                  itemId={id}
                  itemText={date}
                  confirmFunction={onDeleteEmotionEntry}
                  cancelButtonText={"Keep it!"}
                  confirmButtonText={"Delete it!"}
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
  );
}
