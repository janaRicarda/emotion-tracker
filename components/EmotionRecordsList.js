import { useState } from "react";
import styled from "styled-components";
import TrashIcon from "../public/trash-icon.svg";
import PencilIcon from "../public/pencil.svg";
import ConfirmMessage from "./ConfirmMessage";
import { useRouter } from "next/router";
import { StyledList } from "@/SharedStyledComponents";
import OutlineCircle from "../public/outline-circle.svg";
import Circle from "../public/circle.svg";

const StyledRecordsList = styled(StyledList)`
  padding: 0;
  margin: 1rem auto;
  text-align: left;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const StyledRecordListItem = styled.li`
  background-color: var(--section-background);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  //justify-content: space-between;
  //align-items: center;
  padding: 0.5rem 0 0.5rem 0;
  border: 1px solid var(--main-dark);
  border-radius: 6px;
  //height: inset;
  width: 86vw;
`;

const StyledItemInfo = styled.article`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const StyledParagraph = styled.p`
  color: var(--main-dark);
  cursor: pointer;
`;

const StyledDetails = styled(StyledList)`
  display: ${({ $showDetails }) => ($showDetails ? "block" : "none")};
  padding: 0.5rem;
  border-top: 1px solid var(--main-dark);
`;

const StyledIconWrapper = styled.article`
  display: flex;
`;

const StyledDeleteButton = styled(TrashIcon)`
  width: 1.6rem;

  fill: var(--main-dark);
  &:hover {
    cursor: pointer;
  }
`;

const StyledEditButton = styled(PencilIcon)`
  width: 1.6rem;

  fill: var(--main-dark);
  &:hover {
    cursor: pointer;
  }
`;

const StyledOutLineCircle = styled(OutlineCircle)`
  width: 2rem;
  fill: var(--contrast-bright);
`;

const StyledCircle = styled(Circle)`
  width: 2rem;
  fill: var(--contrast-bright);
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

  //const { emotion: emotionColor } = shownEntries;
  //const color = emotionColor.toLowerCase();

  return (
    <>
      <StyledRecordsList $showConfirmMessage={showConfirmMessage}>
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
                  <StyledItemInfo>
                    {isHighlighted ? (
                      <StyledCircle onClick={() => toggleHighlight(id)} />
                    ) : (
                      <StyledOutLineCircle
                        onClick={() => toggleHighlight(id)}
                      />
                    )}
                    <StyledParagraph onClick={() => handleShowDetails(id)}>
                      {timeAndDate}
                    </StyledParagraph>
                    <StyledIconWrapper>
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
                    </StyledIconWrapper>
                  </StyledItemInfo>
                  <StyledDetails $showDetails={showDetails[id]}>
                    <li>Tension Level: {tensionLevel}%</li>
                    {emotion && <li>Emotion: {emotion}</li>}
                    {subemotion && <li>Subemotion: {subemotion}</li>}
                    {intensity && <li>Intensity: {intensity}%</li>}
                    {category && <li>Pleasantness: {category}%</li>}
                    {trigger && <li>Trigger: {trigger}</li>}
                    {notes && <li>Notes: {notes}</li>}
                  </StyledDetails>
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
              </section>
            );
          }
        )}
      </StyledRecordsList>
    </>
  );
}
