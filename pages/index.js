import styled from "styled-components";
import useLocalStorageState from "use-local-storage-state";
import { uid } from "uid";
import Link from "next/link";
import getCurrentTimeAndDate from "@/utils/getCurrentTimeAndDate";
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

const StyledList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 2rem auto;
  text-align: left;
`;

const StyledListItem = styled.li`
  margin: 1.2rem auto;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  padding: 1rem;
  background-color: lightgray;
  border: 1px solid black;
  border-radius: 5px;
  color: black;
`;

export default function HomePage() {
  const [emotionEntry, setEmotionEntry] = useLocalStorageState("emotionEntry", {
    defaultValue: [],
  });

  const [show, setShow] = useState(false);

  const router = useRouter();

  function handleAddEmotionEntry(data) {
    const timeStamp = getCurrentTimeAndDate();
    const newEntry = { ...data, id: uid(), date: timeStamp };
    setEmotionEntry(
      emotionEntry.length === 0 ? [newEntry] : [...emotionEntry, newEntry]
    );
  }

  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    handleAddEmotionEntry(data);
  }

  function handleSaveAndGoOn() {
    router.push({
      pathname: `/create`,
      query: emotionEntry,
    });
    console.log(emotionEntry);
  }

  function toggleShow() {
    setShow(!show);
  }

  function handleBackButton(event) {
    event.preventDefault();
  }

  return (
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
        <StyledButton type="button" onClick={handleSaveAndGoOn}>
          Save and go on
        </StyledButton>
      </StyledButtonWrapper>
      <StyledList>
        {emotionEntry.map((entry) => {
          const { id, date, tensionLevel } = entry;
          return (
            <StyledListItem key={id}>
              {date} - Tension Level: {tensionLevel}%
            </StyledListItem>
          );
        })}
      </StyledList>
      <StyledLink href="/emotions">The 7 basic emotions</StyledLink>
    </StyledForm>
  );
}

export { StyledLink };
