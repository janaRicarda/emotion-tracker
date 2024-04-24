import { useState } from "react";
import styled from "styled-components";

const StyledList = styled.ul`
  list-style: none;
  padding: 2.5rem 0;
  margin: 0 auto 1rem;
  text-align: left;
`;

const StyledListItem = styled.li`
  margin: 1rem auto;
  border: 1px solid var(--main-dark);
  border-radius: 5px;
  padding: 1rem;
  box-shadow: 0 0 3px 0;

  cursor: pointer;

  &:hover {
    background-color: lightskyblue;
  }
`;

const StyledDetails = styled.ul`
  display: ${({ $show }) => ($show ? "block" : "none")};
  padding: 0 1rem;
  margin-bottom: 2rem;
`;

export default function EmotionRecordsList({ emotionEntries }) {
  const [show, setShow] = useState({});
  function handleShow(id) {
    setShow((prevShow) => ({
      ...prevShow,
      [id]: !prevShow[id],
    }));
  }

  return (
    <StyledList>
      {emotionEntries.map(({ id, date, tensionLevel }) => {
        return (
          <>
            <StyledListItem key={id} onClick={() => handleShow(id)}>
              {date}
            </StyledListItem>
            <StyledDetails $show={show[id]}>
              <li>Tension Level: {tensionLevel}%</li>
            </StyledDetails>
          </>
        );
      })}
    </StyledList>
  );
}
