import styled from "styled-components";
import useLocalStorageState from "use-local-storage-state";
import { uid } from "uid";
import Link from "next/link";
import getCurrentTimeAndDate from "@/utils/getCurrentTimeAndDate";

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

const StyledSpan = styled.span`
  font-size: 0.8rem;
`;

const StyledButton = styled.button`
  width: 3rem;
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
  const [tensionEntry, setTensionEntry] = useLocalStorageState("tensionEntry", {
    defaultValue: [],
  });

  function handleAddTensionEntry(data) {
    const timeStamp = getCurrentTimeAndDate();
    const newEntry = { ...data, id: uid(), date: timeStamp };
    setTensionEntry(
      tensionEntry.length === 0 ? [newEntry] : [...tensionEntry, newEntry]
    );
  }

  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    handleAddTensionEntry(data);
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
      <StyledButton type="submit">Save</StyledButton>
      <StyledList>
        {tensionEntry.map((entry) => {
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
