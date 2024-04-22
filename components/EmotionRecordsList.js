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
  display: ${({ $show }) => ($show ? "block" : "none")};
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
  display: ${({ $confirmMessage }) => ($confirmMessage ? "block" : "none")};
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
  transform: ${({ $confirmMessage }) =>
    $confirmMessage ? "scale(1)" : "scale(0)"};
  transition: transform 0.4s;
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
  background-color: ${({ $delete }) => ($delete ? "#cc0100" : "#00b400")};
  border: none;
  border-radius: 5px;
  padding: 1rem;
`;
export default function EmotionRecordsList({
  emotionEntries,
  onDeleteEmotionEntry,
}) {
  const [show, setShow] = useState({});
  function handleShow(id) {
    setShow((prevShow) => ({
      ...prevShow,
      [id]: !prevShow[id],
    }));
  }

  const [confirmMessage, setConfirmMessage] = useState(false);
  function handleConfirmMessage(id) {
    setConfirmMessage((prevShow) => ({
      ...prevShow,
      [id]: !prevShow[id],
    }));
  }

  return (
    <>
      <StyledList>
        {emotionEntries.map(({ id, date, tensionLevel }) => {
          return (
            <>
              <StyledListItemWrapper>
                <StyledListItem key={id} onClick={() => handleShow(id)}>
                  {date}
                </StyledListItem>
                <StyledDeleteButton
                  type="button"
                  aria-label="Delete Emotion Entry"
                  onClick={() => handleConfirmMessage(id)}
                />
              </StyledListItemWrapper>
              <StyledConfirmBackground
                onClick={() => handleConfirmMessage(id)}
                $confirmMessage={confirmMessage[id]}
              ></StyledConfirmBackground>
              <StyledConfirmBox $confirmMessage={confirmMessage[id]}>
                <StyledConfirmMessage>
                  Do you want to delete this Entry?
                  <StyledConfirmMessage>
                    <b>{date}</b>
                  </StyledConfirmMessage>
                </StyledConfirmMessage>
                <StyledWrapper>
                  <StyledButton
                    onClick={() => setConfirmMessage(!confirmMessage)}
                  >
                    Keep it!
                  </StyledButton>
                  <StyledButton
                    $delete
                    onClick={() => onDeleteEmotionEntry(id)}
                  >
                    Delete it!
                  </StyledButton>
                </StyledWrapper>
              </StyledConfirmBox>
              <StyledDetails $show={show[id]}>
                <li>Tension Level: {tensionLevel}%</li>
              </StyledDetails>
            </>
          );
        })}
      </StyledList>
    </>
  );
}
