import { useState } from "react";
import styled from "styled-components";

const StyledList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 auto 1rem;
  text-align: left;
`;

const StyledListItem = styled.li`
  margin: 1rem auto;
  border: 1px solid black;
  border-radius: 5px;
  padding: 1rem;
  box-shadow: 0 0 3px 0;
  cursor: pointer;

  &:hover {
    background-color: lightskyblue;
  }
`;

const StyledDetails = styled.div`
  display: ${({ $show }) => ($show ? "block" : "none")};
  padding: 0 1rem;
  margin-bottom: 2rem;
`;

export default function EmotionRecordsList({ tensionEntry }) {
  const [show, setShow] = useState([]);
  function handleShow(index) {
    const updateShow = [...show];
    updateShow[index] = !updateShow[index];
    setShow(updateShow);
  }

  return (
    <StyledList>
      {tensionEntry.map((entry, index) => {
        const { id, date, tensionLevel } = entry;
        return (
          <>
            <StyledListItem key={id} onClick={() => handleShow(index)}>
              {date}
            </StyledListItem>
            <StyledDetails $show={show[index]}>
              - Tension Level: {tensionLevel}%
            </StyledDetails>
          </>
        );
      })}
    </StyledList>
  );
}
