import { useState } from "react";
import styled from "styled-components";
import TrashIcon from "../public/trash-icon.svg";

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

const StyledConfirmBackground = styled.div`
  background-color: black;
  opacity: 0.5;
  position: fixed;
  inset: 0;
  z-index: 2;
`;
const StyledConfirmBox = styled.div`
  position: fixed;
  right: calc(50% - 175px);
  top: 13rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
  padding: 1.5rem;
  box-shadow: 0 0 5px 0px;
  border-radius: 10px;
  transform: ${({ $animation }) => ($animation ? "scale(1)" : "scale(0)")};
  transition: transform 0.3s;
  z-index: 3;
`;

const StyledConfirmMessage = styled.p`
  padding: 1.5rem;
  text-align: center;
`;

const StyledWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-evenly;
  align-items: center;
`;
const StyledButton = styled.button`
  color: white;
  background-color: ${({ $color }) => $color};
  border: none;
  border-radius: 5px;
  padding: 1rem;
`;
export default function EmotionRecordsList({
  emotionEntries,
  onDeleteEmotionEntry,
}) {
  const [showDetails, setShowDetails] = useState({});

  const [showConfirmMessage, setShowConfirmMessage] = useState(false);

  const [animation, setAnimation] = useState(false);

  function handleShowDetails(id) {
    setShowDetails((prevShow) => ({
      ...prevShow,
      [id]: !prevShow[id],
    }));
  }

  function toggleAnimatedConfirmMessage(id) {
    function handleShowConfirmMessage(id) {
      setShowConfirmMessage((prevShow) => ({
        ...prevShow,
        [id]: !prevShow[id],
      }));
    }
    // Gives Animation time to be active and seen after appearing/leaving the DOM
    if (!animation) {
      setTimeout(() => setAnimation(!animation), 1);
      handleShowConfirmMessage(id);
    } else {
      setTimeout(() => handleShowConfirmMessage(id), 200);
      setAnimation(!animation);
    }
  }

  return (
    <StyledList>
      {emotionEntries.map(({ id, date, tensionLevel }) => {
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
                  toggleAnimatedConfirmMessage(id);
                }}
              />
            </StyledListItemWrapper>
            {showConfirmMessage[id] && (
              <>
                <StyledConfirmBackground
                  onClick={() => toggleAnimatedConfirmMessage(id)}
                ></StyledConfirmBackground>
                <StyledConfirmBox $animation={animation}>
                  <StyledConfirmMessage>
                    Do you want to delete this Entry?
                    <StyledConfirmMessage>
                      <b>{date}</b>
                    </StyledConfirmMessage>
                  </StyledConfirmMessage>
                  <StyledWrapper>
                    <StyledButton
                      aria-label="do not delete this entry"
                      $color={"#00b400"}
                      onClick={() => toggleAnimatedConfirmMessage(id)}
                    >
                      Keep it!
                    </StyledButton>
                    <StyledButton
                      aria-label="delete this entry"
                      $color={"#cc0100"}
                      onClick={() => {
                        setTimeout(() => onDeleteEmotionEntry(id), 400);
                        toggleAnimatedConfirmMessage(id);
                      }}
                    >
                      Delete it!
                    </StyledButton>
                  </StyledWrapper>
                </StyledConfirmBox>
              </>
            )}
            <StyledDetails $showDetails={showDetails[id]}>
              <li>Tension Level: {tensionLevel}%</li>
            </StyledDetails>
          </>
        );
      })}
    </StyledList>
  );
}
