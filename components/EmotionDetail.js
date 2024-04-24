import Link from "next/link";
import styled from "styled-components";

const StyledArticle = styled.article`
  border-radius: 10px;
  margin: 1rem;
  padding: 2rem;
  background-color: ${({ $color }) => $color};
`;

const Title = styled.h1`
  text-align: center;
  margin: 1.5rem;
  font-size: 2rem;
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
  border: 1px solid black;
  padding: 0.5rem;
  border-radius: 5px;
`;

const StyledLink = styled(Link)`
  font-size: 50px;
  text-decoration: none;
  color: black;
  position: fixed;
  margin: 1rem;
  top: 50%;
`;
const PrevLink = styled(StyledLink)`
  left: 0;
`;

const NextLink = styled(StyledLink)`
  right: 0;
`;

export default function EmotionDetails({
  name,
  description,
  emotionfunction,
  indications,
  subemotions,
  color,
  prevEmotion,
  nextEmotion,
}) {
  return (
    <StyledArticle $color={color}>
      <Title>{name}</Title>
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
      <PrevLink href={`/emotions/${prevEmotion.slug}`}>↞</PrevLink>
      <NextLink href={`/emotions/${nextEmotion.slug}`}>↠</NextLink>
    </StyledArticle>
  );
}
