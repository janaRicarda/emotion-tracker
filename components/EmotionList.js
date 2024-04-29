import { emotionData } from "@/lib/db";
import styled from "styled-components";
import Link from "next/link";

const StyledH1 = styled.h1`
  font-weight: 500;
  padding: 0 1rem 1rem 1rem;
  font-size: 1.5rem;
  text-align: center;
  line-height: 1.6rem;
  margin: 1rem auto 0;
  position: fixed;
  width: 100%;
  z-index: 2;
  background: linear-gradient(transparent, var(--main-bright) 20%);
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
  padding-top: ${({ $form }) => ($form ? "4rem" : "1rem")};
`;

const EmotionLink = styled(Link)`
  text-decoration: none;
  text-align: center;
  color: #030352;
  background-color: ${({ $color }) => $color};
  border-radius: 0.5rem;
  width: 80vw;
  max-width: 800px;
  font-weight: 600;
  padding: 0.8rem;
  font-size: 1.3rem;
`;

export default function EmotionList({ form, title, createMode, id }) {
  if (!emotionData) {
    return <h1>Sorry, an error has occured. Please try again later!</h1>;
  }

  return (
    <>
      <StyledH1>{title}</StyledH1>
      <EmotionSection $form={form}>
        {emotionData.map(({ slug, name }) => (
          <EmotionLink
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
