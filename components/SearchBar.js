import styled from "styled-components";
import { useState, useEffect } from "react";
import Fuse from "fuse.js";
import Magnifier from "../public/magnify.svg";
import Close from "../public/close.svg";

const StyledContainer = styled.article`
  width: 100%;
  height: auto;
  display: flex;
`;

const StyledMagnifier = styled(Magnifier)`
  width: 2rem;
  fill: var(--main-dark);
`;

const StyledClose = styled(Close)`
  width: 2rem;
  fill: var(--main-dark);
`;

const StyledInput = styled.input`
  width: 90vw;
  padding: 0.5rem;
  background-color: var(--main-bright);
  color: var(--main-dark);
  border-radius: 20px;
  font-size: 0.8rem;
  border: 1px solid var(--main-dark);
`;

export default function SearchBar({ SetShownEntries, emotionEntries }) {
  const [searchTerm, setSearchTerm] = useState();
  const [isClicked, setIsClicked] = useState(false);

  function handleShowSearchBar() {
    setIsClicked(!isClicked);
  }

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
  console.log(isClicked);
  return (
    <StyledContainer>
      <button type="button" onClick={handleShowSearchBar}>
        {isClicked ? <StyledMagnifier /> : <StyledClose />}
      </button>
      {isClicked && (
        <StyledInput
          aria-label="Search"
          type="search"
          id="searchTerm"
          name="searchTerm"
          placeholder="Search for Date, Tensionlevel, Emotion..."
          aria-placeholder="Search for Date, Tensionlevel, Emotion..."
          onChange={(event) => setSearchTerm(event.target.value)}
        />
      )}
    </StyledContainer>
  );
}
