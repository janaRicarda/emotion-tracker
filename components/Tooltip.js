import styled from "styled-components";
import TooltipQuestionmark from "../public/images/help.svg";
//import Info from "../public/info.svg";
import Info from "../public/information.svg";
import Close from "../public/close.svg";
import { useState } from "react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { devices } from "@/utils/devices";

const StyledTooltipQuestionmark = styled(Info)`
  height: ${({ $isScrollDown }) => ($isScrollDown ? "1.5rem" : "2.2rem")};
  fill: var(--main-dark);

  //border: 1px solid var(--main-dark);
  border-radius: 50%;
  width: 2rem;
  position: fixed;
  top: 90px;
  right: 1.5rem;
  z-index: 2;
  transition: all 300ms ease;
`;

const StyledTooltipWrapper = styled.div`
  //margin-top: 2.5rem;
  //position: absolute;
  position: fixed;
  //right: 0.5rem;
  right: 4rem;
  left: 0.5rem;
  //margin-right: 1rem;
  border-radius: 1rem;
  //border-radius: 2rem 0 2rem 2rem;
  //border: 2rem;
  background-color: var(--section-background-contrast);
  z-index: 2;
  display: ${({ $show }) => ($show ? "block" : "none")};
  //border: var(--circle-border);
  box-shadow: var(--box-shadow-filter);

  top: 100px;
  &:after {
    content: "";
    position: absolute;
    top: -2rem;
    right: 0;
    //margin-right: 1.8rem;
    border-width: 1.5rem;
    border-style: solid;
    border-color: transparent transparent var(--section-background-contrast)
      transparent;
  }
  @media ${devices.largeMobile} {
    margin-left: 5rem;
  }
  @media ${devices.tablet} {
    margin-left: 20rem;
  }
  @media ${devices.laptop} {
    margin-left: 40rem;
  }
  @media ${devices.desktop} {
    margin-left: 50rem;
  }
`;

const StyledClose = styled(Close)`
  width: 1rem;
  margin: 0.5rem;
  fill: var(--contrast-text);
  position: absolute;
  top: 0;
  right: 0;
`;

const StyledTooltipInfo = styled.p`
  padding: 2rem 1rem 1rem 1rem;
  color: var(--contrast-text);
  //margin: 8rem 1 rem 8 rem 1 rem;
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
