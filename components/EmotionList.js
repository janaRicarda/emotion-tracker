import { emotionData } from "@/lib/db";
import styled from "styled-components";
import { StyledTitle, StyledStandardLink } from "@/SharedStyledComponents";

const StyledEmotionList = styled.ul`
  border-radius: 12px;
  list-style: none;
  padding: 0;
  display: flex;
  flex-flow: column;
  justify-content: start;
  align-items: center;
  text-align: center;
  gap: 0.5rem;
  margin: 1rem;
`;

const StyledListItem = styled.li`
  text-align: center;
  background: ${({ $color }) => $color};
  border-radius: 0.5rem;
  width: 80vw;
  max-width: 800px;
  font-weight: 600;
  font-size: 1.3rem;
`;

const EmotionLink = styled(StyledStandardLink)`
  display: block;
  padding: 0.8rem;
  color: var(--text-on-bright);
`;

export default function EmotionList({
  title,
  createMode,
  id,
  onAddEmotionDetails,
}) {
  if (!emotionData) {
    return <h1>Sorry, an error has occured. Please try again later!</h1>;
  }
  function handleAddDetails(data, id) {
    const emotion = { emotion: data };
    onAddEmotionDetails(emotion, id);
  }

  return (
    <>
      <StyledTitle>{title}</StyledTitle>
      <StyledEmotionList>
        {emotionData.map(({ slug, name }) => (
          <StyledListItem
            onClick={createMode && (() => handleAddDetails(name, id))}
            $color={`var(--${slug})`}
            key={slug}
          >
            <EmotionLink
              slug={slug}
              href={
                createMode
                  ? { pathname: `/create/${slug}`, query: { id } }
                  : `/emotions/${slug}`
              }
            >
              {name}
            </EmotionLink>
          </StyledListItem>
        ))}
      </StyledEmotionList>
    </>
  );
}
