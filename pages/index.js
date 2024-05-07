import styled from "styled-components";
import { useState } from "react";
import { uid } from "uid";
import {
  StyledButtonWrapper,
  StyledWrapper,
  StyledButton,
  StyledBackButton,
  StyledStandardLink,
  StyledInput,
} from "@/SharedStyledComponents";

const StyledAddDetailsLink = styled(StyledStandardLink)`
  color: var(--main-dark);
  margin: 1rem;
  padding: 1rem;
  background-color: ${({ $actionButton }) =>
    $actionButton ? "var(--button-background)" : "white"};
  border: ${({ $actionButton }) =>
    $actionButton ? "1px solid black" : "none"};
`;

const StyledTensionForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 80vw;
  margin: 2rem auto;
  justify-content: center;
  align-items: center;
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

export default function HomePage({ onAddEmotionEntry }) {
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [id, setId] = useState();
  const [tension, setTension] = useState(0);

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    const newId = uid();

    onAddEmotionEntry(data, newId);
    setId(newId);
    setIsFormSubmitted(!isFormSubmitted);
  }

  return (
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
  );
}
