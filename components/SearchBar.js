import styled from "styled-components";
import { useState, useEffect } from "react";
import Fuse from "fuse.js";
import Magnifier from "../public/magnify.svg";
import Close from "../public/close.svg";
import { keyframes } from "styled-components";

const fadeIn = keyframes`
  from {
    width: 0;
   
  }
   to {
    width: 80vw;
   
  }
`;

const StyledContainer = styled.article`
  width: 80vw;
  height: auto;
  display: flex;
  position: relative;
`;

const StyledMagnifier = styled(Magnifier)`
  width: 2rem;
  fill: var(--main-dark);
  position: absolute;
  left: 0;
`;

const StyledClose = styled(Close)`
  width: 2rem;
  fill: var(--main-dark);
  position: absolute;
  left: 0;
`;

const StyledInput = styled.input`
  width: 80vw;
  padding: 0.3rem 0.3rem 0.3rem 2rem;
  background-color: var(--main-bright);
  color: var(--main-dark);
  border-radius: 20px;
  font-size: 0.8rem;
  border: 1px solid var(--main-dark);
  animation: ${fadeIn} 1s linear;
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
      {isShown && (
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
      {isShown ? (
        <StyledClose onClick={handleShowSearchBar} />
      ) : (
        <StyledMagnifier onClick={handleShowSearchBar} />
      )}
    </StyledContainer>
  );
}
