import styled from "styled-components";
import { useState } from "react";
import { uid } from "uid";
import {
  StyledWrapper,
  StyledButton,
  StyledStandardLink,
  StyledInput,
  StyledForm,
} from "@/SharedStyledComponents";
import Tooltip from "@/components/Tooltip";

const StyledAddDetailsLink = styled(StyledStandardLink)`
  margin: 1rem;
  padding: 1rem;
  background-color: ${({ $actionButton }) =>
    $actionButton ? "var(--button-background)" : "white"};
  border: ${({ $actionButton }) =>
    $actionButton ? "1px solid black" : "none"};
`;

const StyledTensionForm = styled(StyledForm)`
  margin: 2rem auto;
  align-items: center;
  width: 80vw;
`;

const StyledTensionLabel = styled.label`
  padding: 2rem;
  text-align: center;
`;

const StyledSpan = styled.span`
  font-size: 0.8rem;
`;

const StyledMessage = styled.p`
  align-self: center;
  text-align: center;
  font-weight: 600;
  margin: 1rem auto;
`;

const StyledButtonWrapper = styled(StyledWrapper)`
  width: inherit;
  justify-content: center;
`;

const StyledBackButton = styled.input`
  text-decoration: none;
  color: var(--main-dark);
  margin: 1rem;
  padding: 1rem;
  border-radius: 8.5px;
  border: 1px solid black;
  text-align: center;
  background-color: var(--button-background);
`;

export default function HomePage({ onAddEmotionEntry }) {
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [id, setId] = useState();
  const [tension, setTension] = useState(0);
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    const newId = uid();

    onAddEmotionEntry(data, newId);
    setId(newId);
    setIsFormSubmitted(!isFormSubmitted);
  }

  function handleToggleTooltip() {
    setIsTooltipOpen(!isTooltipOpen);
  }
  console.log(isTooltipOpen);
  return (
    <>
      <Tooltip onToggleTooltip={handleToggleTooltip} show={isTooltipOpen}>
        <>
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
          nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
          sed diam voluptua. At vero eos et accusam et justo duo dolores et ea
          rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem
          ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur
          sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
          dolore magna aliquyam erat, sed diam voluptua.
        </>
      </Tooltip>

      <StyledTensionForm onSubmit={handleSubmit}>
        <StyledTensionLabel htmlFor="tension-level">
          On a scale from 0 to 100, how tense do you feel in this moment?
        </StyledTensionLabel>
        <StyledInput
          aria-label="Adjust tension level between 0 and 100"
          id="tension-level"
          name="tensionLevel"
          type="range"
          value={tension}
          max={100}
          onChange={(event) => setTension(event.target.value)}
        />
        <StyledWrapper>
          <StyledSpan>0</StyledSpan>
          <StyledSpan>100</StyledSpan>
        </StyledWrapper>
        {!isFormSubmitted && (
          <>
            <p>{tension}</p>
            <StyledButton type="submit">Save</StyledButton>
          </>
        )}

        {isFormSubmitted && (
          <>
            <StyledMessage>Your entry was successfully saved!</StyledMessage>
            <StyledButtonWrapper>
              <StyledBackButton
                type="reset"
                value={"Done"}
                onClick={() => {
                  setIsFormSubmitted(!isFormSubmitted);
                  setTension("0");
                }}
              ></StyledBackButton>
              <StyledAddDetailsLink
                $actionButton
                href={{ pathname: "/create", query: { id: id } }}
                forwardedAs={`/create`}
              >
                Add more details
              </StyledAddDetailsLink>
            </StyledButtonWrapper>
          </>
        )}
      </StyledTensionForm>
    </>
  );
}
