import styled from "styled-components";
import Link from "next/link";
import { useState } from "react";
import { uid } from "uid";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 80vw;
  margin: 2rem auto;
  justify-content: center;
  align-items: center;
`;

const StyledLabel = styled.label`
  padding: 2rem;
  text-align: center;
`;

const StyledInput = styled.input`
  width: inherit;
`;

const StyledWrapper = styled.div`
  display: flex;
  width: inherit;
  justify-content: space-between;
`;

const StyledButtonWrapper = styled.div`
  display: flex;
  width: inherit;
  justify-content: center;
`;

const StyledSpan = styled.span`
  font-size: 0.8rem;
`;

const StyledButton = styled.button`
  background-color: lightskyblue;
  width: 6rem;
  border: 1px solid black;
  border-radius: 6px;
  margin: 1rem;
  padding: 1rem;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
  margin: 1rem;
  padding: 1rem;
  border-radius: 8.5px;
  text-align: center;
  background-color: ${({ $actionButton }) =>
    $actionButton ? "lightskyblue" : "white"};
  border: ${({ $actionButton }) =>
    $actionButton ? "1px solid black" : "none"};
`;

const StyledNav = styled.nav`
  display: flex;
  justify-content: center;
  margin: 1.5rem auto;
  line-height: 1.2rem;
`;

const StyledBackButton = styled.input`
  background-color: transparent;
  text-decoration: none;
  color: black;
  margin: 1rem;
  padding: 1rem;
  border-radius: 8.5px;
  border: 1px solid black;
  text-align: center;
  background-color: lightskyblue;
`;

const StyledMessage = styled.p`
  align-self: center;
  text-align: center;
  font-weight: 600;
  margin: 1rem auto;
`;

export default function HomePage({ onAddEmotionEntry }) {
  const [tension, setTension] = useState("0");
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [id, setId] = useState();

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
    <>
      <StyledForm onSubmit={handleSubmit}>
        <StyledLabel htmlFor="tension-level">
          On a scale from 0 to 100, how tense do you feel in this moment?
        </StyledLabel>
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
              <StyledLink
                $actionButton
                href={{ pathname: "/create", query: { id: id } }}
                forwardedAs={`/create`}
              >
                Add more details
              </StyledLink>
            </StyledButtonWrapper>
          </>
        )}
      </StyledForm>
      <StyledNav>
        <StyledLink href="/emotions">The 7 basic emotions</StyledLink>
        <StyledLink href="/emotion-records">Emotion records</StyledLink>
      </StyledNav>
    </>
  );
}
