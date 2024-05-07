import styled from "styled-components";
import { useState, useEffect } from "react";
import Fuse from "fuse.js";
import Magnifier from "../public/magnify.svg";

const StyledContainer = styled.article`
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
  transition: width 1s linear;
`;

export default function SearchBar({
  isShown,
  handleShowSearchBar,
  SetShownEntries,
  emotionEntries,
}) {
  const [searchTerm, setSearchTerm] = useState();

  useEffect(() => {
    if (!searchTerm) {
      SetShownEntries(emotionEntries);
      return;
    }

    const fuse = new Fuse(emotionEntries, {
      includeScore: true,
      threshold: 0.4,
      keys: [
        "date",
        "tensionLevel",
        "trigger",
        "intensity",
        "notes",
        "category",
        "emotion",
        "subemotion",
      ],
    });

    const results = fuse.search(searchTerm);
    const items = results.map((result) => result.item);
    SetShownEntries(items);
  }, [emotionEntries, searchTerm, SetShownEntries]);
  console.log(isShown);
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
        onChange={(event) => setSearchTerm(event.target.value)}
      />
      <StyledMagnifier onClick={handleShowSearchBar} />
    </StyledContainer>
  );
}
