import { useState } from "react";
import styled from "styled-components";
import Magnifier from "../public/magnify.svg";

const StyledForm = styled.form`
  margin-top: 100px;
  display: flex;
  flex-direction: column;
`;

const StyledInput = styled.input`
  width: 80vw;
  padding: 1rem;
  background-color: var(--main-bright);
  color: var(--main-dark);
  border-radius: 12px;
  border: 1px solid var(--main-dark);
`;

const StyledButton = styled.button`
  background-color: var(--main-bright);

  border: 1px solid var(--main-dark);
  border-radius: 12px;
  width: 3rem;
  height: 3rem;
`;

const StyledMagnifier = styled(Magnifier)`
  width: 2rem;
  height: 2rem;
  fill: var(--main-dark);
`;

export default function Searchbar() {
  const [searchTerm, setSearchTerm] = useState("");

  function handleSubmit() {
    event.preventDefault();
  }
  return (
    <StyledForm onSubmit={handleSubmit}>
      <label htmlFor="searchTerm">Search:</label>
      <StyledInput
        id="searchTerm"
        name="searchTerm"
        placeholder="Search for date, time, tensionlevel..."
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
      />
      <StyledButton type="submit">
        <StyledMagnifier />
      </StyledButton>
    </StyledForm>
  );
}
