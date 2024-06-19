import styled from "styled-components";
import Icon from "@mdi/react";
import { mdiFilter } from "@mdi/js";

const StyledMinimalPanel = styled.section`
  width: 92%;
  padding: 0.6rem;
  display: flex;
  z-index: 1;
  font-size: 0.8rem;
  background-color: var(--main-bright);

  & > :nth-child(1) {
    margin: 5px;
  }

  & > div {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
  }
`;

const StyledFilterIcon = styled(Icon)`
  border-radius: 50%;
  background-color: var(--button-background);
  color: var(--contrast-text);
  padding: 2px;
  width: 1.5rem;
  height: 1.5rem;
`;

const StyledPanelItem = styled.span`
  background-color: var(--button-background);
  color: var(--contrast-text);
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
      <StyledFilterIcon path={mdiFilter} />
      <div>
        <StyledPanelItem>{buttonState.label}</StyledPanelItem>
        {searchTerm && <StyledPanelItem>{searchTerm}</StyledPanelItem>}
        {selectedTime && buttonState.datePicker && (
          <StyledPanelItem>
            <DisplayDate />
          </StyledPanelItem>
        )}
      </div>
    </StyledMinimalPanel>
  );
}
