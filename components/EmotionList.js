import { emotionData } from "@/lib/data";
import styled from "styled-components";

const StyledList = styled.ul`
  list-style: none;
  padding-left: 0;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  gap: 0.5rem;
  margin: 1rem;
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
  if (!emotionData)
    <h1>Sorry, an error has occured. Please try again later!</h1>;

  return (
    <StyledList>
      <h1>The seven basic emotions</h1>
      {emotionData.map(({ slug, name, color }) => (
        <StyledListItem key={slug} $color={color}>
          {name}
        </StyledListItem>
      ))}
    </StyledList>
  );
}
