import styled from "styled-components";
import { manualData } from "@/lib/db";

const StyledSection = styled.section`
  width: 100%;
  height: auto;
  padding: 1rem;
`;

const StyledWelcome = styled.h1`
  text-align: center;
  line-height: 2rem;
  font-weight: 600;
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
  border: 1px solid var(--button-background);
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
    background-color: var(--button-background);
    text-align: center;
    color: var(--main-dark);
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
    background-color: var(--button-background);
    text-align: center;
    color: var(--main-dark);
    font-size: 1.5rem;
  }
  &:nth-child(even) {
    border-right: 2px dotted var(--button-background);
    border-top-right-radius: 30px;
    border-bottom-right-radius: 30px;
    border-bottom: 2px dotted var(--button-background);
    padding-right: 2rem;
  }
  &:nth-child(odd) {
    border-left: 2px dotted var(--button-background);
    border-top-left-radius: 30px;
    border-bottom-left-radius: 30px;
    border-bottom: 2px dotted var(--button-background);
    padding-right: 2rem;
  }
`;

export default function Manual() {
  return (
    <>
      <StyledSection>
        <StyledWelcome>
          Welcome to the <b>What a feeling app</b>!
        </StyledWelcome>
        <StyledText>
          This tool is designed to help you track and understand your emotions
          better. Below are some guidelines to help you navigate the app
          effectively:
        </StyledText>

        {manualData.map(({ question, text, answers }) => (
          <StyledDetails key={question}>
            <StyledSummary>{question}</StyledSummary>
            <StyledText>{text}</StyledText>
            <StyledOl>
              {answers.map((answer) => (
                <StyledListItem key={answer}>{answer}</StyledListItem>
              ))}
            </StyledOl>
          </StyledDetails>
        ))}

        <StyledText>
          Remember, the <b>What a feeling</b> app is here to assist you in
          understanding and managing your emotions. Feel free to explore its
          features, utilize the graphs, highlight and filter specific entries,
          and gain insights into the basic emotions.
        </StyledText>
        <StyledText>What a feeling!</StyledText>
      </StyledSection>
    </>
  );
}
