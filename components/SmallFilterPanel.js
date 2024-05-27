import styled from "styled-components";

const StyledMinimalPanel = styled.section`
  background-color: var(--main-bright);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  font-size: 0.8rem;
  padding: 0 0.6rem;
  z-index: 1;
`;

const StyledPanelItem = styled.span`
  background-color: var(--button-background);
  border-radius: 50px;
  padding: 0.1rem 0.5rem;
  margin: 0.4rem;
`;

export default function SmallFilterPanel({
  buttonState,
  searchTerm,
  DisplayDate,
  selectedTime,
}) {
  return (
    <StyledMinimalPanel>
      <StyledPanelItem>{buttonState.label}</StyledPanelItem>
      {searchTerm && <StyledPanelItem>{searchTerm}</StyledPanelItem>}
      {selectedTime && buttonState.datePicker && (
        <StyledPanelItem>
          <DisplayDate />
        </StyledPanelItem>
      )}
    </StyledMinimalPanel>
  );
}
