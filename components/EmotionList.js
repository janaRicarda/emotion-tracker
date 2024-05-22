import { emotionData } from "@/lib/db";
import styled from "styled-components";
import { StyledFixedTitle, StyledStandardLink } from "@/SharedStyledComponents";
import { useState } from "react";

const StyledCircle = styled.article`
  width: 90vw;
  height: 90vw;
  border-radius: 50%;
  border: var(--circle-border);
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: var(--box-shadow);
  position: fixed;
  top: calc(100vh - 70%);
  //top: 210px;
  @media (orientation: landscape) {
    width: 50vw;
    height: 50vw;
    top: 50px;
  }
`;

const StyledEmotionList = styled.ul`
  border: var(--emotion-border);
  padding: 0;
  position: relative;
  width: 80vw;
  height: 80vw;
  border-radius: 50%;
  list-style: none;
  overflow: hidden;
  transform: rotate(${({ $rotation }) => $rotation}deg);
  @media (orientation: landscape) {
    width: 40vw;
    height: 40vw;
  }
`;

const StyledListItem = styled.li`
  background: ${({ $color }) => $color};
  border: var(--emotion-border);
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
  color: var(--text-on-bright);
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
  const [rotation, setRotation] = useState(0);
  const [touchStart, setTouchStart] = useState(null);

  if (!emotionData) {
    return <h1>Sorry, an error has occured. Please try again later!</h1>;
  }
  function handleAddDetails(data, id) {
    const emotion = { emotion: data };
    onAddEmotionDetails(emotion, id);
  }

  function handleScroll(event) {
    const { deltaY } = event;
    const newRotation = deltaY > 0 ? rotation - 5 : rotation + 5;
    setRotation(newRotation);
  }

  function handleTouchStart(event) {
    setTouchStart(event.touches[0].clientY);
  }

  function handleTouchMove(event) {
    if (touchStart !== null) {
      const touchCurrent = event.touches[0].clientY;
      const delta = touchCurrent - touchStart;
      const newRotation = delta > 0 ? rotation + 5 : rotation - 5;
      setRotation(newRotation);
      setTouchStart(touchCurrent);
    }
  }

  function handleTouchEnd() {
    setTouchStart(null);
  }

  return (
    <>
      <StyledFixedTitle>{title}</StyledFixedTitle>
      <StyledCircle>
        <StyledEmotionList
          onWheel={handleScroll}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          $rotation={rotation}
        >
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
