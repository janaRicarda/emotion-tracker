import styled from "styled-components";
import ChevronPrev from "./../public/chevron-left.svg";
import ChevronNext from "./../public/chevron-right.svg";
import { StyledFixedLink, StyledListItem } from "@/SharedStyledComponents";

const StyledArticle = styled.article`
  border-radius: 10px;
  margin: 1rem;
  padding: 2rem;
  background-color: ${({ $color }) => $color};
  color: #030352;
`;

const EmotionDetailsTitle = styled.h1`
  text-align: center;
  margin: 0.5rem 1.5rem 1.5rem;
  font-size: 2rem;
`;

const SubTitle = styled.h2`
  text-align: center;
  margin: 1rem;
  line-height: 2rem;
`;

const StyledList = styled.ul`
  list-style: none;
  padding-left: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 0.3rem;
  justify-content: center;
`;

const PrevLink = styled(StyledFixedLink)`
  left: 0;
`;

const NextLink = styled(StyledFixedLink)`
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
      <EmotionDetailsTitle>{name}</EmotionDetailsTitle>
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
