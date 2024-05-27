import styled from "styled-components";
import TooltipQuestionmark from "../public/images/help.svg";
import { useState } from "react";

const StyledTooltipQuestionmark = styled(TooltipQuestionmark)`
  height: ${({ $isScrollDown }) => ($isScrollDown ? "1.3rem" : "1.8rem")};
  fill: var(--main-dark);
  z-index: 2;
  transition: all 300ms ease;
`;

const StyledTooltipWrapper = styled.div`
  position: absolute;
  right: 0.5rem;
  left: 0.5rem;
  border-radius: 6px;
  background-color: var(--section-background);
  z-index: 2;
  display: ${({ $show }) => ($show ? "block" : "none")};
  border: 1px solid var(--main-dark);
  height: 50vh;
  top: 100px;
`;

const StyledTooltipInfo = styled.p`
  padding: 2rem 1rem 4rem 1rem;
  color: var(--main-dark);
  margin: 8rem 1 rem 8 rem 1 rem;
`;

export default function Tooltip({ toolTip, isScrollDown }) {
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);

  function handleToggleTooltip() {
    setIsTooltipOpen(!isTooltipOpen);
  }

  return (
    <>
      <StyledTooltipQuestionmark
        $isScrollDown={isScrollDown}
        onClick={handleToggleTooltip}
      />
      <StyledTooltipWrapper $show={isTooltipOpen}>
        <StyledTooltipInfo>{toolTip.text}</StyledTooltipInfo>
      </StyledTooltipWrapper>
    </>
  );
}
