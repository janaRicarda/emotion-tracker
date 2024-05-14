import { useState } from "react";
import styled from "styled-components";
import TrashIcon from "../public/trash-icon.svg";
import PencilIcon from "../public/pencil.svg";
import ConfirmMessage from "./ConfirmMessage";
import { useRouter } from "next/router";
import { StyledList } from "@/SharedStyledComponents";
import HeartOutlineIcon from "../public/heart-outline.svg";
import HeartFilledIcon from "../public/heart-filled.svg";
import Link from "next/link";
import CalendarIcon from "/public/calendar.svg";

const StyledRecordsList = styled(StyledList)`
  padding: 0;
  margin: 11rem auto 1rem;
  text-align: left;
`;

const StyledCalendarIcon = styled(CalendarIcon)`
  width: 1.5rem;
  display: inline;
  vertical-align: bottom;
`;

const StyledRecordListItem = styled.li`
  position: relative;
`;

const StyledParagraph = styled.p`
  border: 1px solid var(--main-dark);
  border-radius: 6px;
  margin: 0.5rem auto;
  padding: 1rem;
  box-shadow: 0 0 3px 0;
  width: 80vw;
  cursor: pointer;
  &:hover {
    background-color: var(--button-background);
  }
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
const StyledTextMessage = styled.p`
  margin-top: 12rem;
  text-align: center;
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

const StyledLink = styled(Link)`
  text-decoration: none;
  border: 1px solid var(--main-dark);
  position: relative;
  top: 1rem;
  padding: 0.5rem;
  background-color: var(--button-background);
  border-radius: 6px;
  color: var(--main-dark);
`;

const StyledHeartSymbol = styled(HeartOutlineIcon)`
  width: 1.4rem;
  display: inline;
  position: relative;
  top: 5px;
`;

const StyledDateIndicator = styled.p`
  text-align: center;
  margin: 0 auto 0.7rem;
`;

export default function EmotionRecordsList({
  shownEntries,
  onDeleteEmotionEntry,
  toggleHighlight,
  filteredEntries,
  buttonState,
  selectedTime,
  searchTerm,
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

  function getFormattedDate(selectedDate) {
    const date = new Intl.DateTimeFormat(`de`, {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(selectedDate);

    return date;
  }

  return (
    <>
      {shownEntries.length === 0 &&
        (filteredEntries.length === 0 ? (
          buttonState.highlightedButton ? (
            <StyledTextMessage>
              You haven&apos;t highlighted any Entries yet. Click the{" "}
              <StyledHeartSymbol /> on a Entry to highlight it.`
            </StyledTextMessage>
          ) : buttonState.todayButton ? (
            <StyledTextMessage>
              You haven&apos;t made any Entries today.<br></br>
              <StyledLink href="./">add Entry &rarr;</StyledLink>
            </StyledTextMessage>
          ) : (
            <StyledTextMessage>sorry, nothing found</StyledTextMessage>
          )
        ) : (
          <StyledTextMessage>sorry, nothing found</StyledTextMessage>
        ))}
      <StyledRecordsList>
        {buttonState.datePicker && !searchTerm ? (
          selectedTime ? (
            <StyledDateIndicator>
              Your Selection:<br></br>
              {getFormattedDate(selectedTime.from)}
              {selectedTime.to &&
                selectedTime.from.toString() !== selectedTime.to.toString() &&
                " - " + getFormattedDate(selectedTime.to)}
            </StyledDateIndicator>
          ) : (
            <StyledDateIndicator>
              Click the calendar <StyledCalendarIcon /> and select a date
            </StyledDateIndicator>
          )
        ) : null}
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
                </StyledRecordListItem>
                {showConfirmMessage[id] && (
                  <ConfirmMessage
                    toggleMessage={handleShowConfirmMessage}
                    itemId={id}
                    itemText={timeAndDate}
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
              </section>
            );
          }
        )}
      </StyledRecordsList>
    </>
  );
}
