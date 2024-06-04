import styled from "styled-components";
import Info from "../public/icons/info.svg";
import Close from "../public/icons/close.svg";
import { useState } from "react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { breakpoints } from "@/utils/breakpoints";

const StyledTooltipQuestionmark = styled(Info)`
  height: ${({ $isScrollDown }) => ($isScrollDown ? "1.5rem" : "2.2rem")};
  fill: var(--main-dark);
  border-radius: 50%;
  width: 2rem;
  position: fixed;
  top: 100px;
  right: 1.5rem;
  z-index: 1;
  transition: all 300ms ease;
`;

const StyledTooltipWrapper = styled.div`
  margin-top: 2.5rem;
  position: fixed;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  border-radius: 1rem;
  border-radius: 1rem;
  background-color: var(--section-background-contrast);
  z-index: 2;
  display: ${({ $show }) => ($show ? "block" : "none")};
  box-shadow: var(--box-shadow-filter);
  top: 100px;
  &:after {
    content: "";
    position: absolute;
    top: -2rem;
    right: 0.5rem;
    border-width: 1.5rem;
    border-style: solid;
    border-color: transparent transparent var(--section-background-contrast)
      transparent;
  }
  @media ${breakpoints.tablet} {
    width: 30vw;
    right: 0;
  }
`;

const StyledClose = styled(Close)`
  width: 1rem;
  margin: 0.5rem;
  fill: var(--contrast-text);
  position: absolute;
  top: 0;
  right: 0;
  z-index: 1;
`;

const StyledTooltipInfo = styled.p`
  padding: 2rem 1rem 1rem 1rem;
  color: var(--contrast-text);
`;

export default function Tooltip({ toolTip, isScrollDown }) {
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);

  function handleToggleTooltip() {
    setIsTooltipOpen(!isTooltipOpen);
  }

  const router = useRouter();
  useEffect(() => {
    setIsTooltipOpen(false);
  }, [router]);

  return (
    <>
      <StyledTooltipQuestionmark
        $isScrollDown={isScrollDown}
        onClick={handleToggleTooltip}
      />
      <StyledTooltipWrapper $show={isTooltipOpen}>
        <StyledClose onClick={handleToggleTooltip} />
        <StyledTooltipInfo>{toolTip.text}</StyledTooltipInfo>
      </StyledTooltipWrapper>
    </>
  );
}
