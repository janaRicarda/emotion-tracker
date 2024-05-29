import styled from "styled-components";
import { manualData } from "@/lib/db";
import { useState } from "react";
import { useEffect } from "react";
import { StyledTitle } from "@/SharedStyledComponents";
import { devices } from "@/utils/devices";

const StyledSection = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-areas:
    "title title"
    "text1 text1"
    "details details"
    "details details"
    "text2 text2"
    "text3 text3";

  //width: 100%;
  height: auto;
  padding: 1rem;
  @media ${devices.largeMobile} {
    padding: 2rem;
  }
  @media ${devices.tablet} {
    grid-template-areas:
      "title title"
      "text1 details"
      "text2 details"
      " . details"
      "text3 text3";
  }
  @media ${devices.laptop} {
  }
`;

const StyledManualTitle = styled(StyledTitle)`
  grid-area: title;
  margin-bottom: 2rem;
`;
const StyledDetailText = styled.p`
  margin-top: 2rem;
  margin-bottom: 3rem;
`;

const StyledText1 = styled.p`
  grid-area: text1;

  margin-bottom: 3rem;
  @media ${devices.tablet} {
    margin-right: 2rem;
  }
`;

const StyledText2 = styled.p`
  grid-area: text2;
  margin-top: 2rem;
  margin-bottom: 3rem;
  @media ${devices.tablet} {
    margin-right: 2rem;
  }
`;

const StyledText3 = styled.p`
  grid-area: text3;
  text-align: center;
  font-size: 2rem;
`;
const StyledDetailsWrapper = styled.article`
  grid-area: details;
`;
const StyledDetails = styled.details`
  border: 1px solid ${({ $itemColor }) => $itemColor};
  background: var(--section-background);
  border-radius: 30px;
  padding: 0.5rem;
  margin-bottom: 1rem;
  &[open] {
    border: 0;
  }
`;

const StyledSummary = styled.summary`
  font-weight: bold;
  width: 100%;
  padding: 0.5rem;
`;

const StyledOl = styled.ol`
  margin-top: 1rem;
  padding: 0;
  list-style: none;
  counter-reset: item;
`;

const StyledListItem = styled.li`
  counter-increment: item;
  margin: 0;
  padding: 2rem;
  position: relative;

  &:nth-child(even):before {
    content: counter(item);
    position: absolute;
    right: 0;
    top: -1rem;
    margin-right: -20px;
    border-radius: 50%;
    padding: 0;
    height: 3rem;
    width: 3rem;
    line-height: 3rem;
    background-color: ${({ $itemColor }) => $itemColor};
    transition: background-color 500ms ease-in-out;
    text-align: center;
    color: var(--text-on-bright);
    font-size: 1.5rem;
  }
  &:nth-child(odd):before {
    content: counter(item);
    position: absolute;
    left: 0;
    top: -1rem;
    margin-left: -20px;
    border-radius: 50%;
    padding: 0;
    height: 3rem;
    width: 3rem;
    line-height: 3rem;
    background-color: ${({ $itemColor }) => $itemColor};
    transition: background-color 500ms ease-in-out;
    text-align: center;
    color: var(--text-on-bright);
    font-size: 1.5rem;
  }
  &:nth-child(even) {
    border-right: 3px dotted;
    border-top-right-radius: 30px;
    border-bottom-right-radius: 30px;
    border-bottom: 3px dotted;
    border-color: ${({ $itemColor }) => $itemColor};
    transition: border-color 100ms ease-in-out;
    padding-right: 2rem;
  }
  &:nth-child(odd) {
    border-left: 3px dotted;
    border-top-left-radius: 30px;
    border-bottom-left-radius: 30px;
    border-bottom: 3px dotted;
    border-color: ${({ $itemColor }) => $itemColor};
    transition: border-color 500ms ease-in-out;
    padding-right: 2rem;
  }
`;

export default function Manual() {
  const [itemColor, setItemColor] = useState("var(--manual1)");

  function listenSrollEvent() {
    const colors = [
      "var(--manual1)",
      "var(--manual2)",
      "var(--manual3)",
      "var(--manual4)",
      "var(--manual5)",
      "var(--manual6)",
      "var(--manual7)",
    ];
    const index = Math.floor(window.scrollY / 300) % colors.length;
    setItemColor(colors[index]);
  }
  useEffect(() => {
    window.addEventListener("scroll", listenSrollEvent);
  });

  return (
    <StyledSection>
      <StyledManualTitle>
        Welcome to the <b>What a feeling app</b>!
      </StyledManualTitle>
      <StyledText1>
        This tool is designed to help you track and understand your emotions
        better. Below are some guidelines to help you navigate the app
        effectively:
      </StyledText1>
      <StyledDetailsWrapper>
        {manualData.map(({ question, text, answers }) => (
          <StyledDetails key={question} $itemColor={itemColor}>
            <StyledSummary>{question}</StyledSummary>
            <StyledDetailText>{text}</StyledDetailText>
            <StyledOl>
              {answers.map((answer) => (
                <StyledListItem key={answer} $itemColor={itemColor}>
                  {answer}
                </StyledListItem>
              ))}
            </StyledOl>
          </StyledDetails>
        ))}
      </StyledDetailsWrapper>
      <StyledText2>
        Remember, the <b>What a feeling</b> app is here to assist you in
        understanding and managing your emotions. Feel free to explore its
        features, utilize the graphs, highlight and filter specific entries, and
        gain insights into the basic emotions.
      </StyledText2>
      <StyledText3>What a feeling!</StyledText3>
    </StyledSection>
  );
}
