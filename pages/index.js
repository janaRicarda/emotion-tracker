import styled from "styled-components";
import { useEffect, useState } from "react";
import { uid } from "uid";
import {
  StyledWrapper,
  StyledButton,
  StyledStandardLink,
  StyledInput,
  StyledForm,
} from "@/SharedStyledComponents";

const StyledTensionForm = styled(StyledForm)`
  margin: 4rem auto;
  align-items: center;
  width: 80vw;
`;

const StyledTensionLabel = styled.label`
  padding: 2rem;
  text-align: center;
`;

const StyledSpan = styled.span`
  font-size: 1.2rem;
  margin: 1rem 0 0 0;
`;

const StyledMessage = styled.p`
  align-self: center;
  text-align: center;
  font-weight: 600;
  margin: 1rem auto;
`;

const StyledSaveButton = styled(StyledButton)`
  border-style: none;
`;

const StyledButtonWrapper = styled(StyledWrapper)`
  justify-content: center;
`;

const StyledBackButton = styled.input`
  width: 10rem;
  text-decoration: none;
  color: var(--contrast-text);
  margin: 0.5rem;
  padding: 0.5rem;
  border-radius: 8.5px;
  border-style: none;

  text-align: center;
  background-color: var(--button-background);
`;
const StyledAddDetailsLink = styled(StyledStandardLink)`
  color: var(--contrast-text);
  width: 10rem;
  margin: 0.5rem;
  padding: 0.5rem;
  background-color: var(--button-background);
`;

export default function HomePage({ onAddEmotionEntry, handleToolTip }) {
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [id, setId] = useState();
  const [tension, setTension] = useState(0);

  useEffect(() => {
    handleToolTip({
      text: "On this page, you can indicate your level of tension on a range scale from 0 to 100. Afterward, simply press the Save-button to record your input.",
    });
  }, []);

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    const newId = uid();

    onAddEmotionEntry(data, newId);
    setId(newId);
    setIsFormSubmitted(!isFormSubmitted);
  }

  // On this page, you can indicate your level of tension on a range scale
  // from 0 to 100. Afterward, simply press the Save-button to record your
  // input.

  return (
    <>
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
            <StyledSaveButton type="submit">Save</StyledSaveButton>
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
              />
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
