import { useState, useEffect } from "react";
import styled from "styled-components";
import TrashIcon from "../public/icons/trash-icon.svg";
import PencilIcon from "../public/icons/pencil.svg";
import ConfirmMessage from "./ConfirmMessage";
import { useRouter } from "next/router";
import { StyledList } from "@/SharedStyledComponents";
import DetailsSection from "./EmotionRecordsDetails";
import HighlightIcon from "../public/icons/highlight-icon.svg";
import HighlightIconMarked from "../public/icons/highlight-icon-marked.svg";
import getCurrentTimeAndDate from "@/utils/getCurrentTimeAndDate";

const StyledRecordsList = styled(StyledList)`
  padding: 0;
  margin: 1rem auto;
  text-align: left;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 80vw;
  max-width: 575px;
`;

const StyledRecordListItem = styled.li`
  background-color: var(--section-background);
  border: 1px solid var(--main-dark);
  border-radius: 6px;
`;

const StyledItemInfo = styled.article`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  position: relative;

  &::after {
    content: "";
    display: ${({ $showDetails }) => ($showDetails ? "none" : "block")};
    position: absolute;
    bottom: 1px;
    height: 5px;
    width: ${({ $width }) => `${$width}%`};
    background-color: var(--main-dark);
  }
`;

const StyledParagraph = styled.p`
  color: var(--main-dark);
  border-radius: 6px;
  padding: 0.5rem;
  display: flex;
  justify-content: center;
  width: 90%;
  cursor: pointer;
`;

const StyledIconWrapper = styled.article`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 0 1rem;
  position: relative;
  width: 20%;

  & > svg {
    padding: 0.3rem 0;
  }

  &::after {
    content: "";
    position: absolute;
    left: 0;
    top: 5%;
    height: 90%;
    width: 1px;
    background-color: var(--main-dark);
  }
`;

const StyledDeleteButton = styled(TrashIcon)`
  width: 1.5rem;

  fill: var(--main-dark);
  &:hover {
    cursor: pointer;
  }
`;

const StyledEditButton = styled(PencilIcon)`
  width: 1.5rem;

  fill: var(--main-dark);
  &:hover {
    cursor: pointer;
  }
`;

const StyledHighlight = styled(HighlightIcon)`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
`;

const StyledMarkedHighlight = styled(HighlightIconMarked)`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
`;

export default function EmotionRecordsList({
  shownEntries,
  onDeleteEmotionEntry,
  toggleHighlight,
  editFromDevControls,
  useExampleData,
  buttonState,
  locale,
}) {
  const [showDetails, setShowDetails] = useState({});

  const [showConfirmMessage, setShowConfirmMessage] = useState(false);

  useEffect(() => {
    setShowDetails(false);
  }, [buttonState]);

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

  function sortEntries(a, b) {
    if (a.isoDate > b.isoDate) {
      return -1;
    }
    if (a.isoDate < b.isoDate) {
      return 1;
    }
    return 0;
  }

  function getLabel(time, formattedTime) {
    const today = new Date();
    const yesterday = new Date(new Date().setDate(today.getDate() - 1));
    const entryDate = new Date(time);

    if (today.toDateString() === entryDate.toDateString()) {
      return `Today, ${formattedTime.slice(-5)}`;
    } else if (yesterday.toDateString() === entryDate.toDateString()) {
      return `Yesterday, ${formattedTime.slice(-5)}`;
    } else {
      return formattedTime;
    }
  }

  return (
    <>
      <StyledRecordsList $showConfirmMessage={showConfirmMessage}>
        {shownEntries
          .sort(sortEntries)
          .map(
            ({
              id,
              _id,
              timeStamp,
              tensionLevel,
              isoDate,
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
                    <StyledItemInfo
                      $showDetails={showDetails[useExampleData ? id : _id]}
                      $width={(tensionLevel / 100) * 0.82 * 100}
                    >
                      {isHighlighted ? (
                        <StyledMarkedHighlight
                          onClick={() =>
                            toggleHighlight(useExampleData ? id : _id)
                          }
                        />
                      ) : (
                        <StyledHighlight
                          onClick={() =>
                            toggleHighlight(useExampleData ? id : _id)
                          }
                        />
                      )}

                      <StyledParagraph
                        onClick={() =>
                          handleShowDetails(useExampleData ? id : _id)
                        }
                      >
                        {getLabel(
                          isoDate,
                          getCurrentTimeAndDate(locale, timeStamp)
                        )}
                      </StyledParagraph>
                      <StyledIconWrapper>
                        <StyledEditButton
                          aria-label="Edit emotion entry"
                          onClick={() =>
                            editFromDevControls
                              ? router.push(`edit/${id}`)
                              : router.push(
                                  `./edit/${useExampleData ? id : _id}`
                                )
                          }
                        />
                        <StyledDeleteButton
                          type="button"
                          aria-label="Delete Emotion Entry"
                          onClick={() => {
                            handleShowConfirmMessage(useExampleData ? id : _id);
                          }}
                        />
                      </StyledIconWrapper>
                    </StyledItemInfo>
                    <DetailsSection
                      listItems={{
                        tensionLevel: `${tensionLevel}`,
                        emotion,
                        subemotion,
                        intensity,
                        category,
                        trigger,
                        notes,
                      }}
                      showDetails={showDetails[useExampleData ? id : _id]}
                    />
                  </StyledRecordListItem>
                  {showConfirmMessage[useExampleData ? id : _id] && (
                    <ConfirmMessage
                      toggleMessage={handleShowConfirmMessage}
                      itemId={useExampleData ? id : _id}
                      itemText={getCurrentTimeAndDate(locale, timeStamp)}
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
