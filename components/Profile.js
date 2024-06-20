import styled from "styled-components";
import { StyledTitle, StyledButton } from "@/SharedStyledComponents";
import { useState } from "react";
import Circle from "../public/icons/circle.svg";
import Icon from "@mdi/react";
import { mdiMagicStaff } from "@mdi/js";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

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

const StyledColorSchemesButton = styled(StyledButton)`
  background: none;
  border: none;
  width: auto;
  padding: 0.2rem;
  margin: 0;
  border-radius: 0;
  color: var(--main-dark);
  display: flex;
  align-items: center;
`;

const StyledCircle = styled(Circle)`
  width: 1.8rem;
  height: 1.8rem;
  background: ${({ $background }) => $background};
  fill: transparent;
  border-radius: 50%;
  border: 1px solid var(--section-background);
`;

const StyledForm = styled.form`
  background: var(--section-background-contrast);
  width: 80vw;
  padding: 1rem;
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
`;
const StyledDiv = styled.div`
  padding: 0.2rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const StyledInput = styled.input`
  display: inline-block;
`;

const StyledLabel = styled.label`
  color: var(--contrast-text);
`;

const StyledSubmit = styled.button`
  margin-top: 0.5rem;
  width: 100%;
  background: var(--text-on-bright);
  color: var(--text-on-dark);
  border-style: none;
  border-radius: 6px;
`;

export default function Profile({
  userNameInitials,
  userName,
  userEmail,
  handleEditTheme,
  currentUser,
}) {
  const router = useRouter();
  const { t: translate } = useTranslation(["common"]);

  const [showThemes, setShowThemes] = useState(false);

  const colorSchemes = [
    {
      title: "warm",
      name: "warmTheme",
      background: "conic-gradient(#fbe050, #fbbd50, #f673a4, #762e72 50%)",
      text: "#762e72",
    },
    {
      title: "cold",
      name: "coldTheme",
      background: "conic-gradient(#50cfe2, #9996fa, #0F1555 50%)",
      text: "#0F1555",
    },
    {
      title: "neutral",
      name: "neutralTheme",
      background: "conic-gradient(white 50%, black 50%)",
      text: "black",
    },
    {
      title: "high contrast",
      name: "highContrastTheme",
      background: "conic-gradient(yellow 50%, black 50%)",
      text: "black",
    },
  ];

  function handleShowThemes() {
    setShowThemes(!showThemes);
  }

  return (
    <>
      <StyledTitleWrapper>
        <StyledTitle>
          {translate("hi")}
          {userName}!
        </StyledTitle>
        <StyledProfileCircle> {userNameInitials} </StyledProfileCircle>
        <StyledParagraph>{translate("thisIsYourProfilePage")}</StyledParagraph>
      </StyledTitleWrapper>
      <StyledParagraph>
        {translate("accountName")} {userEmail}
      </StyledParagraph>
      <StyledParagraph>{translate("makeYourselfAtHome")} </StyledParagraph>

      <StyledColorSchemesButton onClick={handleShowThemes}>
        {translate("choosePreferredTheme")}{" "}
        <Icon path={mdiMagicStaff} size={0.9} color="var(--main-dark)" />
      </StyledColorSchemesButton>
      {showThemes && (
        <StyledForm onSubmit={handleEditTheme}>
          {colorSchemes.map(({ name, title, background, text }) => (
            <StyledDiv key={title}>
              <StyledCircle $background={background} $text={text} />
              <StyledInput
                defaultChecked={currentUser.theme === name ? true : false}
                type="radio"
                id={name}
                name="theme"
                value={name}
                $background={background}
              />
              <StyledLabel htmlFor={name}>{title}</StyledLabel>
            </StyledDiv>
          ))}
          <StyledSubmit type="submit">submit</StyledSubmit>
        </StyledForm>
      )}
    </>
  );
}
