import Link from "next/link";
import styled from "styled-components";
import ChevronPrev from "./../public/chevron-left.svg";
import ChevronNext from "./../public/chevron-right.svg";
import { StyledCenteredTitle, StyledLink } from "@/SharedStyledComponents";

const StyledArticle = styled.article`
  border-radius: 10px;
  margin: 1rem;
  padding: 2rem;
  background-color: ${({ $color }) => $color};
  color: #030352;
`;

const SubTitle = styled.h2`
  text-align: center;
  margin: 1rem;
`;

const StyledList = styled.ul`
  list-style: none;
  padding-left: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 0.3rem;
  justify-content: center;
`;

const StyledListItem = styled.li`
  border: 1px solid #030352;
  padding: 0.5rem;
  border-radius: 5px;
`;

const PrevLink = styled(StyledLink)`
  left: 0;
`;

const NextLink = styled(StyledLink)`
  right: 0;
`;
const StyledChevronPrev = styled(ChevronPrev)`
  width: 3.5rem;
  height: 3.5rem;
  fill: var(--main-dark);
`;

const StyledChevronNext = styled(ChevronNext)`
  width: 3.5rem;
  height: 3.5rem;
  fill: var(--main-dark);
`;

export default function EmotionDetails({
  name,
  description,
  emotionfunction,
  indications,
  subemotions,
  slug,
  prevEmotion,
  nextEmotion,
}) {
  return (
    <StyledArticle $color={`var(--${slug})`}>
      <StyledCenteredTitle>{name}</StyledCenteredTitle>
      <p>{description}</p>
      <SubTitle>The function of {name}</SubTitle>
      <p>{emotionfunction}</p>
      <SubTitle>Physical indications</SubTitle>
      <p>{indications}</p>
      <SubTitle>Subemotions</SubTitle>
      <StyledList>
        {subemotions.map((sub) => (
          <StyledListItem key={sub}>{sub}</StyledListItem>
        ))}
      </StyledList>
      <PrevLink href={`/emotions/${prevEmotion.slug}`}>
        <StyledChevronPrev />
      </PrevLink>
      <NextLink href={`/emotions/${nextEmotion.slug}`}>
        <StyledChevronNext />
      </NextLink>
    </StyledArticle>
  );
}
