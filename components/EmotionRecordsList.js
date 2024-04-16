import { useState } from "react";
import styled from "styled-components";

const StyledList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 2rem auto;
  text-align: left;
`;

const StyledListItem = styled.li`
  margin: 1.2rem auto;
`;

const StyledDetails = styled.div`
  display: ${({ $show }) => ($show ? "block" : "none")};
`;

export default function EmotionRecordsList({ tensionEntry }) {
  const [show, setShow] = useState([]);
  function handleShow(index) {
    const updateShow = [...show];
    updateShow[index] = !updateShow[index];
    setShow(updateShow);
  }

  return (
    <>
      <StyledList>
        {tensionEntry.map((entry, index) => {
          const { id, date, tensionLevel } = entry;
          return (
            <StyledListItem key={id} onClick={() => handleShow(index)}>
              {date}
              <StyledDetails $show={show[index]}>
                - Tension Level: {tensionLevel}%
              </StyledDetails>
            </StyledListItem>
          );
        })}
      </StyledList>
    </>
  );
}
