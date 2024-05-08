import { emotionData } from "@/lib/db";
import styled from "styled-components";
import { StyledTitle, StyledStandardLink } from "@/SharedStyledComponents";

const StyledEmotionListTitle = styled(StyledTitle)`
  font-size: 1.5rem;
  line-height: 1.6rem;
  padding: 0 1rem 1rem 1rem;
`;

const EmotionSection = styled.section`
  border-radius: 12px;
  list-style: none;
  padding: 0;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  gap: 0.5rem;
  margin: 2rem;
  padding-left: 1rem;
  padding-right: 1rem;
  padding-bottom: 1rem;
  padding-top: ${({ $form }) => ($form ? "4rem" : "1rem")};
`;

const EmotionLink = styled(StyledStandardLink)`
  background-color: ${({ $color }) => $color};
  width: 80vw;
  max-width: 800px;
  font-weight: 600;
  padding: 0.8rem;
  font-size: 1.3rem;
`;

export default function EmotionList({
  form,
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
      <StyledEmotionListTitle>{title}</StyledEmotionListTitle>
      <EmotionSection $form={form}>
        {emotionData.map(({ slug, name }) => (
          <EmotionLink
            onClick={() => handleAddDetails(name, id)}
            key={slug}
            $color={`var(--${slug})`}
            slug={slug}
            href={
              createMode
                ? { pathname: `/create/${slug}`, query: { id } }
                : `/emotions/${slug}`
            }
          >
            {name}
          </EmotionLink>
        ))}
      </EmotionSection>
    </>
  );
}
