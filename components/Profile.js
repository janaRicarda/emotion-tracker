import { useSession } from "next-auth/react";
import styled from "styled-components";
import {
  StyledFlexColumnWrapper,
  StyledTitle,
  StyledButton,
} from "@/SharedStyledComponents";
import { useState } from "react";
import {
  lightTheme,
  darkTheme,
  warmTheme,
  coldTheme,
  neutralTheme,
  highContrastTheme,
} from "./Theme";
import Circle from "../public/icons/circle.svg";
import { breakpoints } from "@/utils/breakpoints";
import useSWR from "swr";
import { useRouter } from "next/router";

const StyledProfileCircle = styled.article`
  width: 8rem;
  height: 8rem;
  border-radius: 50%;
  background: var(--profile);
  font-size: 4rem;
  font-weight: 100;
  color: var(--text-on-bright);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledTitleWrapper = styled.article`
  margin-top: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const StyledParagraph = styled.p`
  text-align: center;
  padding: 1rem;
`;

const StyledSettingsWrapper = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
`;

const StyledColorSchemesButton = styled(StyledButton)`
  background: none;
  border: none;
  width: auto;
  padding: 0.2rem;
  margin-top: 0;
  border-radius: 0;
  color: var(--main-dark);
  border-bottom: 1px solid var(--main-dark);
`;

const ThemeWrapper = styled(StyledFlexColumnWrapper)`
  background: var(--section-background);
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 0.2rem;
  @media ${breakpoints.mobileLandscape} {
    align-items: flex-start;
  }
`;

const StyledCircle = styled(Circle)`
  width: 1.8rem;
  height: 1.8rem;
  background: ${({ $background }) => $background};
  fill: transparent;
  border-radius: 50%;
`;

const ThemeButton = styled(StyledButton)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--main-dark);
  background: transparent;
  border: none;
  border-radius: 0;
  padding: 0.1rem 0.1rem 0.1rem 0.5rem;
  margin: 0;
  width: 100%;

  @media ${breakpoints.mobileLandscape} {
    padding: 0 0.5rem;
    width: auto;
    //text-align: center;
  }
  @media ${breakpoints.laptop} {
    padding: 0 1rem;
    width: auto;
    text-align: center;
    font-size: 0.8rem;
    color: var(--contrast-text);
    background: var(--section-background-contrast);
  }
`;

export default function Profile({
  userNameInitials,
  userName,
  user,
  theme,
  customTheme,
  switchTheme,
}) {
  const { data: session, status } = useSession();
  const [showThemes, setShowThemes] = useState(false);
  const router = useRouter();
  const { id } = router.query;

  //const { data, mutate } = useSWR(`/api/user/${id}`);

  //function to set the Theme

  /* async function handleSubmitTheme(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const userData = Object.fromEntries(formData);

    /*  const response = await fetch("/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });  */

  /* const response = await fetch(`/api/user/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (response.ok) {
      mutate();
    }
  }
 */
  const colorSchemes = [
    /*   {
      title: "light",
      name: lightTheme,
      background: "conic-gradient(#e9e3e3 50%, #030352)",
      text: "#030352",
    },
    {
      title: "dark",
      name: darkTheme,
      background: "conic-gradient(#322e44 50%, #f1eaea)",
      text: "#f1eaea",
    }, */
    {
      title: "default",
      name: "default",
      key: "1",
    },
    {
      title: "warm",
      name: warmTheme,
      background: "conic-gradient(#fbe050, #fbbd50, #f673a4, #762e72 50%)",
      text: "#762e72",
      key: "2",
    },
    {
      title: "cold",
      name: coldTheme,
      background: "conic-gradient(#50cfe2, #9996fa, #0F1555 50%)",
      text: "#0F1555",
      key: "3",
    },
    {
      title: "neutral",
      name: neutralTheme,
      background: "conic-gradient(white 50%, black 50%)",
      text: "black",
      key: "4",
    },
    {
      title: "high contrast",
      name: highContrastTheme,
      background: "conic-gradient(yellow 50%, black 50%)",
      text: "black",
      key: "5",
    },
  ];

  function handleShowThemes() {
    setShowThemes(!showThemes);
  }

  if (status !== "authenticated") {
    return <h2>Access denied! You have to be logged in, to see this page</h2>;
  }
  return (
    <>
      <StyledTitleWrapper>
        <StyledTitle>Hi {userName}!</StyledTitle>
        <StyledProfileCircle> {userNameInitials} </StyledProfileCircle>
        <StyledParagraph>this is your profile-page</StyledParagraph>
      </StyledTitleWrapper>
      <StyledParagraph>Account-name: {session.user.email}</StyledParagraph>
      <StyledParagraph>
        Make yourself at home and turn on your favorite illumination
      </StyledParagraph>
      <StyledSettingsWrapper>
        <StyledColorSchemesButton onClick={handleShowThemes}>
          Choose your preferred theme
        </StyledColorSchemesButton>

        {/* <form onSubmit={handleSubmitTheme}>
          <p>Select your preferred theme</p>

          <div>
            <input type="radio" id="warmTheme" name="theme" value="warmTheme" />
            <label htmlFor="warmTheme">warm</label>
          </div>
          <div>
            <input type="radio" id="coldTheme" name="theme" value="coldTheme" />
            <label htmlFor="coldTheme">cold</label>
          </div>

          <button type="submit">submit</button>
        </form> */}

        {/*  {showThemes && (
          <ThemeWrapper>
            {colorSchemes.map(({ title, name, background, text }) => (
              <ThemeButton
                $background={background}
                $text={text}
                key={title}
                type="button"
                onClick={() => {
                  switchTheme(name);
                }}
              >
                <StyledCircle $background={background} />
                {title}
              </ThemeButton>
            ))}
          </ThemeWrapper>
        )} */}
      </StyledSettingsWrapper>
    </>
  );
}
