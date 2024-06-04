import styled from "styled-components";
import ChevronPrev from "./../public/chevron-left.svg";
import ChevronNext from "./../public/chevron-right.svg";
import ArrowBack from "./../public/arrow-left.svg";
import {
  StyledFixedLink,
  StyledListItem,
  StyledList,
} from "@/SharedStyledComponents";
import { darkTheme } from "./Theme";
import { breakpoints } from "@/utils/breakpoints";

const StyledBackLink = styled(StyledFixedLink)`
  top: 110px;
  left: 2rem;
  display: flex;
  @media ${breakpoints.mobileLandscape} {
    top: 100px;
    margin-left: 4rem;
  }
  @media ${breakpoints.largeMobile} {
    top: 100px;
    margin-left: 4rem;
  }
  @media ${breakpoints.tablet} {
    top: 100px;
    margin-left: 6rem;
  }
`;

const StyledArrow = styled(ArrowBack)`
  width: 1rem;
  fill: var(--main-dark);
`;

const StyledArticle = styled.article`
  border-radius: 10px;
  margin: 1rem;
  padding: 2rem;
  background: ${({ $color }) => $color};
  color: ${({ $text }) => $text};
  @media ${breakpoints.mobileLandscape} {
    margin: 0 4rem 1rem 4rem;
    padding: 1rem 4rem 1rem 4rem;
    width: 80vw;
  }
  @media ${breakpoints.largeMobile} {
    margin: 0 4rem 0 4rem;
    padding: 1rem 5rem 1rem 5rem;
    width: 80vw;
  }
  @media ${breakpoints.tablet} {
    margin: 0 9rem 0 9rem;
    padding: 2rem 8rem 2rem 8rem;
    width: 80vw;
  }
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

const StyledSubemotionsList = styled(StyledList)`
  padding-left: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 0.3rem;
  justify-content: center;
`;

const PrevLink = styled(StyledFixedLink)`
  left: -0.5rem;
  @media ${breakpoints.largeMobile} {
    left: 1rem;
  }
  @media ${breakpoints.tablet} {
    left: 2rem;
  }
  @media ${breakpoints.laptop} {
    top: 45%;
    left: 4rem;
  }
`;

const NextLink = styled(StyledFixedLink)`
  right: -0.5rem;
  @media ${breakpoints.largeMobile} {
    right: 1rem;
  }
  @media ${breakpoints.tablet} {
    right: 2rem;
  }
  @media ${breakpoints.laptop} {
    top: 45%;
    right: 4rem;
  }
`;
const StyledChevronPrev = styled(ChevronPrev)`
  width: 3rem;
  height: 3rem;
  fill: ${({ $text }) => $text};
`;

const StyledChevronNext = styled(ChevronNext)`
  width: 3rem;
  height: 3rem;
  fill: ${({ $text }) => $text};
`;

export default function EmotionDetails({
  theme,
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
    <>
      <StyledBackLink href="/emotions">
        <StyledArrow /> back to overview
      </StyledBackLink>
      <StyledArticle
        $color={
          theme === darkTheme ? `var(--section-background)` : `var(--${slug})`
        }
        $text={theme === darkTheme ? `var(--${slug})` : `var(--text-on-bright)`}
      >
        <EmotionDetailsTitle>{name}</EmotionDetailsTitle>
        <p>{description}</p>
        <SubTitle>The function of {name}</SubTitle>
        <p>{emotionfunction}</p>
        <SubTitle>Physical indications</SubTitle>
        <p>{indications}</p>
        <SubTitle>Subemotions</SubTitle>
        <StyledSubemotionsList>
          {subemotions.map((sub) => (
            <StyledListItem
              $text={
                theme === darkTheme ? `var(--${slug})` : `var(--text-on-bright)`
              }
              key={sub}
            >
              {sub}
            </StyledListItem>
          ))}
        </StyledSubemotionsList>
        <PrevLink href={`/emotions/${prevEmotion.slug}`}>
          <StyledChevronPrev
            $text={
              theme === darkTheme ? `var(--${slug})` : `var(--text-on-bright)`
            }
          />
        </PrevLink>
        <NextLink href={`/emotions/${nextEmotion.slug}`}>
          <StyledChevronNext
            $text={
              theme === darkTheme ? `var(--${slug})` : `var(--text-on-bright)`
            }
          />
        </NextLink>
      </StyledArticle>
    </>
  );
}
