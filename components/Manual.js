import styled from "styled-components";
import { manualData } from "@/lib/db";
import { useState } from "react";
import { useEffect } from "react";
import { StyledTitle } from "@/SharedStyledComponents";

const StyledSection = styled.section`
  width: 100%;
  height: auto;
  padding: 1rem;
`;

const StyledText = styled.p`
  margin-top: 2rem;
  margin-bottom: 3rem;
  &:last-child {
    text-align: center;
    font-size: 1.5rem;
    margin-bottom: 0;
  }
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
  const [itemColor, setItemColor] = useState("var(--joy)");

  function listenSrollEvent() {
    const colors = [
      "var(--joy)",
      "var(--surprise",
      "var(--fear",
      "var(--sadness)",
      "var(--contempt)",
      "var(--disgust)",
      "var(--anger)",
    ];
    const index = Math.floor(window.scrollY / 300) % colors.length;
    setItemColor(colors[index]);
  }

  useEffect(() => {
    window.addEventListener("scroll", listenSrollEvent);
  });

  // useEffect(() => {
  //   function listenSrollEvent() {
  //     const colors = [
  //       "var(--manual1)",
  //       "var(--manual2",
  //       "var(--manual3",
  //       "var(--manual4)",
  //       "var(--manual5)",
  //       "var(--manual6)",
  //       "var(--manual7)",
  //     ];
  //     const index = Math.floor(window.scrollY / 300) % colors.length;
  //     setItemColor(colors[index]);
  //   }

  //   window.addEventListener("scroll", listenSrollEvent);
  // }, []);

  return (
    <StyledSection>
      <StyledTitle>
        Welcome to the <b>What a feeling app</b>!
      </StyledTitle>
      <StyledText>
        This tool is designed to help you track and understand your emotions
        better. Below are some guidelines to help you navigate the app
        effectively:
      </StyledText>

      {manualData.map(({ question, text, answers }) => (
        <StyledDetails key={question} $itemColor={itemColor}>
          <StyledSummary>{question}</StyledSummary>
          <StyledText>{text}</StyledText>
          <StyledOl>
            {answers.map((answer) => (
              <StyledListItem key={answer} $itemColor={itemColor}>
                {answer}
              </StyledListItem>
            ))}
          </StyledOl>
        </StyledDetails>
      ))}

      <StyledText>
        Remember, the <b>What a feeling</b> app is here to assist you in
        understanding and managing your emotions. Feel free to explore its
        features, utilize the graphs, highlight and filter specific entries, and
        gain insights into the basic emotions.
      </StyledText>
      <StyledText>What a feeling!</StyledText>
    </StyledSection>
  );
}
