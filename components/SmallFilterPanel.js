import styled from "styled-components";

const StyledMinimalPanel = styled.section`
  width: 100%;
  background-color: var(--main-bright);
  transform: translateY(
    ${({ $isScrollDown }) => ($isScrollDown ? "0" : "-100px")}
  );
  transition: all 300ms ease-in-out 400ms;
  position: fixed;
  top: 60px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  font-size: 0.8rem;
  padding: 0 0.6rem;
  z-index: 1;
`;

const StyledPanelItem = styled.span`
  margin: 0 0.5rem;
  padding: 0.5rem 0;
`;

const StyledPanelSpan = styled.span`
  background-color: var(--button-background);
  border-radius: 50px;
  padding: 0 0.3rem;
`;

export default function SmallFilterPanel({
  isScrollDown,
  buttonState,
  searchTerm,
  DisplayDate,
  selectedTime,
}) {
  return (
    <StyledMinimalPanel $isScrollDown={isScrollDown}>
      <StyledPanelItem>
        Filter:<br></br> <StyledPanelSpan>{buttonState.label}</StyledPanelSpan>
      </StyledPanelItem>
      {searchTerm && (
        <StyledPanelItem>
          Search:<br></br> <StyledPanelSpan>{searchTerm}</StyledPanelSpan>
        </StyledPanelItem>
      )}
      {selectedTime && buttonState.datePicker && (
        <StyledPanelItem>
          <DisplayDate textAlign="left" />
        </StyledPanelItem>
      )}
    </StyledMinimalPanel>
  );
}
