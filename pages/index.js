import styled from "styled-components";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

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
  display: ${({ $show }) => ($show ? "flex" : "none")};
  width: inherit;
  justify-content: center;
  border: 1px solid black;
`;

const StyledSpan = styled.span`
  font-size: 0.8rem;
`;

const StyledButton = styled.button`
  display: ${({ $show }) => ($show ? "none" : "block")};
  width: 6rem;
  background-color: white;
  border: 1px solid black;
  border-radius: 6px;
  margin: 0.5rem;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
  margin: 1rem;
  padding: 1rem;
  border-radius: 8.5px;
  text-align: center;
  &:hover {
    background-color: lightskyblue;
  }
`;

const StyledNav = styled.nav`
  display: flex;
  justify-content: center;
  margin: 1.5rem auto;
  line-height: 1.2rem;
`;

export default function HomePage({ onAddEmotionEntry, emotionEntries }) {
  const [show, setShow] = useState(false);
  const router = useRouter();

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    onAddEmotionEntry(data);
  }

  /* function handleSaveAndGoOn() {
    router.push({
      pathname: `/create`,
      query: emotionEntries,
    });
  }
 */
  function toggleShow() {
    setShow(!show);
  }

  function handleBackButton(event) {
    event.preventDefault();
  }

  return (
    <>
      <StyledForm onSubmit={handleSubmit}>
        <StyledLabel htmlFor="tension-level">
          On a scale from 0 to 100, how tense do you feel in this moment?
        </StyledLabel>
        <StyledInput
          id="tension-level"
          name="tensionLevel"
          type="range"
          defaultValue={0}
          max={100}
        />
        <StyledWrapper>
          <StyledSpan>0</StyledSpan>
          <StyledSpan>100</StyledSpan>
        </StyledWrapper>
        <StyledButton type="submit" onClick={toggleShow} $show={show}>
          Save
        </StyledButton>

        <StyledButtonWrapper $show={show}>
          <StyledButton type="button" onClick={handleBackButton}>
            Back
          </StyledButton>
          <StyledLink href="/create">Save and go on</StyledLink>
        </StyledButtonWrapper>
      </StyledForm>
      <StyledNav>
        <StyledLink href="/emotions">The 7 basic emotions</StyledLink>
        <StyledLink href="/emotion-records">Emotion records</StyledLink>
      </StyledNav>
    </>
  );
}
