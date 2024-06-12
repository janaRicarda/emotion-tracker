import { useState } from "react";
import styled from "styled-components";
import TrashIcon from "../public/icons/trash-icon.svg";
import PencilIcon from "../public/icons/pencil.svg";
import ConfirmMessage from "./ConfirmMessage";
import { useRouter } from "next/router";
import { StyledList } from "@/SharedStyledComponents";
import HeartOutlineIcon from "../public/icons/heart-outline.svg";
import HeartFilledIcon from "../public/icons/heart-filled.svg";
import { breakpoints } from "@/utils/breakpoints";
import { useTranslation } from "next-i18next";

const StyledRecordsList = styled(StyledList)`
  padding: 0;
  margin: 1rem auto;
  text-align: left;
  width: 80vw;
  @media ${breakpoints.tablet} {
    width: 50vw;
    margin-top: 0;
    margin-left: 30vw;
  }
  @media ${breakpoints.laptop} {
    width: 40vw;
    margin-top: 0;
    margin-left: 40%;
  }
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
  background: var(--main-bright);
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
  useExampleData,
}) {
  const [showDetails, setShowDetails] = useState({});

  const [showConfirmMessage, setShowConfirmMessage] = useState(false);

  const router = useRouter();
  const { t: translate } = useTranslation(["common"]);

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

  function sortEntries(a, b) {
    if (a.isoDate > b.isoDate) {
      return -1;
    }
    if (a.isoDate < b.isoDate) {
      return 1;
    }
    return 0;
  }

  return (
    <>
      <StyledRecordsList $showConfirmMessage={showConfirmMessage}>
        {shownEntries.length !== 0 && (
          <p>
            {translate("results")} {shownEntries.length}
          </p>
        )}
        {shownEntries
          .sort(sortEntries)
          .map(
            ({
              id,
              _id,
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
                <section key={useExampleData ? id : _id}>
                  <StyledRecordListItem>
                    <StyledParagraph
                      onClick={() =>
                        handleShowDetails(useExampleData ? id : _id)
                      }
                    >
                      {timeAndDate}
                    </StyledParagraph>
                    <StyledEditButton
                      aria-label="Edit emotion entry"
                      onClick={() =>
                        editFromDevControls
                          ? router.push(`edit/${useExampleData ? id : _id}`)
                          : router.push(`./edit/${useExampleData ? id : _id}`)
                      }
                    />
                    <StyledDeleteButton
                      type="button"
                      aria-label="Delete Emotion Entry"
                      onClick={() => {
                        handleShowConfirmMessage(useExampleData ? id : _id);
                      }}
                    />
                    {isHighlighted ? (
                      <StyledFilledButton
                        onClick={() =>
                          toggleHighlight(useExampleData ? id : _id)
                        }
                      />
                    ) : (
                      <StyledOutlineButton
                        onClick={() =>
                          toggleHighlight(useExampleData ? id : _id)
                        }
                      />
                    )}
                  </StyledRecordListItem>
                  {showConfirmMessage[useExampleData ? id : _id] && (
                    <ConfirmMessage
                      toggleMessage={handleShowConfirmMessage}
                      itemId={useExampleData ? id : _id}
                      itemText={timeAndDate}
                      confirmFunction={onDeleteEmotionEntry}
                      cancelButtonText={translate("keepEntry")}
                      confirmButtonText={translate("deleteEntry")}
                      cancelButtonColor={"var(--green)"}
                      confirmButtonColor={"var(--red)"}
                    >
                      {translate("deleteEntryConfirmationQuestion")}
                    </ConfirmMessage>
                  )}
                  <StyledDetails
                    $showDetails={showDetails[useExampleData ? id : _id]}
                  >
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
