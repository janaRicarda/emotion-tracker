import styled from "styled-components";
import { manualData } from "@/lib/db";

const StyledSection = styled.section`
  width: 100%;
  height: auto;
  //border: 1px solid black;
  //padding: 0 1rem 0 1rem;
  padding: 1rem;
  //background: var(--section-background);
`;

const StyledWelcome = styled.h1`
  text-align: center;
  line-height: 2rem;
  font-weight: 600;
`;

const StyledText = styled.p`
  margin-top: 3rem;
  margin-bottom: 3rem;
  &:last-child {
    text-align: center;
    font-size: 1.5rem;
  }
`;

const StyledDetails = styled.details`
  border: 1px solid var(--button-background);
  background: var(--section-background);
  border-radius: 12px;

  padding: 0.5rem 0.5rem 0;
  margin-bottom: 1rem;
  &[open] {
    //border-top: 1px solid aqua;
    border: 0;
  }
`;

const StyledSummary = styled.summary`
  font-weight: bold;
  width: 100%;
  margin-bottom: 0.5rem;
  //background: var(--button-background);
  //border-bottom: 1px solid var(--button-background);
  //border-radius: 12px;
  //padding: 0.5rem 0.5rem 0.5rem 0;
  padding: 0.5rem;
  &[open] {
    border: 1px solid red;
  }
`;

const StyledOl = styled.ol`
  //list-style-position: outside;
  //background: var(--section-background);
  margin-top: 1rem;
  margin-bottom: 1rem;
  //padding-left: 50px;
  padding: 0;
  //padding: 1rem 1rem 1rem 50px;
  list-style: none;
  counter-reset: item;
`;

/* const StyledListItem = styled.li`
  counter-increment: item;
  margin: 0 0 0.5rem 0;
  position: relative;
  &:before {
    margin-right: 10px;

    content: counter(item);
    //background: var(--button-background);
    border: 1px solid var(--main-dark);
    border-radius: 50%;
    color: var(main-dark);
    font-size: 1.5rem;
    width: 2rem;
    height: 2rem;
    padding-top: 0.2rem;
    text-align: center;
    display: inline-block;
    position: absolute;

    top: 0.2rem;
    left: -2.5rem;
    line-height: 1.5rem;
  }
`; */

const StyledListItem = styled.li`
  counter-increment: item;
  b//ackground-color: var(--section-background);
  margin: 0;
  padding: 30px;

  position: relative;
  &:nth-child(even):before {
    content: counter(item);

    right: 0;
    top: -1rem;
    margin-right: -20px;

    position: absolute;
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

    left: 0;
    top: -1rem;
    margin-left: -20px;
    position: absolute;
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

    //margin-right: 30px;
    padding-right: 0;
  }
  &:nth-child(odd) {
    border-left: 2px dotted var(--button-background);
    border-top-left-radius: 30px;
    border-bottom-left-radius: 30px;
    border-bottom: 2px dotted var(--button-background);
    //margin-right: 30px;
    padding-right: 0;
  }
  &:first-child {
    margin-top: 3rem;
    //border-top: 2px solid var(--button-background);
  }
  &:last-child {
    margin-bottom: 3rem;
  }
  &:last-child(even) {
    //border-bottom: 0;
    border-bottom-right-radius: 30px;
    border-bottom-left-radius: 30px;
  }
`;

export default function Manual() {
  return (
    <>
      <StyledSection>
        <StyledWelcome>Welcome to the What a feeling app!</StyledWelcome>
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
          Remember, the What a feeling app is here to assist you in
          understanding and managing your emotions. Feel free to explore its
          features, utilize the graphs, highlight and filter specific entries,
          and gain insights into the basic emotions.
        </StyledText>
        <StyledText>Happy feeling!</StyledText>
      </StyledSection>
    </>
  );
}
