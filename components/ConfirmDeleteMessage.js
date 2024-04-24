import styled from "styled-components";

const StyledConfirmBackground = styled.div`
  background-color: black;
  opacity: 0.5;
  position: fixed;
  inset: 0;
  z-index: 2;
`;
const StyledConfirmBox = styled.div`
  position: fixed;
  right: calc(50% - 175.25px);
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
  padding: 1rem 2rem;
  text-align: center;
`;

const StyledWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-evenly;
  align-items: center;
  padding: 1rem;
`;
const StyledButton = styled.button`
  color: white;
  background-color: ${({ $color }) => $color};
  border: none;
  border-radius: 5px;
  padding: 1rem;
`;

export default function ConfirmDeleteMessage({
  toggleConfirmMessage,
  id,
  animation,
  date,
  onDeleteEmotionEntry,
}) {
  return (
    <>
      <StyledConfirmBackground
        onClick={() => toggleConfirmMessage(id)}
      ></StyledConfirmBackground>
      <StyledConfirmBox $animation={animation}>
        <StyledConfirmMessage>
          Do you want to delete this Entry?
        </StyledConfirmMessage>
        <StyledConfirmMessage>
          <b>{date}</b>
        </StyledConfirmMessage>
        <StyledWrapper>
          <StyledButton
            aria-label="do not delete this entry"
            $color={"#00b400"}
            onClick={() => toggleConfirmMessage(id)}
          >
            Keep it!
          </StyledButton>
          <StyledButton
            aria-label="delete this entry"
            $color={"#cc0100"}
            onClick={() => {
              setTimeout(() => onDeleteEmotionEntry(id), 400);
              toggleConfirmMessage(id);
            }}
          >
            Delete it!
          </StyledButton>
        </StyledWrapper>
      </StyledConfirmBox>
    </>
  );
}
