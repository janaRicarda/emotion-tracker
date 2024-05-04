import styled from "styled-components";

const StyledInput = styled.input`
  margin-top: 35px;
  width: 90vw;
  padding: 0.5rem;
  background-color: var(--main-bright);
  color: var(--main-dark);
  border-radius: 20px;

  border: 1px solid var(--main-dark);
  position: fixed;
  z-index: 1;
`;

export default function SearchBar({ handleSearch }) {
  return (
    <StyledInput
      aria-label="Search"
      type="search"
      id="searchTerm"
      name="searchTerm"
      placeholder="Search for Date, Tensionlevel, Emotion..."
      aria-placeholder="Search for Date, Tensionlevel, Emotion..."
      onChange={handleSearch}
    />
  );
}
