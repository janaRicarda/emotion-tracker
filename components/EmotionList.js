import { emotionData } from "@/lib/db";
import styled from "styled-components";
import Link from "next/link";

const StyledH1 = styled.h1`
  text-align: center;
  line-height: 2.2rem;
  margin: 1rem auto 0;
`;

const EmotionSection = styled.section`
  list-style: none;
  padding: 0;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  gap: 0.5rem;
  margin: 3rem;
`;

const EmotionLink = styled(Link)`
  text-decoration: none;
  text-align: center;
  color: black;
  background-color: ${({ $color }) => $color};
  border: 1px solid black;
  border-radius: 0.5rem;
  width: 80vw;
  max-width: 800px;
  font-weight: 600;
  padding: 1rem;
  font-size: 1.3rem;
`;

export default function EmotionList({ title, page, id }) {
  if (!emotionData) {
    return <h1>Sorry, an error has occured. Please try again later!</h1>;
  }

  return (
    <>
      <StyledH1>{title}</StyledH1>

      <EmotionSection>
        {emotionData.map(({ slug, name, color }) => (
          <EmotionLink
            key={slug}
            $color={color}
            slug={slug}
            forwardedAs={`/${page}/${slug}`}
            href={{ pathname: `/${page}/${slug}`, query: { id } }}
          >
            {name}
          </EmotionLink>
        ))}
      </EmotionSection>
    </>
  );
}
