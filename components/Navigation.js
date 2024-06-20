import styled, { css, keyframes } from "styled-components";
import { StyledStandardLink } from "@/SharedStyledComponents";
import { useEffect, useState } from "react";
import { breakpoints } from "@/utils/breakpoints";
import { useTranslation } from "next-i18next";
import { useSession } from "next-auth/react";
import Login from "./Login";

const slideIn = keyframes`
0% {transform: translateX(-100%)}
100% {transform: translateX(0)}
`;

const slideOut = keyframes`
100% {transform: translateX(-100%)}
`;

const StyledArticle = styled.article`
  inset: 0;
  background-color: var(--button-background);
  position: fixed;
  top: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 2;
  animation: ${({ $isOpen }) =>
      $isOpen
        ? css`
            ${slideIn}
          `
        : css`
            ${slideOut}
          `}
    300ms;
  @media ${breakpoints.laptop} {
    justify-content: flex-start;
    height: 100px;
    background-color: var(--section-background-contrast);
  }
`;

const StyledLinkWrapper = styled.article`
  display: flex;
  flex-direction: column;
  align-items: center;
  @media ${breakpoints.laptop} {
    padding-top: 1rem;
    flex-direction: row;
  }
`;

const StyledLink = styled(StyledStandardLink)`
  color: var(--contrast-text);
  font-size: 1.4rem;
  padding: 0.8rem;
  font-weight: 500;
  @media ${breakpoints.mobileLandscape} {
    padding: 0.2rem;
  }
  @media ${breakpoints.laptop} {
    padding: 0.8rem;
  }
`;

export default function Navigation({ handleToggleMenu, isOpen }) {
  const { data: session } = useSession();
  // delay of isOpen-state to give time for animation
  const [delayOpen, setDelayedOpen] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setDelayedOpen(isOpen);
    }, 200);
  }, [isOpen]);

  return (
    <>
      {delayOpen && (
        <StyledArticle $isOpen={isOpen}>
          <StyledLinkWrapper>
            <StyledLink onClick={handleToggleMenu} href="/app-manual">
              {translate("navigationManual")}
            </StyledLink>
            <StyledLink onClick={handleToggleMenu} href="/emotions">
              {translate("navigationBasicEmotions")}
            </StyledLink>

            <StyledLink onClick={handleToggleMenu} href="/add-entry">
              {translate("navigationAddEntry")}
            </StyledLink>
            <StyledLink onClick={handleToggleMenu} href="/emotion-records">
              {translate("navigationEmotionRecords")}
            </StyledLink>
            {session && <Login navigation />}
          </StyledLinkWrapper>
        </StyledArticle>
      )}
    </>
  );
}
