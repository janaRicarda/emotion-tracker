import styled from "styled-components";
import ChevronPrev from "./../public/icons/chevron-left.svg";
import ChevronNext from "./../public/icons/chevron-right.svg";
import ArrowBack from "./../public/icons/arrow-left.svg";
import {
  StyledFixedLink,
  StyledStandardLink,
  StyledListItem,
  StyledList,
} from "@/SharedStyledComponents";
import { darkTheme } from "./Theme";
import { breakpoints } from "@/utils/breakpoints";
import { useTranslation } from "next-i18next";

const StyledBackLink = styled(StyledStandardLink)`
  display: flex;
  color: var(--main-dark);

  @media ${breakpoints.mobileLandscape} {
    margin-bottom: 1rem;
  }
  @media ${breakpoints.largeMobile} {
    margin-bottom: 1rem;
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
  const { t: translate } = useTranslation("emotionList");

  const emotionData = translate("emotionData", { returnObjects: true });

  return (
    <>
      <StyledBackLink href="/emotions">
        <StyledArrow /> {translate("backOverview")}
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
