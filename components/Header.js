import styled, { css } from "styled-components";
import Navigation from "./Navigation";
import { useState } from "react";
import Logo from "../public/icons/logo.svg";
import Moon from "../public/icons/moon.svg";
import Sun from "../public/icons/sun.svg";
import { lightTheme, neutralTheme } from "../components/Theme";
import { StyledStandardLink } from "@/SharedStyledComponents";
import { Fade as Hamburger } from "hamburger-react";
import Icon from "@mdi/react";
import { mdiMagicStaff } from "@mdi/js";
import useSWR from "swr";
import { useSession } from "next-auth/react";

import { breakpoints } from "@/utils/breakpoints";
import { useRouter } from "next/router";
import ProfileLink from "./ProfileLink";

// used for all transition in this component
const transition = css`
  transition: all 300ms ease;
`;

const StyledToggleTheme = styled.button`
  border-style: none;
  background-color: transparent;
  z-index: 3;
  aspect-ratio: 1/1;
`;

const StyledMoon = styled(Moon)`
  fill: var(--main-dark);
`;

const StyledSun = styled(Sun)`
  fill: var(--main-dark);
`;

const StyledMenu = styled.div`
  color: ${({ $iconColor }) => $iconColor};
  z-index: 3;
`;

const StyledHeader = styled.header`
  width: 100%;
  display: flex;
  height: ${({ $isScrollDown }) => ($isScrollDown ? "70px" : "100px")};
  ${transition}
  transition-property: height;
  justify-content: space-between;
  align-items: center;
  background: var(--main-bright);
  position: fixed;
  padding: 0 1rem;
  top: 0;
  left: 0;
  z-index: ${({ $isOpen }) => ($isOpen ? "3" : "2")};
`;

const PlaceholderHeader = styled.div`
  width: 100vw;
  height: ${({ $isScrollDown }) => ($isScrollDown ? "70px" : "130px")};
  ${transition}
`;

const StyledIconWrapper = styled.article`
  display: flex;
  justify-content: center;
  align-items: center;
  width: auto;
  z-index: 3;
  transform: ${({ $isScrollDown }) => $isScrollDown && "scale(0.7)"};
  ${transition}
`;

const StyledLogoLink = styled(StyledStandardLink)`
  border-radius: 50%;
  @media ${breakpoints.laptop} {
    z-index: 3;
    border-radius: 50%;
    background: var(--section-background);
  }
`;

const StyledLogo = styled(Logo)`
  max-width: 8rem;
  max-height: 8rem;
  width: ${({ $isScrollDown }) => ($isScrollDown ? "4rem" : "8rem")};
  height: ${({ $isScrollDown }) => ($isScrollDown ? "4rem" : "8rem")};
  ${transition}
`;

export default function Header({
  theme,
  toggleTheme,
  isScrollDown,
  handleTheme,
  themes,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();

  function handleToggleMenu() {
    setIsOpen(!isOpen);
  }

  const { data: currentUser, mutate } = useSWR(
    session && `/api/user/${session.user.email}`
  );

  async function handleEditTheme(choosenTheme) {
    const data = { lastPreferredTheme: choosenTheme };

    const response = await fetch(`/api/user/${session.user.email}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      mutate();
    }
  }

  function getName() {
    if (currentUser) {
      if (currentUser.lastPreferredTheme === "coldTheme") return "coldTheme";
      else if (currentUser.lastPreferredTheme === "neutralTheme")
        return "neutralTheme";
      else if (currentUser.lastPreferredTheme === "warmTheme")
        return "warmTheme";
      else if (currentUser.lastPreferredTheme === "highContrastTheme")
        return "highContrastTheme";
      else return "";
    }
  }

  console.log(currentUser?.theme);

  const themeButton = [
    {
      name: "darkTheme",
      icon: <StyledMoon />,
      nextTheme: "lightTheme",
    },
    {
      name: "lightTheme",
      icon: <StyledSun />,
      nextTheme: currentUser && currentUser.theme,
    },
    {
      name: getName(),
      icon: <Icon path={mdiMagicStaff} size={1} color="var(--main-dark)" />,
      nextTheme: "darkTheme",
    },
  ];

  return (
    <>
      <StyledHeader $isScrollDown={isScrollDown} $isOpen={isOpen}>
        <StyledLogoLink href="/">
          <StyledLogo $isScrollDown={isScrollDown} />
        </StyledLogoLink>
        <StyledIconWrapper $isScrollDown={isScrollDown}>
          {currentUser ? (
            themeButton.map((button) => {
              return (
                button.name === currentUser.lastPreferredTheme && (
                  <StyledToggleTheme
                    key={button.name}
                    type="button"
                    onClick={() => {
                      handleEditTheme(button.nextTheme);
                      console.log(button.name);
                    }}
                  >
                    {button.icon}
                  </StyledToggleTheme>
                )
              );
            })
          ) : (
            <StyledToggleTheme type="button" onClick={toggleTheme}>
              {theme === lightTheme ? <StyledMoon /> : <StyledSun />}
            </StyledToggleTheme>
          )}
          <StyledMenu
            $iconColor={isOpen ? `var(--contrast-text)` : `var(--main-dark)`}
          >
            <Hamburger toggled={isOpen} toggle={setIsOpen} direction="left" />
          </StyledMenu>
          {session && <ProfileLink />}
        </StyledIconWrapper>
        <Navigation isOpen={isOpen} handleToggleMenu={handleToggleMenu} />
      </StyledHeader>
      <PlaceholderHeader />
    </>
  );
}
