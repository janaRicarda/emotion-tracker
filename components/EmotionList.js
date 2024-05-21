import { emotionData } from "@/lib/db";
import styled from "styled-components";
import { StyledTitle, StyledStandardLink } from "@/SharedStyledComponents";

const StyledCircle = styled.article`
  width: 90vw;
  height: 90vw;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  //border: 1px solid black;
  box-shadow: var(--box-shadow);
`;

const StyledEmotionList = styled.ul`
  // border-radius: 12px;
  // list-style: none;
  // padding: 0;
  // display: flex;
  // flex-flow: column;
  // justify-content: start;
  // align-items: center;
  // text-align: center;
  // gap: 0.5rem;
  // margin: 1rem;

  padding: 0;
  position: relative;
  width: 80vw;
  height: 80vw;
  border-radius: 50%;
  list-style: none;
  overflow: hidden;
`;

const StyledListItem = styled.li`
  // text-align: center;
  background: ${({ $color }) => $color};
  // border-radius: 0.5rem;
  // width: 80vw;
  // max-width: 800px;
  // font-weight: 600;
  // font-size: 1.3rem;

  overflow: hidden;
  position: absolute;
  top: -50%;
  right: -50%;
  width: 100%;
  height: 100%;
  transform-origin: 0% 100%;
  &:first-child {
    transform: rotate(0deg) skewY(141.4deg);
  }
  &:nth-child(2) {
    transform: rotate(51.43deg) skewY(141.4deg);
  }
  &:nth-child(3) {
    transform: rotate(102.85deg) skewY(141.4deg);
  }
  &:nth-child(4) {
    transform: rotate(154.29deg) skewY(141.4deg);
  }
  &:nth-child(5) {
    transform: rotate(205.7deg) skewY(141.4deg);
  }
  &:nth-child(6) {
    transform: rotate(257.12deg) skewY(141.4deg);
  }
  &:last-child {
    transform: rotate(308.59deg) skewY(141.4deg);
  }
`;

const EmotionLink = styled(StyledStandardLink)`
  // display: block;
  // padding: 0.8rem;
  // color: var(--text-on-bright);
  position: absolute;
  border-radius: 50%;
  left: 1rem;
  bottom: 3.5rem;
  font-weight: 500;
  width: 5rem;
  height: aut0;
  text-align: center;
  transform: skewY(-141deg) rotate(25deg);
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
      <StyledCircle>
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
      </StyledCircle>
    </>
  );
}
