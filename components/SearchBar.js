import styled from "styled-components";

const StyledInput = styled.input`
  margin-top: 50px;
  width: 80vw;
  padding: 0.5rem;
  background-color: var(--main-bright);
  color: var(--main-dark);
  border-radius: 12px;

  border: 1px solid var(--main-dark);
`;

export default function SearchBar({ handleSearch }) {
  return (
    <StyledInput
      type="search"
      id="searchTerm"
      name="searchTerm"
      placeholder="Search for Date, Tensionlevel, Emotion..."
      onChange={handleSearch}
    />
  );
}
