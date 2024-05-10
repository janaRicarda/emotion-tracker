import styled from "styled-components";
import { useState } from "react";
import Magnifier from "../public/magnify.svg";

const StyledContainer = styled.div`
  height: auto;
  display: flex;
  position: relative;
`;

const StyledMagnifier = styled(Magnifier)`
  width: 1.8rem;
  fill: var(--main-dark);
  position: absolute;
  top: calc(50% - 15px);
  left: 3px;
`;

const StyledInput = styled.input`
  width: ${({ $isShown }) => ($isShown ? "80vw" : "35px")};
  height: 35px;
  padding-left: 2rem;
  background-color: var(--main-bright);
  color: var(--main-dark);
  border-radius: ${({ $isShown }) => ($isShown ? "20px" : "18px")};
  font-size: 0.8rem;
  border: 1px solid var(--main-dark);
  transition: width 600ms linear;
`;

export default function SearchBar({ onSearch }) {
  const [isShown, setIsShown] = useState(false);

  function handleShowSearchBar() {
    setIsShown(!isShown);
  }

  return (
    <StyledContainer>
      <StyledInput
        $isShown={isShown}
        aria-label="Search"
        type="search"
        id="searchTerm"
        name="searchTerm"
        placeholder="Search for Date, Tensionlevel, Emotion..."
        aria-placeholder="Search for Date, Tensionlevel, Emotion..."
        onChange={(event) => onSearch(event.target.value)}
      />
      <StyledMagnifier onClick={handleShowSearchBar} />
    </StyledContainer>
  );
}
