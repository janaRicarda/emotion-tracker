import { emotionData } from "@/lib/data";
import styled from "styled-components";

const StyledH1 = styled.h1`
  text-align: center;
  line-height: 2.2rem;
  margin: 1rem auto 0;
`;

const StyledList = styled.ul`
  list-style: none;
  padding-left: 0;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  gap: 0.5rem;
  margin: 3rem;
`;
const StyledListItem = styled.li`
  border: 1px solid black;
  border-radius: 0.5rem;
  padding: 1rem;
  background-color: ${({ $color }) => $color};
  width: 80vw;
  font-weight: 600;
  font-size: 1.3rem;
`;

export default function EmotionList() {
  if (!emotionData) {
    return <h1>Sorry, an error has occured. Please try again later!</h1>;
  }

  return (
    <>
      <StyledH1>The seven basic emotions</StyledH1>
      <StyledList>
        {emotionData.map(({ slug, name, color }) => (
          <StyledListItem key={slug} $color={color}>
            {name}
          </StyledListItem>
        ))}
      </StyledList>
    </>
  );
}
