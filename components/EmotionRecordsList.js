import { useState } from "react";
import styled from "styled-components";
import TrashIcon from "../public/icons/trash-icon.svg";
import PencilIcon from "../public/icons/pencil.svg";
import ConfirmMessage from "./ConfirmMessage";
import { useRouter } from "next/router";
import { StyledList } from "@/SharedStyledComponents";
import HighlightIcon from "../public/highlight-icon.svg";
import { breakpoints } from "@/utils/breakpoints";
import DetailsSection from "./EmotionRecordsDetails";

const StyledRecordsList = styled(StyledList)`
  padding: 0;
  margin: 1rem auto;
  text-align: left;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 86vw;
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
  background-color: var(--section-background);
  border: 1px solid var(--main-dark);
  border-radius: 6px;
`;

const StyledItemInfo = styled.article`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const StyledParagraph = styled.p`
  color: var(--main-dark);
  border-radius: 6px;
  margin: 0.5rem auto;
  padding: 0.5rem;
  cursor: pointer;
`;

const StyledIconWrapper = styled.article`
  display: flex;
  flex-direction: column;
  padding: 0 1rem;
  position: relative;

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

const StyledHighlight = styled(HighlightIcon)`
  width: 2.5rem;
  height: 2.5rem;
  fill: var(--main-dark);
  stroke: var(--main-dark);
  color: var(--main-dark);
  border-radius: 50%;
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
        {shownEntries.length !== 0 && <p>Results: {shownEntries.length}</p>}
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
                    <StyledItemInfo>
                      <StyledHighlight
                        onClick={() =>
                          toggleHighlight(useExampleData ? id : _id)
                        }
                        $highlighted={isHighlighted}
                      />
                      <StyledParagraph
                        onClick={() =>
                          handleShowDetails(useExampleData ? id : _id)
                        }
                      >
                        {timeAndDate}
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
